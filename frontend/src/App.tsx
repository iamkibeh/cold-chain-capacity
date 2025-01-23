import KenyaMap from './components/KenyaMap'
import { useFacilityContext } from './context/FacilityContext'

function App() {
    const { facilitiesData, selectedFacility } = useFacilityContext()

  return (
    <>
        <div className='max-w-xl mx-auto flex-grow my-8'>
            <KenyaMap facilitiesData={facilitiesData} selectedFacility={selectedFacility} />
      </div>
    </>
  )
}

export default App
