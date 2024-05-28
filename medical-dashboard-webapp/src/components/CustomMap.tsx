"use client"

import React from 'react'

import Map from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"


const CustomMap = () => {
  return (
    <div>
          <Map
          initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 3.5
          }}
          style={{ width: '100%', height: '1000px' }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken="pk.eyJ1IjoiYWNhbWVyZ3VpbGxhdW1lIiwiYSI6ImNsd3E0bzZwOTFjMHMyanJ6OXlqNzdsY3UifQ.cKA_bTwS1PQq_rGGxGBfqw"
        />

    </div>
  )
}

export default CustomMap