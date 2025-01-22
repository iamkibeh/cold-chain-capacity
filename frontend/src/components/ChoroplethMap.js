import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import './Map.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

const ChoroplethMap = () => {
  const mapStyle = {
    height: '100vh',
    width: '100%',
    margin: '0 auto',
  }

  return (
    <>
      <div className='container'>

        <div className=''>
            <MapContainer
              center={[1.286389, 38.817223]}
              zoom={6}
              scrollWheelZoom={true}
              style={mapStyle}
            >
              <TileLayer
                attribution='Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
                url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
              />
            </MapContainer>
        </div>
      </div>
    </>
  )
}
export default ChoroplethMap
