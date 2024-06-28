import "mapbox-gl/dist/mapbox-gl.css"
import CustomMap from "@/components/CustomMap"
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {log} from "next/dist/server/typescript/utils";

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

interface StatsHospital {
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
    stats?: StatsHospital
}

const fetchHospitals = async (): Promise<Hospital[]> => {
    const res = await fetch(`${process.env.APP_URL}/api/hospitals`, {
        cache: 'no-store',
    });
    console.log("RESULT ERROR : ", res)
    if (!res.ok) {
        throw new Error('Failed to fetch hospitals');
    }
    return res.json();
};

const getHospitalStats = async (hospitalId: string): Promise<StatsHospital | null> => {
    try {
        const response = await fetch(`${process.env.APP_URL}/api/hospital_stats?hospitalId=${hospitalId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des statistiques');
        }
        const data = await response.json();
        return {
            stat1: data.visit_count,
            stat2: data.patient_count,
            stat3: data.most_common_disease,
            stat4: data.disease_count
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