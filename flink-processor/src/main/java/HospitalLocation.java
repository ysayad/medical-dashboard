import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
public class HospitalLocation {


    public static class Identifier {
        public String system;
        public String value;
    }

    public static class Address {
        public List<String> line;
        public String city;
        public String state;
        public String postalCode;
        public String country;
    }

    public static class Position {
        public double longitude;
        public double latitude;
    }

    public static class ManagingOrganization {
        public Identifier identifier;
        public String display;
    }

    public static class Meta {
        public List<String> profile;
    }

    public Meta meta;

    public String resourceType;
    public String id;
    public List<Identifier> identifier;
    public String status;
    public String name;
    public List<Identifier> telecom;
    public Address address;
    public Position position;
    public ManagingOrganization managingOrganization;

    public String description;


    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Location{");
        sb.append("resourceType=").append(resourceType);
        sb.append(", id=").append(id);
        sb.append(", identifier=").append(identifier);
        sb.append(", status=").append(status);
        sb.append(", name=").append(name);
        sb.append(", telecom=").append(telecom);
        sb.append(", address=").append(address);
        sb.append(", position=").append(position);
        sb.append(", managingOrganization=").append(managingOrganization);
        sb.append('}');
        return sb.toString();
    }

    @Override
    public int hashCode() {
        return Objects.hash(resourceType, id, identifier, status, name, telecom, address, position, managingOrganization, meta);
    }
}