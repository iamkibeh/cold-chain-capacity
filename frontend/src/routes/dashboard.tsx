import React from 'react'
// import CapacityGraph from './CapacityGraph'
import { useFacilityContext } from '@/context/FacilityContext'
import CapacityGraph from '@/components/CapacityGraph'

const Dashboard: React.FC = () => {
  const { facilitiesData, selectedSubCounty } = useFacilityContext()

  // Filter facilities by the selected subcounty
  const filteredFacilities = facilitiesData.filter(
    (facility) => facility['Sub.county'] === selectedSubCounty
  )

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>

      {selectedSubCounty ? (
        filteredFacilities.length > 0 ? (
          <CapacityGraph facilities={filteredFacilities} />
        ) : (
          <p>No facilities found for the selected subcounty.</p>
        )
      ) : (
        <p>Please select a subcounty to view data.</p>
      )}
    </div>
  )
}

export default Dashboard
