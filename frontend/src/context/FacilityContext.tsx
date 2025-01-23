import React, { createContext, useState, useContext, useEffect } from 'react'
import { Facility } from '@/types/FacilityData'

// Define the context value type
interface FacilityContextType {
  facilitiesData: Facility[]
  selectedCounty: string | null
  setSelectedCounty: React.Dispatch<React.SetStateAction<string | null>>
  selectedSubCounty: string | null
  setSelectedSubCounty: React.Dispatch<React.SetStateAction<string | null>>
  selectedFacility: string | null
  setSelectedFacility: React.Dispatch<React.SetStateAction<string | null>>
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

// Create the context
const FacilityContext = createContext<FacilityContextType | undefined>(
  undefined
)

// Create a provider component
export const FacilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [facilitiesData, setFacilitiesData] = useState<Facility[]>([])
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null)
  const [selectedSubCounty, setSelectedSubCounty] = useState<string | null>(
    null
  )
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')


  // Fetch facilities data
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
    <FacilityContext.Provider
      value={{
        facilitiesData,
        selectedCounty,
        setSelectedCounty,
        selectedSubCounty,
        setSelectedSubCounty,
        selectedFacility,
        setSelectedFacility,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </FacilityContext.Provider>
  )
}

// Custom hook to use the context
export const useFacilityContext = () => {
  const context = useContext(FacilityContext)
  if (!context) {
    throw new Error('useFacilityContext must be used within a FacilityProvider')
  }
  return context
}
