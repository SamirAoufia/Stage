"use client"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {json2csv} from 'json-2-csv';
import { Button } from "@/components/ui/button";

const BluetoothForm = () => {
  const [data, setData] = useState([]);

  const f1 = '2024-03-26';
  const f2 = '2024-03-27';

  useEffect(() => {
    fetchDataFromAPI();
     // Appeler l'API une fois au chargement initial
    const intervalId = setInterval(fetchDataFromAPI, 2000); // Mettre à jour toutes les 2 secondes
    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage
  }, []); // Rafraîchir les données lorsque la valeur sélectionnée change

  useEffect(() => {
    PostDataToAPI();
     // Appeler l'API une fois au chargement initial
    const intervalId = setInterval(PostDataToAPI, 2000); // Mettre à jour toutes les 2 secondes
    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage
  }, []); // Rafraîchir les données lorsque la valeur sélectionnée change

  // Fonction pour récupérer les données de l'API
  async function PostDataToAPI() {
    try {
      const response = await fetch(`../api/plateaudate`,{
        method: 'POST',
        body: JSON.stringify({f1,f2}),
      
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchDataFromAPI() {
    try{
      const response = await fetch(`../api/plateaudate`);
      const data = await response.json();
      setData(data);
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
        <h1 className='flex items-center justify-center  my-3  text-5xl  text-[#AB9D62]  underline' >GRAPHIQUE</h1>



        <div className=' flex justify-center mt-6 gap-x-5'>

          <Button onClick={handleDownload} className=" hover:bg-[#AB9D62]">
        Télécharger CSV
      </Button>
        </div>

        <div className='mt-8'>
          <LineChart width={1600} height={600} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Ptot" stroke="#049abb" />
          </LineChart>
        </div>
      </main>

  );
}

export default BluetoothForm;
