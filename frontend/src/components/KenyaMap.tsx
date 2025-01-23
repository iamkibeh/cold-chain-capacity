// import React from 'react'
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import {
//   MapContainer,
//   TileLayer,
//   useMap,
// } from 'https://cdn.esm.sh/react-leaflet'
// import { MapContainer, TileLayer, useMap } from 'react-leaflet'

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  // GeoJSON,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { LatLngBoundsExpression } from 'leaflet'
import marker from '../assets/images/medicine.png'
import blueMarker from '../assets/images/facility-logo.jpeg'
import { Facility } from '@/types/FacilityData'

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

const KenyaMap: React.FC<{
  facilitiesData: Facility[]
  selectedFacility: string | null
}> = ({ facilitiesData, selectedFacility }) => {
  const mapRef = useRef<L.Map | null>(null)
  const kenyaBounds: LatLngBoundsExpression = [
    [-4.675, 33.909], // Southwest corner
    [5.508, 41.899], // Northeast corner
  ]

  // console.log({facilitiesData});
  // console.log({selectedFacility});
  // console.log('Facilities data sample:', facilitiesData.slice(0, 10))
  facilitiesData.forEach((facility) => {
    if (!facility.latitude || !facility.longitude) {
      console.warn('Missing coordinates for:', facility)
    }
  })

  useEffect(() => {
    if (selectedFacility && mapRef.current) {
      const { latitude, longitude } = facilitiesData.find(
        // Find the selected facility's coordinates
        (facility: Facility) => facility.Facility_Name === selectedFacility
      )!
      mapRef.current.flyTo([parseFloat(latitude), parseFloat(longitude)], 12) // Adjust zoom level as needed
    }
  }, [selectedFacility, facilitiesData])

  useEffect(() => {
    console.log('Selected facility:', selectedFacility)
  }, [selectedFacility])

  // Component to control the map behavior
  const MapController = () => {
    const map = useMap()

    useEffect(() => {
      if (selectedFacility) {
        const { latitude, longitude } = facilitiesData.find(
          (facility: Facility) => facility.Facility_Name === selectedFacility
        )!
        map.flyTo([parseFloat(latitude), parseFloat(longitude)], 12) // Focus on the selected facility
      }
    }, [map])

    return null // This component doesn't render anything
  }

  const mapStyle = { height: '100vh', width: '100%', margin: '0 auto' }

  //marker style
  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [0, 0],
    iconAnchor: [12, 41],
    iconSize: [12, 12],
  })

  const blueMarkerIcon = new L.Icon({
    iconUrl: blueMarker,
    iconRetinaUrl: blueMarker,
    popupAnchor: [0, 0],
    iconAnchor: [12, 41],
    iconSize: [12, 12],
  })

  return (
    <MapContainer
      center={[1.286389, 38.817223]} // Nairobi's coordinates as the default center
      zoom={6}
      style={mapStyle}
      //   scrollWheelZoom={true}
      // whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
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
      {facilitiesData.map((facility, ind) => (
        <Marker
          key={ind}
          position={[
            parseFloat(facility.latitude),
            parseFloat(facility.longitude),
          ]}
          icon={parseFloat(facility.Unutilized_Functional_Capacity || '0') < 0
            ? myIcon
            : blueMarkerIcon
          }
        >
          <Popup>
            <strong>{facility.Facility_Name}</strong>
            <br />
            Total Capacity: {facility.Total_Capacity} liters
            <br />
            Required Capacity:{' '}
            {facility.Required_vaccine_capacity_each_month_in_litres} liters
            <br />
            Unutilized Capacity: {facility.Unutilized_Functional_Capacity}{' '}
            liters
            <br /> Children under 1 year:{' '}
            {facility.Children_under_1_population_monthly_target}
            <br /> 10 year old girls population:{' '}
            {facility['10 year old girls population - monthly target']}
            <br />
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
