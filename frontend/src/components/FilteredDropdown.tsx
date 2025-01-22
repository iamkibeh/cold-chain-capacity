import { Facility } from '@/types/FacilityData'
import { useEffect, useState } from 'react'

const FilteredDropdowns = () => {
  const [facilitiesData, setFacilitiesData] = useState<Facility[]>([])
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null)
  const [selectedSubCounty, setSelectedSubCounty] = useState<string | null>(
    null
  )
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null)

  useEffect(() => {
    const fetchFacilitiesData = async () => {
      const response = await fetch(
        'https://coldchain-data-worker.prestonosoro56.workers.dev/'
      )
      const data = await response.json()
      setFacilitiesData(data)
      console.log(data)
    }
    fetchFacilitiesData()
  }, [])

  // Get unique options for each dropdown
  const counties = Array.from(new Set(facilitiesData.map((f) => f.County)))
  const subCounties = selectedCounty
    ? Array.from(
        new Set(
          facilitiesData
            .filter((f) => f.County === selectedCounty)
            .map((f) => f["Sub.county"])
        )
      )
    : []
  const facilities = selectedSubCounty
    ? facilitiesData.filter((f) => f[""] === selectedSubCounty)
    : []

  const selectedFacilityDetails = facilities.find(
    (f) => f.Facility_Name === selectedFacility
  )

  return (
    <div className='p-4 space-y-4'>
      {/* County Dropdown */}
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Select County
        </label>
        <select
          value={selectedCounty || ''}
          onChange={(e) => {
            setSelectedCounty(e.target.value)
            setSelectedSubCounty(null)
            setSelectedFacility(null)
          }}
          className='block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
        >
          <option value=''>Select a County</option>
          {counties.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-County Dropdown */}
      {selectedCounty && (
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Select Sub-County
          </label>
          <select
            value={selectedSubCounty || ''}
            onChange={(e) => {
              setSelectedSubCounty(e.target.value)
              setSelectedFacility(null)
            }}
            className='block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          >
            <option value=''>Select a Sub-County</option>
            {subCounties.map((subCounty) => (
              <option key={subCounty} value={subCounty}>
                {subCounty}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Facility Dropdown */}
      {selectedSubCounty && (
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Select Facility
          </label>
          <select
            value={selectedFacility || ''}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className='block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          >
            <option value=''>Select a Facility</option>
            {facilities.map((facility) => (
              <option
                key={facility.Facility_Name}
                value={facility.Facility_Name}
              >
                {facility.Facility_Name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Facility Details Card */}
      {selectedFacilityDetails && (
        <div className='p-4 mt-4 border border-gray-300 rounded-lg shadow'>
          <h3 className='text-lg font-semibold'>
            {selectedFacilityDetails.Facility_Name}
          </h3>
          <p className='text-sm text-gray-600'>
            County: {selectedFacilityDetails.County}
          </p>
          <p className='text-sm text-gray-600'>
            Sub-County: {selectedFacilityDetails.SubCounty}
          </p>
          <p className='text-sm text-gray-600'>
            Capacity: {selectedFacilityDetails.capacity_in_litres} liters
          </p>
          <p className='text-sm text-gray-600'>
            Location: {selectedFacilityDetails.latitude},{' '}
            {selectedFacilityDetails.longitude}
          </p>
        </div>
      )}
    </div>
  )
}

export default FilteredDropdowns
