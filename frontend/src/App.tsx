import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KenyaMap from './components/KenyaMap'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <KenyaMap />
    </>
  )
}

export default App

import React, { useState, useEffect } from "react";
import "./index.css";
import TopBar from "./components/TopBar";

const App: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  // Dummy data for the cold chain project
  const dummyData = {
    facilities: [
      {
        id: 1,
        name: "Facility A",
        coldChainCapacity: 500,
        spaceUtilized: 300,
        availableCapacity: 200,
        location: { lat: 1.2921, lon: 36.8219 },
      },
      {
        id: 2,
        name: "Facility B",
        coldChainCapacity: 600,
        spaceUtilized: 400,
        availableCapacity: 200,
        location: { lat: 1.2956, lon: 36.8245 },
      },
      // Add more dummy facilities if needed
    ],
  };

  useEffect(() => {
    try {
      // Simulating a delay (like an API request)
      setTimeout(() => {
        console.log(dummyData);
      }, 1000); 
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }, []); // Dependency array can remain empty since dummyData is static

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      {error && (
        <div className="bg-red-500 text-white p-4 text-center">{error}</div>
      )}
      <div className="p-4">
        {/* Render dummy data */}
        <h2 className="text-xl font-bold">Cold Chain Facility Information</h2>
        <ul className="space-y-4 mt-4">
          {dummyData.facilities.map((facility) => (
            <li key={facility.id} className="p-4 bg-white shadow rounded-lg">
              <h3 className="font-semibold">{facility.name}</h3>
              <p>Cold Chain Capacity: {facility.coldChainCapacity}L</p>
              <p>Space Utilized: {facility.spaceUtilized}L</p>
              <p>Available Capacity: {facility.availableCapacity}L</p>
              <p>
                Location: {facility.location.lat}, {facility.location.lon}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;