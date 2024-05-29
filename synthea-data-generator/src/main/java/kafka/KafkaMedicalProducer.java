package kafka;

import org.apache.kafka.clients.producer.*;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;


import java.util.Properties;

public class KafkaMedicalProducer {
    private Producer<String, String> producer;

    public KafkaMedicalProducer() {
        Properties kafkaProps = new Properties();
        kafkaProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:29092");
        kafkaProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        kafkaProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

        producer = new KafkaProducer<>(kafkaProps);
    }

    public void send(String topic,  String value) {
        ProducerRecord<String, String> record = new ProducerRecord<>(topic, value);
        producer.send(record);
    }

    public void close() {
        producer.close();
    }
}
