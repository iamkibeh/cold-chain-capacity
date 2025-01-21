// import React from 'react'
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import {
//   MapContainer,
//   TileLayer,
//   useMap,
// } from 'https://cdn.esm.sh/react-leaflet'
// import { MapContainer, TileLayer, useMap } from 'react-leaflet'

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"


import 'leaflet/dist/leaflet.css'

const facilities = [
  {
    id: 1,
    name: 'Facility A',
    latitude: -1.2921,
    longitude: 36.8219,
    cold_chain_capacity: 500,
    available_space: 200,
  },
  {
    id: 2,
    name: 'Facility B',
    latitude: -0.5143,
    longitude: 37.4527,
    cold_chain_capacity: 300,
    available_space: 100,
  },
]

const KenyaMap = () => {
  return (
    <MapContainer
      center={[-1.286389, 36.817223]} // Nairobi's coordinates as the default center
      zoom={7}
      style={{ height: '100vh', width: '100%' }}
    //   bounds={[-1.286389, 36.817223]}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {facilities.map((facility) => (
        <Marker
          key={facility.id}
          position={[facility.latitude, facility.longitude]}
        >
          <Popup>
            <strong>{facility.name}</strong>
            <br />
            Capacity: {facility.cold_chain_capacity} liters
            <br />
            Available Space: {facility.available_space} liters
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default KenyaMap
