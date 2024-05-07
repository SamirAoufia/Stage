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
import { Button } from "@/components/ui/button";


const PlateauForm = () => {
  const [data, setData] = useState([]);
  const [selectedPlateau, setSelectedPlateau] = useState(''); // Défaut sélectionné

  async function fiveminute() {
    try {
      const response = await fetch(`../api/${selectedPlateau}`,{
        method: 'POST',
        body: JSON.stringify({time: '-5m'}),
      
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fifteenminute() {
    try {
      const response = await fetch(`../api/${selectedPlateau}`,{
        method: 'POST',
        body: JSON.stringify({time: '-15m'}),
      
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function OneHour() {
    try {
      const response = await fetch(`../api/${selectedPlateau}`,{
        method: 'POST',
        body: JSON.stringify({time: '-1h'}),
      
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchDataFromAPI(); // Appeler l'API une fois au chargement initial
    const intervalId = setInterval(fetchDataFromAPI, 3000); // Mettre à jour toutes les 2 secondes
    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage
  }, [selectedPlateau]); // Rafraîchir les données lorsque la valeur sélectionnée change

  // Fonction pour récupérer les données de l'API
  async function fetchDataFromAPI() {
    try {
      const response = await fetch(`../api/${selectedPlateau}`);
      const responseData = await response.json();
 // Ajuster les horodatages en ajoutant 2 heures
 const adjustedData = responseData.map(item => {
  // Convertir la chaîne de date en objet Date
  const originalTime = new Date(item._time);
  // Ajouter 2 heures
  const adjustedTime = new Date(originalTime.getTime() + (2 * 60 * 60 * 1000));
  // Mettre à jour l'horodatage dans l'objet
  return { ...item, _time: adjustedTime.toISOString() };
});
      
      setData(adjustedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }




  return (

      <main>
        <h1 className='flex items-center justify-center  my-3  text-5xl  text-[#AB9D62]  underline' >GRAPHIQUE PLATEAU</h1>



        <div className=' flex justify-center mt-6 '>
          <Select onValueChange={(value) => setSelectedPlateau(value)} >
            <SelectTrigger className="w-[280px]">
              <SelectValue>{selectedPlateau} </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem  value={'plateau1direct'}>Plateau 1</SelectItem>
              <SelectItem  value={'plateau2direct'}>Plateau 2</SelectItem>
            </SelectContent>
          </Select>
          </div>

          <div className='flex justify-center mt-6  gap-x-5'>
            
            {selectedPlateau === 'plateau1direct' && (
              <>
          
          <Button onClick={fiveminute} className=" hover:bg-[#AB9D62]">
            5 dernières minutes
          </Button>
          <Button onClick={fifteenminute} className=" hover:bg-[#AB9D62]">
            15 dernières minutes
          </Button>
          <Button onClick={OneHour} className=" hover:bg-[#AB9D62]">
            1 heure
          </Button>
          
          </>
          

            )}
            {selectedPlateau === 'plateau2direct' && (
              <>
 
          <Button onClick={fiveminute} className=" hover:bg-[#AB9D62]">
            5 dernières minutes
          </Button>
          <Button onClick={fifteenminute} className=" hover:bg-[#AB9D62]">
            15 dernières minutes
          </Button>
          <Button onClick={OneHour} className=" hover:bg-[#AB9D62]">
            1 heure
          </Button>
          </>
            )}
          </div>

          
          <div className='flex justify-center h-[600px] mt-8'>
        <ResponsiveContainer width="90%" height="100%">
          <LineChart  data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_time" tickFormatter={(time) => {
    // Extraire l'heure de la chaîne de temps
    const [, timeString] = time.split("T");
    const [hours, minutes, seconds] = timeString.split(":")

    // Formater l'heure avec les ajustements
    return `${hours}:${minutes}:${seconds}`;
  }} />
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
