import "mapbox-gl/dist/mapbox-gl.css"
import CustomMap from "@/components/CustomMap"
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface Hospital {
    id_organization: string;
    name: string;
    address_line: string;
    city: string;
    state: string;
    postalcode: string;
    country: string;
    longitude: number;
    latitude: number;
}

interface Practitioner {
    identifier: string;
    name: string;
    email: string;
    adress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    gender: string;
    role: string;
    id_organization: string;
}

interface StatsPractitioner {
    stat1: number;
    stat2: number;
    stat3: string;
    stat4: number;
}

interface Marker {
    label: string;
    lat: number;
    long: number;
    description: string;
    icon: string;
    stats?: StatsPractitioner
}

const fetchPractitioners = async (): Promise<Practitioner[]> => {
    const res = await fetch(`${process.env.APP_URL}/api/practitioners`, {
        cache: 'no-store',
    });
    console.log("RESULT ERROR : ", res)
    if (!res.ok) {
        throw new Error('Failed to fetch practitioners');
    }
    return res.json();
};

const getPratictionerHospital = async (organizationId: string): Promise<Hospital | null> => {
    const res = await fetch(`${process.env.APP_URL}/api/hospitals?hospitalId=${organizationId}`, {
        cache: 'no-store',
    });
    console.log("RESULT ERROR : ", res)

    if (!res.ok) {
        throw new Error('Failed to fetch hospitals');
    }
    return res.json();
};

const getPractitionerStats = async (practitionerId: string): Promise<StatsPractitioner | null> => {
    try {
        const response = await fetch(`${process.env.APP_URL}/api/practitioner_stats?practitionerId=${practitionerId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des statistiques');
        }
        const data = await response.json();
        return {
            stat1: data.average_age,
            stat2: data.min_age,
            stat3: data.max_age,
            stat4: data.total_patients
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};

const Dashboard = async () => {

    const practitioners = await fetchPractitioners();

    const markers: Marker[] = [];
    for (const practitioner of practitioners) {
        const hospital = await getPratictionerHospital(practitioner.id_organization)
        const stats = await getPractitionerStats(practitioner.identifier);
        console.log(stats)
        if(hospital) {
            const marker: Marker = {
                label: practitioner.name,
                lat: hospital.latitude,
                long: hospital.longitude,
                description: `${practitioner.adress}, ${practitioner.city}, ${practitioner.state}`,
                icon: 'user',
                stats: stats || undefined
            };
            markers.push(marker);
        }
    }

    console.log(markers)

  return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <Sidebar/>
        </div>
        <div className="flex flex-col">
          <Header/>
          <CustomMap markers={markers} className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"/>
        </div>
      </div>
  )
}
export default Dashboard