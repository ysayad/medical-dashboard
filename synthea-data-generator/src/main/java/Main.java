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
            generatorService.submit(generator::run);

            // Retrieve the generated records
            int recordCount = 0;
            while (recordCount < options.population) {
                try {
                    String jsonRecord = ero.getNextRecord();
                    recordCount++;
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
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
                Thread.currentThread().interrupt();
            }

            // Send data to Kafka
            KafkaMedicalProducer producer = new KafkaMedicalProducer();
            sendHospitalLocationData(producer);
            sendHospitalData(producer);
            producer.close();

            // Cleanup output directory
            try {
                Path outputPath = Paths.get("output");
                if (Files.exists(outputPath)) {
                    FileUtils.deleteDirectory(outputPath.toFile());
                    System.out.println("Dossier supprimé avec succès.");
                }
            } catch (IOException e) {
                e.printStackTrace();
                System.err.println("Une erreur s'est produite lors de la suppression du dossier.");
            }

            // Pause for 60 seconds
            try {
                Thread.sleep(60000);
            } catch (InterruptedException e) {
                e.printStackTrace();
                Thread.currentThread().interrupt();
            }
        }
    }

    private static void sendHospitalLocationData(KafkaMedicalProducer producer) {
        // Define the directory where the files are located
        Path outputDir = Paths.get("output/fhir");

        try {
            Optional<Path> latestFilePath = Files.list(outputDir)
                    .filter(path -> path.getFileName().toString().startsWith("hospitalInformation"))
                    .sorted((path1, path2) -> {
                        try {
                            return Files.getLastModifiedTime(path2).compareTo(Files.getLastModifiedTime(path1));
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .findFirst();

            if (latestFilePath.isPresent()) {
                JsonNode rootNode = new ObjectMapper().readTree(latestFilePath.get().toFile());
                JsonNode arrayNode = rootNode.get("entry");

                for (JsonNode jsonNode : arrayNode) {
                    if ("Location".equals(jsonNode.get("resource").get("resourceType").asText())) {
                        System.out.println("Location");
                        System.out.println(jsonNode.get("resource").toPrettyString());
                        producer.send(LOCATION_TOPIC, jsonNode.get("resource").toString());
                    }
                }
            } else {
                System.out.println("No matching files found.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void sendHospitalData(KafkaMedicalProducer producer) {
        // Define the directory where the files are located
        Path outputDir = Paths.get("output/fhir");

        try {
            Optional<Path> latestFilePath = Files.list(outputDir)
                    .filter(path -> path.getFileName().toString().startsWith("hospitalInformation"))
                    .sorted((path1, path2) -> {
                        try {
                            return Files.getLastModifiedTime(path2).compareTo(Files.getLastModifiedTime(path1));
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .findFirst();

            if (latestFilePath.isPresent()) {
                JsonNode rootNode = new ObjectMapper().readTree(latestFilePath.get().toFile());
                JsonNode arrayNode = rootNode.get("entry");

                for (JsonNode jsonNode : arrayNode) {
                    if ("Organization".equals(jsonNode.get("resource").get("resourceType").asText())) {
                        System.out.println("Organization");
                        System.out.println(jsonNode.get("resource").toPrettyString());
                        producer.send(HOSPITAL_TOPIC, jsonNode.get("resource").toString());
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
