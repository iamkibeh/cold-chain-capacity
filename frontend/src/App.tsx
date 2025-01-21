import KenyaMap from './components/KenyaMap'
import TopBar from './components/TopBar'

function App() {

  return (
    <>
    <TopBar />
      <div className='max-w-xl mx-auto'>
        <KenyaMap selectedFacility={null} />
      </div>
    </>
  )
}

export default App;
