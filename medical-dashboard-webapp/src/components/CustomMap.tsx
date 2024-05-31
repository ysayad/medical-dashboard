"use client"

import React, {useState} from 'react'

import Map, {Marker, Popup} from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import {Hospital, Siren, Users} from "lucide-react";


interface CustomMapProps {
    className?: string;
    markers: {label: string ,lat: number ,long: number ,description: string ,icon: string ,stats: {labo: string ,prescr: string ,ope: string ,patie: string}}[];
}

const CustomMap: React.FC<CustomMapProps> = ({ className, markers}) => {

    const [markerDefined, setMarkerDefined] = useState<number | null>(null);

    const togglePopup = (index: number) => (event: any) => {
        setMarkerDefined(index);
    };

    return (
    <div className={className}>
          <Map
          initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 3.5
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken="pk.eyJ1IjoiYWNhbWVyZ3VpbGxhdW1lIiwiYSI6ImNsd3E0bzZwOTFjMHMyanJ6OXlqNzdsY3UifQ.cKA_bTwS1PQq_rGGxGBfqw"
          >
              {markers && markers.map((marker, index) => (
                  <Marker
                      key={index}
                      longitude={marker.long}
                      latitude={marker.lat}
                      anchor="bottom"
                      onClick={togglePopup(index)}
                  >
                      {marker.icon === 'hospital' ?
                          <Hospital className="h-4 w-4" size={30} color="red"/> : marker.icon === 'users' ?
                              <Users className="h-4 w-4" size={30} color="red"/> : marker.icon === 'siren' ?
                                  <Siren className="h-4 w-4" size={30} color="red"/> : null
                      }
                      {markerDefined === index && (
                          <Popup
                              latitude={marker.lat}
                              longitude={marker.long}
                              closeButton={true}
                              closeOnClick={false}
                              anchor="top"
                          >
                              <div>
                                  <h2>{marker.label}</h2>
                                  <p>{marker.description}</p>
                                  <div>
                                      <p>Statistics</p>
                                      <p>Laboratories: {marker.stats.labo}</p>
                                      <p>Prescriptions: {marker.stats.prescr}</p>
                                      <p>Operations: {marker.stats.ope}</p>
                                      <p>Patients: {marker.stats.patie}</p>
                                  </div>
                              </div>
                          </Popup>
                      )}
                  </Marker>
                  ))}
          </Map>
    </div>
  )
}

export default CustomMap