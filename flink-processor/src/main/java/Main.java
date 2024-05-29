import org.apache.flink.api.common.eventtime.WatermarkStrategy;
import org.apache.flink.connector.jdbc.JdbcConnectionOptions;
import org.apache.flink.connector.jdbc.JdbcExecutionOptions;
import org.apache.flink.connector.jdbc.JdbcSink;
import org.apache.flink.connector.kafka.source.KafkaSource;
import org.apache.flink.connector.kafka.source.enumerator.initializer.OffsetsInitializer;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class Main {

    static final String BROKERS = "localhost:29092";

    public static void main(String[] args) throws Exception {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

        System.out.println("Environment created");
        KafkaSource<HospitalLocation> source =
                KafkaSource.<HospitalLocation>builder()
                        .setBootstrapServers(BROKERS)
                        .setProperty("partition.discovery.interval.ms", "1000")
                        .setTopics("location")
                        .setGroupId("groupdId-919292")
                        .setStartingOffsets(OffsetsInitializer.earliest())
                        .setValueOnlyDeserializer(new HospitalLocationDeserializationSchema())
                        .build();

        DataStreamSource<HospitalLocation> kafka =
                env.fromSource(source, WatermarkStrategy.noWatermarks(), "kafka");

        System.out.println("Kafka source created");

        // cityAndValueStream.print();
        kafka.addSink(
                JdbcSink.sink(
                        "INSERT INTO hospital (id, name, city, state, postal_code, country, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT (id) DO NOTHING",
                        (statement, hospitalLocation) -> {
                            statement.setString(1, hospitalLocation.id);
                            statement.setString(2, hospitalLocation.name);
                            statement.setString(3, hospitalLocation.address.city);
                            statement.setString(4, hospitalLocation.address.state);
                            statement.setString(5, hospitalLocation.address.postalCode);
                            statement.setString(6, hospitalLocation.address.country);
                            statement.setDouble(7, hospitalLocation.position.longitude);
                            statement.setDouble(8, hospitalLocation.position.latitude);
                        },
                        JdbcExecutionOptions.builder()
                                .withBatchSize(1000)
                                .withBatchIntervalMs(200)
                                .withMaxRetries(5)
                                .build(),
                        new JdbcConnectionOptions.JdbcConnectionOptionsBuilder()
                                .withUrl("jdbc:postgresql://localhost:5438/postgres")
                                .withDriverName("org.postgresql.Driver")
                                .withUsername("postgres")
                                .withPassword("postgres")
                                .build()));

        env.execute("Kafka-flink-postgres");
    }
}
