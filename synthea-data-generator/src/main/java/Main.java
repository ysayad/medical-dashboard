import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kafka.KafkaMedicalProducer;
import org.apache.commons.io.FileUtils;
import org.mitre.synthea.engine.Generator;
import org.mitre.synthea.export.Exporter;
import org.mitre.synthea.helpers.Config;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.Comparator;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Main {

    static String HOSPITAL_TOPIC = "hospital";
    static String LOCATION_TOPIC = "location";
    public static void main(String[] args) {


        while (true) {
            // Configure options and override default file output configuration
            Generator.GeneratorOptions options = new Generator.GeneratorOptions();
            options.population = 1;
            Config.set("exporter.fhir.export", "false");
            Config.set("exporter.hospital.fhir.export", "true");
            Config.set("exporter.practitioner.fhir.export", "false");

            Exporter.ExporterRuntimeOptions ero = new Exporter.ExporterRuntimeOptions();
            ero.enableQueue(Exporter.SupportedFhirVersion.R4);
            // Create and start generator
            Generator generator = new Generator(options, ero);
            ExecutorService generatorService = Executors.newFixedThreadPool(1);
            generatorService.submit(() -> generator.run());

            // Retrieve the generated records
            int recordCount = 0;
            while(recordCount < options.population) {
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
                FileUtils.deleteDirectory(new File("output"));
                System.out.println("Dossier supprimé avec succès.");
            } catch (IOException e) {
                e.printStackTrace();
                System.err.println("Une erreur s'est produite lors de la suppression du dossier.");
            }

            try {
                Thread.sleep(60000); // Pause de 60 secondes
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
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
                    if (jsonNode.get("resource").get("resourceType").asText().equals("Location")) {
                        // Print the Location object
                        System.out.println("Location");
                        System.out.println(jsonNode.get("resource").toPrettyString());
                        producer.send(LOCATION_TOPIC, "shitmadrid");
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
                    // Check if the resourceType is "Location"
                    if (jsonNode.get("resource").get("resourceType").asText().equals("Organization")) {
                        // Print the Location object
                        System.out.println("Organization");
                        System.out.println(jsonNode.get("resource").toPrettyString());
                        producer.send(HOSPITAL_TOPIC, "hospitalresource");
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