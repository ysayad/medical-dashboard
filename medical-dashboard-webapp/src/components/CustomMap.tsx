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

interface StatsHospital {
    visitcount: number;
    patientcount: number;
    mostcommondisease: string;
    diseasecount: number;
}

interface StatsPractitioner {
    averageage: number;
    minage: number;
    maxage: string;
    totalpatients: number;
}

interface CustomMapProps {
    className?: string;
    markers: {label: string ,lat: number ,long: number ,description: string ,icon: string ,statshospital?: StatsHospital, statspractitioner?: StatsPractitioner }[];
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
                                  <CardHeader>
                                      <CardTitle>{marker.label}</CardTitle>
                                      <CardDescription>
                                          {marker.description}
                                      </CardDescription>
                                  </CardHeader>
                                  <div>
                                      {marker.statshospital ?
                                          <Table>
                                              <TableCaption>Statistics</TableCaption>
                                              <TableBody>
                                                  <TableRow>
                                                      <TableCell className="font-medium">Visit count</TableCell>
                                                      <TableCell>{marker.statshospital.visitcount}</TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                      <TableCell className="font-medium">Patient count</TableCell>
                                                      <TableCell>{marker.statshospital.patientcount}</TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                      <TableCell className="font-medium">Most common disease</TableCell>
                                                      <TableCell>{marker.statshospital.mostcommondisease}</TableCell>
                                                  </TableRow><TableRow>
                                                  <TableCell className="font-medium">Disease count</TableCell>
                                                  <TableCell>{marker.statshospital.diseasecount}</TableCell>
                                              </TableRow>
                                              </TableBody>
                                          </Table> : null
                                      }
                                      {marker.statspractitioner ?
                                          <Table>
                                              <TableCaption>Statistics</TableCaption>
                                              <TableBody>
                                                  <TableRow>
                                                      <TableCell className="font-medium">Average age</TableCell>
                                                      <TableCell>{marker.statspractitioner.averageage}</TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                      <TableCell className="font-medium">Minimum age</TableCell>
                                                      <TableCell>{marker.statspractitioner.minage}</TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                      <TableCell className="font-medium">Maximum age</TableCell>
                                                      <TableCell>{marker.statspractitioner.maxage}</TableCell>
                                                  </TableRow><TableRow>
                                                  <TableCell className="font-medium">Total of patients</TableCell>
                                                  <TableCell>{marker.statspractitioner.totalpatients}</TableCell>
                                              </TableRow>
                                              </TableBody>
                                          </Table> : null
                                      }

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