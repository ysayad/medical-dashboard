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

interface Stats {
    visitcount: number;
    patientcount: number;
    mostcommondisease: string;
    diseasecount: number;
}

interface Marker {
    label: string;
    lat: number;
    long: number;
    description: string;
    icon: string;
    stats?: Stats
}

const fetchHospitals = async (): Promise<Hospital[]> => {
    const res = await fetch(`${process.env.APP_URL}/api/hospitals`, {
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch hospitals');
    }
    return res.json();
};

const getHospitalStats = async (hospitalId: string): Promise<Stats | null> => {
    try {
        const response = await fetch(`${process.env.APP_URL}/api/hospital_stats?hospitalId=${hospitalId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des statistiques');
        }
        const data = await response.json();
        return {
            visitcount: data.visit_count,
            patientcount: data.patient_count,
            mostcommondisease: data.most_common_disease,
            diseasecount: data.disease_count
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};


const Dashboard = async () => {

     const hospitals = await fetchHospitals();

    const markers: Marker[] = [];
    for (const hospital of hospitals) {
        const stats = await getHospitalStats(hospital.id_organization);
        console.log(stats)
        const marker: Marker = {
            label: hospital.name,
            lat: hospital.latitude,
            long: hospital.longitude,
            description: `${hospital.address_line}, ${hospital.city}, ${hospital.state}`,
            icon: 'hospital',
            stats: stats || undefined
        };
        markers.push(marker);
    }

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