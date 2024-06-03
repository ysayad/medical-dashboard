"use client"

import "mapbox-gl/dist/mapbox-gl.css"
import CustomMap from "@/components/CustomMap"
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useEffect, useState } from 'react';


export default function Dashboard() {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        async function fetchMarkers() {
            try {
                const response = await fetch('/api/hospital');
                const data = await response.json();
                setMarkers(data);
            } catch (error) {
                console.error('Error fetching markers:', error);
            }
        }

        fetchMarkers();
    }, []);

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