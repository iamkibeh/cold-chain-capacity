// import React from 'react'
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import {
//   MapContainer,
//   TileLayer,
//   useMap,
// } from 'https://cdn.esm.sh/react-leaflet'
// import { MapContainer, TileLayer, useMap } from 'react-leaflet'

import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, GeoJSON } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from "react"
import { LatLngBoundsExpression } from "leaflet"
import marker from '../assets/images/medicine.png'



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

const KenyaMap: React.FC<{ selectedFacility: any | null }>  = ({selectedFacility}) => {
  const mapRef = useRef<L.Map | null>(null)
  const kenyaBounds: LatLngBoundsExpression = [
    [-4.675, 33.909], // Southwest corner
    [5.508, 41.899], // Northeast corner
  ]

  useEffect(() => {
    if (selectedFacility && mapRef.current) {
      const { latitude, longitude } = selectedFacility
      mapRef.current.flyTo([latitude, longitude], 12) // Adjust zoom level as needed
    }
  }, [selectedFacility])

  // Component to control the map behavior
  const MapController = () => {
    const map = useMap()

    useEffect(() => {
      if (selectedFacility) {
        const { latitude, longitude } = selectedFacility
        map.flyTo([latitude, longitude], 12) // Focus on the selected facility
      }
    }, [selectedFacility, map])

    return null // This component doesn't render anything
  }

  const mapStyle = { height: '100vh', width: '100%', margin: '0 auto' }

  //marker style
  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [0, 0],
    iconSize: [12, 12],
  })

  return (
    <MapContainer
      center={[1.286389, 38.817223]} // Nairobi's coordinates as the default center
      zoom={6}
      style={mapStyle}
    //   scrollWheelZoom={true}
      //   whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      maxBounds={kenyaBounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <TileLayer
        attribution='Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
      /> */}
      <MapController />

      {/* <GeoJSON data={facilities}/> */}
      {facilities.map((facility) => (
        <Marker
          key={facility.id}
          position={[facility.latitude, facility.longitude]}
          icon={myIcon}
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
      <MyComponent />
    </MapContainer>
  )
}

export default KenyaMap

function MyComponent() {
  const map = useMapEvent('click', () => {
    map.setView([50.5, 30.5], map.getZoom())
  })
  return null
}
