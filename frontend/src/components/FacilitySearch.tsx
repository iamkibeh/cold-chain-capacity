import React from 'react'
import { useFacilityContext } from '@/context/FacilityContext'

const FacilitySearch: React.FC = () => {
  const {
    facilitiesData,
    setSelectedFacility,
    setSelectedCounty,
    setSelectedSubCounty,
    setSearchTerm,
    searchTerm,
  } = useFacilityContext()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)

    const foundFacility = facilitiesData.find((facility) =>
      facility.Facility_Name.toLowerCase().includes(
        e.target.value.toLowerCase()
      )
    )

    if (foundFacility) {
      setSelectedFacility(foundFacility.Facility_Name)
      setSelectedCounty(foundFacility.County)
      setSelectedSubCounty(foundFacility['Sub.county'])
    }
  }

  return (
    <div className='relative w-full max-w-md mx-auto mb-4'>
      <input
        type='text'
        placeholder='Search facility...'
        // className='w-full p-2 border border-gray-300 rounded shadow-sm'
        className='rounded-lg pl-10 pr-4 py-2 w-full border border-gray-300 shadow-sm'
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  )
}

export default FacilitySearch
