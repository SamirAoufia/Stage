"use client"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {json2csv} from 'json-2-csv';
import { Button } from "@/components/ui/button";
import { DateRangePicker } from '@/components/calendrier/data-picker-bluetooth';
import { DataTablebluetooth } from '../datatable/datatablebluetooth';
import { set } from 'date-fns';

const BluetoothForm = () => {
  const [data, setData] = useState([]);
  const [dataSent, setDataSent] = useState(false);

  useEffect(() => {
    fetchDataFromAPI();
     // Appeler l'API une fois au chargement initial
    const intervalId = setInterval(fetchDataFromAPI, 2000); // Mettre à jour toutes les 2 secondes
    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage
  }, []); // Rafraîchir les données lorsque la valeur sélectionnée change

  async function fetchDataFromAPI() {
    try{
      const response = await fetch(`../api/bluetooth`);
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

  const handleDownload = () => {
    const csvData = json2csv(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =  'bluetooth.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };



  return (

      <main>
        <h1 className='text-center my-3 text-3xl md:text-4xl lg:text-5xl text-[#AB9D62] underline' >GRAPHIQUE BLUETOOTH</h1>



        <div className='flex flex-wrap justify-center mt-6 gap-x-5 gap-y-3 md:flex md:gap-x-5 md:gap-y-5'>

        <DateRangePicker
      locale="fr"
      />

          <Button onClick={handleDownload} className=" hover:bg-[#AB9D62]">
        Télécharger CSV
      </Button>

      <Button onClick={() => setDataSent(!dataSent)} className=" hover:bg-[#AB9D62]">
        Afficher le tableau
        </Button>
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
            <Line type="monotone" dataKey="bluetooth" stroke="#049abb" />
          </LineChart>
        </ResponsiveContainer>
        </div>

        {dataSent && (
            <div className='p-16'> <DataTablebluetooth/></div>
          )}

        

      </main>

  );
}

export default BluetoothForm;
