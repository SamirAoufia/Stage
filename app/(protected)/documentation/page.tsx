"use client"
import {DateRangePicker} from "@/components/calendrier/data-picker";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DocumentationPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI();
     // Appeler l'API une fois au chargement initial
    const intervalId = setInterval(fetchDataFromAPI, 2000); // Mettre à jour toutes les 2 secondes
    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage
  }, []); // Rafraîchir les données lorsque la valeur sélectionnée change

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


  return (
    <main>
      <div  className=' flex justify-center mt-6 gap-x-5'>
      <DateRangePicker
      locale="fr"
      />
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


export default DocumentationPage