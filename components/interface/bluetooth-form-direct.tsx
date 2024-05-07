"use client"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';


const BluetoothFormDirect = () => {
  const [data, setData] = useState([]);


  async function fiveminute() {
    try {
      const response = await fetch(`../api/bluetoothdirect`,{
        method: 'POST',
        body: JSON.stringify({time: '-5m'}),
      
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fifteenminute() {
    try {
      const response = await fetch(`../api/bluetoothdirect`,{
        method: 'POST',
        body: JSON.stringify({time: '-15m'}),
      
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function OneHour() {
    try {
      const response = await fetch(`../api/bluetoothdirect`,{
        method: 'POST',
        body: JSON.stringify({time: '-1h'}),
      
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchDataFromAPI();
     // Appeler l'API une fois au chargement initial
    const intervalId = setInterval(fetchDataFromAPI, 2000); // Mettre à jour toutes les 2 secondes
    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage
  }, []); // Rafraîchir les données lorsque la valeur sélectionnée change

  async function fetchDataFromAPI() {
    try{
      const response = await fetch(`../api/bluetoothdirect`);
      const data = await response.json();
      // Ajuster les horodatages en ajoutant 2 heures
      const adjustedData = data.map(item => {
        // Convertir la chaîne de date en objet Date
        const originalTime = new Date(item._time);
        // Ajouter 2 heures
        const adjustedTime = new Date(originalTime.getTime() + (2 * 60 * 60 * 1000));
        // Mettre à jour l'horodatage dans l'objet
        return { ...item, _time: adjustedTime.toISOString() };
      });
      setData(adjustedData);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    
  }




  return (

      <main>
        <h1 className='flex items-center justify-center  my-3  text-5xl  text-[#AB9D62]  underline' >GRAPHIQUE EN DIRECT BLUETOOTH</h1>

        <div className='flex justify-center mt-6  gap-x-5'>
          
          
          <Button onClick={fiveminute} className=" hover:bg-[#AB9D62]">
            5 dernières minutes
          </Button>
          <Button onClick={fifteenminute} className=" hover:bg-[#AB9D62]">
            15 dernières minutes
          </Button>
          <Button onClick={OneHour} className=" hover:bg-[#AB9D62]">
            1 heure
          </Button>
        </div>


        <div className='flex justify-center h-[600px] mt-8'>
        <ResponsiveContainer width="90%" height="100%">
          <LineChart data={data}>
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
            <Line type="monotone" dataKey="bluetooth" stroke="#049abb" />
          </LineChart>
        </ResponsiveContainer>
        </div>
      </main>

  );
}

export default BluetoothFormDirect;
