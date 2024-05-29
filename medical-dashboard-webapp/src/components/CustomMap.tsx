"use client"

import React, {useState, useRef, useMemo, useCallback} from 'react'

import "mapbox-gl/dist/mapbox-gl.css"
import Map, {Source, Layer, Marker , Popup} from 'react-map-gl';
import {Hospital, Siren} from "lucide-react";
import mapboxgl from 'mapbox-gl';

interface CustomMapProps {
  className?: string;
}

const CustomMap: React.FC<CustomMapProps> = ({ className }) => {

  const points = [
    { id: 2, longitude: -74.006, latitude: 40.7128, title: 'New York City', icon: Siren },
    { id: 4, longitude: -118.2437, latitude: 34.0522, title: 'Los Angeles', icon: Siren },
    { id: 5, longitude: -87.6298, latitude: 41.8781, title: 'Chicago', icon: Hospital },
    { id: 6, longitude: -95.3698, latitude: 29.7604, title: 'Houston', icon: Siren },
    { id: 7, longitude: -112.0740, latitude: 33.4484, title: 'Phoenix', icon: Hospital },
    { id: 8, longitude: -75.1652, latitude: 39.9526, title: 'Philadelphia', icon: Siren },
    { id: 9, longitude: -104.9903, latitude: 39.7392, title: 'Denver', icon: Hospital },
    { id: 10, longitude: -122.4194, latitude: 37.7749, title: 'San Francisco', icon: Siren },
    { id: 11, longitude: -84.3880, latitude: 33.7490, title: 'Atlanta', icon: Hospital },
    { id: 12, longitude: -77.0369, latitude: 38.9072, title: 'Washington D.C.', icon: Siren },
    { id: 13, longitude: -80.1918, latitude: 25.7617, title: 'Miami', icon: Hospital },
    { id: 14, longitude: -96.7969, latitude: 32.7767, title: 'Dallas', icon: Siren },
    { id: 15, longitude: -71.0589, latitude: 42.3601, title: 'Boston', icon: Hospital },
    { id: 16, longitude: -115.1398, latitude: 36.1699, title: 'Las Vegas', icon: Siren },
    { id: 17, longitude: -86.1581, latitude: 39.7684, title: 'Indianapolis', icon: Hospital },
    { id: 18, longitude: -83.0458, latitude: 42.3314, title: 'Detroit', icon: Siren },
    { id: 19, longitude: -90.0715, latitude: 29.9511, title: 'New Orleans', icon: Hospital },
    { id: 20, longitude: -106.6504, latitude: 35.0844, title: 'Albuquerque', icon: Siren },
    { id: 21, longitude: -122.6765, latitude: 45.5051, title: 'Portland', icon: Hospital },
    { id: 22, longitude: -82.9988, latitude: 39.9612, title: 'Columbus', icon: Siren },
    { id: 23, longitude: -117.1611, latitude: 32.7157, title: 'San Diego', icon: Hospital },
    { id: 24, longitude: -121.4944, latitude: 38.5816, title: 'Sacramento', icon: Siren },
    { id: 25, longitude: -85.7594, latitude: 38.2527, title: 'Louisville', icon: Hospital },
    // Ajoutez autant de points que vous le souhaitez
  ];

  const markerRef = useRef<mapboxgl.Marker>();

  const popup = useMemo(() => {
    return new mapboxgl.Popup().setText('Hello world!');
  }, [])

  const togglePopup = useCallback(() => {
    markerRef.current?.togglePopup();
  }, []);

  return (
    <div className={className}>
          <Map
          initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 4.5
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken="pk.eyJ1IjoiYWNhbWVyZ3VpbGxhdW1lIiwiYSI6ImNsd3E0bzZwOTFjMHMyanJ6OXlqNzdsY3UifQ.cKA_bTwS1PQq_rGGxGBfqw"
          popup={popup} 
          ref={markerRef}
          >
          {points.map(point => {
          const IconComponent = point.icon;
          return (
            <Marker
              key={point.id}
              longitude={point.longitude}
              latitude={point.latitude}
              onClick={togglePopup}
            >
              <div title={point.title} style={{ transform: 'translate(-50%, -50%)' }}>
                <IconComponent size={30} color="red" />
              </div>
            </Marker>
          );
          })}

        </Map>

    </div>
  )
}

export default CustomMap