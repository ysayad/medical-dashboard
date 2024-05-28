"use client"

import React from 'react'

import Map from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"

interface CustomMapProps {
  className?: string;
}

const CustomMap: React.FC<CustomMapProps> = ({ className }) => {
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
        />

    </div>
  )
}

export default CustomMap