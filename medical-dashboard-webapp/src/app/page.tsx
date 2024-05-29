import "mapbox-gl/dist/mapbox-gl.css"
import CustomMap from "@/components/CustomMap"
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Dashboard() {

    const markers = [
        { label: 'saint-georges hospital', lat: 39.487638934472116, long: -101.27847248099424, description: '12 rue de la villette', icon: 'hospital' },
        { label: 'Johnny Hallyday federal hospital', lat: 38.15603065434457, long: -100.4276116569875, description: '45 rue des mouettes', icon: 'hospital' },
        { label: 'David Trezeguet county hospital', lat: 39.41072153260131, long: -98.57205110841754, description: '65 place bonaparte', icon: 'hospital' },
        { label: 'Ronald McDonald\'s house', lat: 37.49087517572107, long: -98.34848959654164, description: '1 boulevard des coquelicots', icon: 'hospital' },
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