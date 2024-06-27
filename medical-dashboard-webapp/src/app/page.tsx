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

const fetchHospitals = async (): Promise<Hospital[]> => {
    const res = await fetch(`${process.env.APP_URL}/api/hospitals`, {
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch hospitals');
    }
    return res.json();
};


const Dashboard = async () => {

     const hospitals = await fetchHospitals();
     console.log(hospitals)

    const markers = [
        { label: 'saint-georges hospital', lat: 39.487638934472116, long: -101.27847248099424, description: '12 rue de la villette', icon: 'hospital', stats: {labo: '28',prescr: '480', ope: '94', patie: '562'} },
        { label: 'Johnny Hallyday federal hospital', lat: 38.15603065434457, long: -100.4276116569875, description: '45 rue des mouettes', icon: 'hospital', stats: {labo: '28',prescr: '480', ope: '94', patie: '562'} },
        { label: 'David Trezeguet county hospital', lat: 39.41072153260131, long: -98.57205110841754, description: '65 place bonaparte', icon: 'hospital', stats: {labo: '28',prescr: '480', ope: '94', patie: '562'} },
        { label: 'Ronald McDonald\'s house', lat: 37.49087517572107, long: -98.34848959654164, description: '1 boulevard des coquelicots', icon: 'hospital', stats: {labo: '28',prescr: '480', ope: '94', patie: '562'} },
    ];
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