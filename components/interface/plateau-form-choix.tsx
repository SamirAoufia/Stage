"use client"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {json2csv} from 'json-2-csv';
import { Button } from "@/components/ui/button";
import { DateRangePicker } from '@/components/calendrier/data-picker-plateau1';
import { DateRangePicker2 } from '@/components/calendrier/data-picker-plateau2';

const PlateauForm = () => {
  const [data, setData] = useState([]);
  const [selectedPlateau, setSelectedPlateau] = useState(''); // Défaut sélectionné

  useEffect(() => {
    fetchDataFromAPI(); // Appeler l'API une fois au chargement initial
    const intervalId = setInterval(fetchDataFromAPI, 2000); // Mettre à jour toutes les 2 secondes
    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage
  }, [selectedPlateau]); // Rafraîchir les données lorsque la valeur sélectionnée change

  // Fonction pour récupérer les données de l'API
  async function fetchDataFromAPI() {
    try {
      const response = await fetch(`../api/${selectedPlateau}`);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleDownload = () => {
    const csvData = json2csv(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =  `${selectedPlateau}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };



  return (

      <main>
        <h1 className='flex items-center justify-center  my-3  text-5xl  text-[#AB9D62]  underline' >GRAPHIQUE PLATEAU</h1>



        <div className=' flex justify-center mt-6 '>
          <Select onValueChange={(value) => setSelectedPlateau(value)} >
            <SelectTrigger className="w-[280px]">
              <SelectValue>{selectedPlateau}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem  value={'plateau1'}>Plateau 1</SelectItem>
              <SelectItem  value={'plateau2'}>Plateau 2</SelectItem>
            </SelectContent>
          </Select>
          </div>

          <div className='flex justify-center mt-6 space-x-5 '>
            
            {selectedPlateau === 'plateau1' && (
              <>
              <DateRangePicker locale='fr' /><Button onClick={handleDownload} className=" hover:bg-[#AB9D62]">
            Télécharger CSV
          </Button></>

            )}
            {selectedPlateau === 'plateau2' && (
              <>
              <DateRangePicker2 locale='fr' /><Button onClick={handleDownload} className=" hover:bg-[#AB9D62]">
            Télécharger CSV
          </Button></>
            )}
          </div>

          
          <div className='flex justify-center h-[600px] mt-8'>
        <ResponsiveContainer width="90%" height="100%">
          <LineChart  data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Ptot" stroke="#049abb" />
          </LineChart>
        </ResponsiveContainer>
        </div>

      </main>
          

  );
}

export default PlateauForm;
