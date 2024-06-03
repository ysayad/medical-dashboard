"use client"

import React, {useState} from 'react'

import Map, {Marker, Popup} from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import {Hospital, Siren, Users} from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";


interface CustomMapProps {
    className?: string;
    markers: {label: string ,longitude: number ,latitude: number}[]
};

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
                      longitude={marker.longitude}
                      latitude={marker.latitude}
                      anchor="bottom"
                      onClick={togglePopup(index)}
                  >
                          <Hospital className="h-4 w-4" size={30} color="red"/>
                                          
                      {markerDefined === index && (
                          <Popup
                              latitude={marker.latitude}
                              longitude={marker.longitude}
                              closeButton={true}
                              closeOnClick={false}
                              anchor="top"
                          >
                              <div>
                                  <CardHeader>
                                      <CardTitle>{marker.label}</CardTitle>
                                      <CardDescription>
                                          Description
                                      </CardDescription>
                                  </CardHeader>
                                  <div>
                                      <Table>
                                          <TableCaption>Statistics</TableCaption>
                                          <TableBody>
                                              <TableRow>
                                                  <TableCell className="font-medium">Laboratories</TableCell>
                                                  <TableCell>Statistiques</TableCell>
                                              </TableRow>
                                              <TableRow>
                                                  <TableCell className="font-medium">Prescriptions</TableCell>
                                                  <TableCell>Statistiques</TableCell>
                                              </TableRow>
                                              <TableRow>
                                                  <TableCell className="font-medium">Operations</TableCell>
                                                  <TableCell>Statistiques</TableCell>
                                              </TableRow><TableRow>
                                              <TableCell className="font-medium">Patients</TableCell>
                                              <TableCell>Statistiques</TableCell>
                                          </TableRow>
                                          </TableBody>
                                      </Table>
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