import FacilitySearch from "@/components/FacilitySearch"
import FilteredDropdowns from "@/components/FilteredDropdown"
import TopBar from "@/components/TopBar"
import { useFacilityContext } from "@/context/FacilityContext"
import { FaSearch } from "react-icons/fa"
import { Outlet } from "react-router-dom"

export default function Root() {
     const {
       facilitiesData,
       selectedCounty,
       setSelectedCounty,
       selectedSubCounty,
       setSelectedSubCounty,
       selectedFacility,
       setSelectedFacility,
     } = useFacilityContext()


    
  return (
    <>
      <TopBar />
      <div className='flex h-[100vh]'>
        <div className='bg-white rounded-lg mb-4 mt-6 ml-6 shadow-md W-[367px] h-full'>
          <div className='flex items-center justify-between p-4 border-b border-gray-200'>
            <h2 className='text-2xl font-bold'>Health Facilities</h2>

            <div className='relative w-full max-w-xs ml-4'>
              {/* <input
                type='text'
                placeholder='Search...'
                className='rounded-lg pl-10 pr-4 py-2 w-full border border-gray-300 shadow-sm'
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              /> */}
              <FacilitySearch />
              <FaSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
            </div>
          </div>
          {/* Scrollable container with a fixed height */}
          <div className='p-4 overflow-y-auto'>
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
        
        <div id='detail' className='flex-grow'>
          <Outlet />
        </div>
      </div>
    </>
  )
}