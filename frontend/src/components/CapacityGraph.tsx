import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Facility } from '@/types/FacilityData';
import { useFacilityContext } from '@/context/FacilityContext';

interface CapacityGraphProps {
  facilities: Facility[];
}

const CapacityGraph: React.FC<CapacityGraphProps> = ({ facilities }) => {
      const { selectedSubCounty } = useFacilityContext()
    
  // Prepare data for the chart
  const chartData = facilities.map((facility) => ({
    name: facility.Facility_Name,
    capacity: facility.capacity_in_litres,
    available: facility.Available_Cold_Boxes,
  }));

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2 className="text-lg font-bold mb-4">Facility Capacities in {selectedSubCounty}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="capacity" fill="#8884d8" name="Total Capacity" />
          <Bar dataKey="available" fill="#82ca9d" name="Available Space" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CapacityGraph;
