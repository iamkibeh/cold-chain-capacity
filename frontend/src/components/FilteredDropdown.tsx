import { Facility } from '@/types/FacilityData'

const FilteredDropdowns: React.FC<{
  facilitiesData: Facility[]
  selectedCounty: string | null
  setSelectedCounty: (county: string) => void
  selectedSubCounty: string | null
  setSelectedSubCounty: (subCounty: string | null) => void
  selectedFacility: string | null
  setSelectedFacility: (facility: string | null) => void
}> = ({
  facilitiesData,
  selectedCounty,
  setSelectedCounty,
  selectedSubCounty,
  setSelectedSubCounty,
  selectedFacility,
  setSelectedFacility,
}) => {
  // const [facilitiesData, setFacilitiesData] = useState<Facility[]>([])
  // const [selectedCounty, setSelectedCounty] = useState<string | null>(null)
  // const [selectedSubCounty, setSelectedSubCounty] = useState<string | null>(
  //   null
  // )
  // const [selectedFacility, setSelectedFacility] = useState<string | null>(null)

  // useEffect(() => {
  //   const fetchFacilitiesData = async () => {
  //     const response = await fetch(
  //       'https://coldchain-data-worker.prestonosoro56.workers.dev/'
  //     )
  //     const data = await response.json()
  //     setFacilitiesData(data)
  //     console.log(data)
  //   }
  //   fetchFacilitiesData()
  // }, [])

  // Get unique options for each dropdown
  const counties = Array.from(new Set(facilitiesData.map((f) => f.County)))
  const subCounties = selectedCounty
    ? Array.from(
        new Set(
          facilitiesData
            .filter((f) => f.County === selectedCounty)
            .map((f) => f['Sub.county'])
        )
      )
    : []
  const facilities = selectedSubCounty
    ? facilitiesData.filter((f) => f['Sub.county'] === selectedSubCounty)
    : []

  const selectedFacilityDetails = facilities.find(
    (f) => f.Facility_Name === selectedFacility
  )

  console.log({ selectedCounty, selectedSubCounty, selectedFacility })

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

      {/* a card displaying the subcounty aggregate values */}
      {selectedSubCounty && (
        <div className='p-4 border border-gray-300 rounded-lg shadow'>
          <h3 className='text-lg font-semibold'>{selectedSubCounty}</h3>
          <p className='text-sm text-gray-600'>
            Total Facilities:{' '}
            {
              facilities.filter(
                (facility) => facility['Sub.county'] === selectedSubCounty
              ).length
            }
          </p>
          <p className='text-sm text-gray-600'>
            Total Capacity:{' '}
            {facilities
              .filter(
                (facility) => facility['Sub.county'] === selectedSubCounty
              )
              .reduce(
                (acc, curr) => acc + parseFloat(curr.Total_Capacity),
                0
              )}{' '}
            liters
          </p>

          <p className='text-sm text-gray-600'>
            Total Unutilized Functional Capacity:{' '}
            {facilities
              .filter(
                (facility) => facility['Sub.county'] === selectedSubCounty
              )
              .reduce(
                (acc, curr) =>
                  acc + parseFloat(curr.Unutilized_Functional_Capacity || '0'),
                0
              )}{' '}
            liters
          </p>

          {/* <p className='text-sm text-gray-600'>
            Percentage of Operational Facilities:{' '}
            {(
              (facilities.filter(
                (facility) =>
                  facility['Sub.county'] === selectedSubCounty &&
                  facility.Operational_Status?.toLowerCase() === 'open'
              ).length /
                facilities.filter(
                  (facility) => facility['Sub.county'] === selectedSubCounty
                ).length) *
              100
            ).toFixed(2)}
            %
          </p> */}

          <p className='text-sm text-gray-600'>
            Facilities with Electricity {'>'} 8 hrs/day:{' '}
            {
              facilities.filter(
                (facility) =>
                  facility['Sub.county'] === selectedSubCounty &&
                  facility[
                    'KPLC.Electricity.Availability..More.than.8.hrs.day..Yes.No.'
                  ]?.toLowerCase() === 'yes'
              ).length
            }
          </p>
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
        <div className='p-4 mt-4 border border-gray-300 rounded-lg shadow space-y-3'>
          <h3 className='text-lg font-semibold'>
            {selectedFacilityDetails.Facility_Name}
          </h3>

          <p className='text-sm text-gray-600'>
            <span className='font-bold'>Total Capacity: </span>
            {selectedFacilityDetails.Total_Capacity} liters
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-bold'>Required Capacity: </span>
            {
              selectedFacilityDetails.Required_vaccine_capacity_each_month_in_litres
            }{' '}
            liters
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-bold'>Unutilized Capacity: </span>
            {selectedFacilityDetails.Unutilized_Functional_Capacity} liters
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-bold'>Children under 1 year: </span>
            {selectedFacilityDetails.Children_under_1_population_monthly_target}
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-bold'>10 year old girls population: </span>
            {
              selectedFacilityDetails[
                '10 year old girls population - monthly target'
              ]
            }
          </p>
          {/* <p className='text-sm text-gray-600'>
            Location: {selectedFacilityDetails.latitude},{' '}
            {selectedFacilityDetails.longitude}
          </p> */}
        </div>
      )}
    </div>
  )
}

export default FilteredDropdowns
