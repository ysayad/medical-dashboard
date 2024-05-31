import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kafka.KafkaMedicalProducer;
import org.apache.commons.io.FileUtils;
import org.mitre.synthea.engine.Generator;
import org.mitre.synthea.export.Exporter;
import org.mitre.synthea.helpers.Config;
import org.mitre.synthea.world.agents.PayerManager;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Main {

    static String HOSPITAL_TOPIC = "hospital";
    static String LOCATION_TOPIC = "location";

    public static void main(String[] args) {

        while (true) {
            // Cleanup output directory to avoid conflicts
            cleanupOutputDirectory();

            // Configure options and override default file output configuration
            Generator.GeneratorOptions options = new Generator.GeneratorOptions();
            options.state = USStates.getRandomState();
            options.population = 1;
            Config.set("exporter.fhir.export", "false");
            Config.set("exporter.hospital.fhir.export", "true");
            Config.set("exporter.practitioner.fhir.export", "false");

            // Reset PayerManager to avoid duplicated payer IDs
            try {
                PayerManager.clear();
            } catch (Exception e) {
                System.err.println("An error occurred while clearing PayerManager: " + e.getMessage());
            }

            Exporter.ExporterRuntimeOptions ero = new Exporter.ExporterRuntimeOptions();
            ero.enableQueue(Exporter.SupportedFhirVersion.R4);

            // Create and start generator
            Generator generator = new Generator(options, ero);
            ExecutorService generatorService = Executors.newFixedThreadPool(1);
            generatorService.submit(generator::run);

            // Retrieve the generated records
            int recordCount = 0;
            while (recordCount < options.population) {
                try {
                    String jsonRecord = ero.getNextRecord();
                    recordCount++;
                } catch (InterruptedException e) {
                    break;
                }
            }

            // Shutdown the generator and wait for it to finish
            generatorService.shutdown();
            try {
                if (!generatorService.awaitTermination(60, TimeUnit.SECONDS)) {
                    generatorService.shutdownNow();
                }
            } catch (InterruptedException e) {
                generatorService.shutdownNow();
            }

            sendHospitalLocationData();
            sendHospitalData();

            try {
                Thread.sleep(1000); // Pause de 60 secondes
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private static void cleanupOutputDirectory() {
        try {
            FileUtils.deleteDirectory(new File("output"));
            System.out.println("Output directory cleaned up successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("An error occurred while cleaning up the output directory.");
        }
    }

    private static void sendHospitalLocationData() {

        KafkaMedicalProducer producer = new KafkaMedicalProducer();
        // Define the directory where the files are located
        Path outputDir = Paths.get("output/fhir");

        try {
            // List all files in the directory
            Optional<Path> latestFilePath = Files.list(outputDir)
                    // Filter files beginning with "hospitalInformation"
                    .filter(path -> path.getFileName().toString().startsWith("hospitalInformation"))
                    // Sort them by modification time
                    .sorted((path1, path2) -> {
                        try {
                            return Files.getLastModifiedTime(path2).compareTo(Files.getLastModifiedTime(path1));
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    // Get the latest file
                    .findFirst();

            if (latestFilePath.isPresent()) {
                // Read the file into a JsonNode
                JsonNode rootNode = new ObjectMapper().readTree(new File(latestFilePath.get().toString()));

                // Get the array node
                JsonNode arrayNode = rootNode.get("entry");

                // Iterate over array elements
                for (JsonNode jsonNode : arrayNode) {
                    // Check if the resourceType is "Location"
                    if (jsonNode.get("resource").get("resourceType").asText().equals("Location")
                            && !jsonNode.get("resource").has("description")) {
                        producer.send(LOCATION_TOPIC, jsonNode.get("resource").toPrettyString());
                    }
                }
            } else {
                System.out.println("No matching files found.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void sendHospitalData() {

        KafkaMedicalProducer producer = new KafkaMedicalProducer();

        // Define the directory where the files are located
        Path outputDir = Paths.get("output/fhir");

        try {
            // List all files in the directory
            Optional<Path> latestFilePath = Files.list(outputDir)
                    // Filter files beginning with "hospitalInformation"
                    .filter(path -> path.getFileName().toString().startsWith("hospitalInformation"))
                    // Sort them by modification time
                    .sorted((path1, path2) -> {
                        try {
                            return Files.getLastModifiedTime(path2).compareTo(Files.getLastModifiedTime(path1));
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    // Get the latest file
                    .findFirst();

            if (latestFilePath.isPresent()) {
                // Read the file into a JsonNode
                JsonNode rootNode = new ObjectMapper().readTree(new File(latestFilePath.get().toString()));

                // Get the array node
                JsonNode arrayNode = rootNode.get("entry");

                // Iterate over array elements
                for (JsonNode jsonNode : arrayNode) {
                    // Check if the resourceType is "Organization"
                    if (jsonNode.get("resource").get("resourceType").asText().equals("Organization")) {
                        // Print the Location object
                        producer.send(HOSPITAL_TOPIC, jsonNode.get("resource").toPrettyString());
                    }
                }
            } else {
                System.out.println("No matching files found.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
