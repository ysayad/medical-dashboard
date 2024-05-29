import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.io.IOException;
import org.apache.flink.api.common.serialization.AbstractDeserializationSchema;

public class HospitalLocationDeserializationSchema
        extends AbstractDeserializationSchema<HospitalLocation> {
    private static final long serialVersionUUID = 1L;

    private transient ObjectMapper objectMapper;

    @Override
    public void open(InitializationContext context) {
        objectMapper = JsonMapper.builder().build().registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    public HospitalLocation deserialize(byte[] message) throws IOException {
        return objectMapper.readValue(message, HospitalLocation.class);
    }
}
