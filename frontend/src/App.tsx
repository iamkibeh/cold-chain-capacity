import { useEffect, useState } from 'react'
import KenyaMap from './components/KenyaMap'
import TopBar from './components/TopBar'
import { FaSearch } from 'react-icons/fa'
import FilteredDropdowns from './components/FilteredDropdown'
import { Facility } from './types/FacilityData'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

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
      }
      fetchFacilitiesData()
    }, [])

    
  return (
    <>
      <TopBar />
      <div className='flex'>
        <div className='bg-white rounded-lg mb-4 mt-6 ml-6 shadow-md W-[367px] h-[1054px]'>
          <div className='flex items-center justify-between p-4 border-b border-gray-200'>
            <h2 className='text-2xl font-bold'>Health Facilities</h2>

            <div className='relative w-full max-w-xs ml-4'>
              <input
                type='text'
                placeholder='Search...'
                className='rounded-lg pl-10 pr-4 py-2 w-full border border-gray-300 shadow-sm'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
            </div>
          </div>
          {/* Scrollable container with a fixed height */}
          <div className='p-4 max-h-96 overflow-y-auto'>
            <FilteredDropdowns
              facilitiesData={facilitiesData}
              selectedCounty={selectedCounty}
              setSelectedCounty={setSelectedCounty}
              selectedSubCounty={selectedSubCounty}
              setSelectedSubCounty={setSelectedSubCounty}
              selectedFacility={selectedFacility}
              setSelectedFacility={setSelectedFacility}
            />
          </div>
        </div>
        <div className='max-w-xl mx-auto flex-grow'>
          <KenyaMap facilitiesData={facilitiesData} selectedFacility={selectedFacility} />
        </div>
      </div>
    </>
  )
}

export default App
