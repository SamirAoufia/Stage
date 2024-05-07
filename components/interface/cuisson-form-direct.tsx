"use client"
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/calendrier/data-picker-cuisson';

const CuissonForm = () => {
  const [data, setData] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [ds18b20Temp, setDs18b20Temp] = useState(0);
  const [mlxTemp, setMlxTemp] = useState(0);
  const [thermocoupleTemp, setThermocoupleTemp] = useState(0);
  const [thermocoupleTestoTemp, setThermocoupleTestoTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [power, setPower] = useState(0);

  
  const p = data.length > 0 ? (data[0] as any).Power : 0;
  const temp = data.length > 0 ? (data[0] as any).Temperature : 0;
  const ds = data.length > 0 ? (data[0] as any).Ds18b20Temp : 0;
  const mlx = data.length > 0 ? (data[0] as any).MlxTemp : 0;
  const tct = data.length > 0 ? (data[0] as any).ThermocoupleTemp : 0;
  const tctt = data.length > 0 ? (data[0] as any).ThermocoupleTestoTemp : 0;
  const hum = data.length > 0 ? (data[0] as any).Humidity : 0;


  useEffect(() => {
    setInterval(() => {
      fetchDataFromAPI();
    }, 2000);
  }, []);

  // Fonction pour récupérer les données de l'API
  async function fetchDataFromAPI() {
    try {
      const response = await fetch('../api/plaquedecuissondirect');
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

  async function fiveminute() {
    try {
      const response = await fetch(`../api/plaquedecuissondirect`,{
        method: 'POST',
        body: JSON.stringify({time: '-5m'}),
      
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fifteenminute() {
    try {
      const response = await fetch(`../api/plaquedecuissondirect`,{
        method: 'POST',
        body: JSON.stringify({time: '-15m'}),
      
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function OneHour() {
    try {
      const response = await fetch(`../api/plaquedecuissondirect`,{
        method: 'POST',
        body: JSON.stringify({time: '-1h'}),
      
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const handleClickTemperature = () => {
    const changement = temperature === 0 ? 1 : 0;
    setTemperature(changement);
  }

  const handleClickPower = () => {
    const changement = power === 0 ? 1 : 0;
    setPower(changement);
  }
  const handleClickDs18b20Temp = () => {
    const changement = ds18b20Temp === 0 ? 1 : 0;
    setDs18b20Temp(changement);
  }
  const handleClickMlxTemp = () => {
    const changement = mlxTemp === 0 ? 1 : 0;
    setMlxTemp(changement);
  }
  const handleClickThermocoupleTemp = () => {
    const changement = thermocoupleTemp === 0 ? 1 : 0;
    setThermocoupleTemp(changement);
  }
  const handleClickThermocoupleTestoTemp = () => {
    const changement = thermocoupleTestoTemp === 0 ? 1 : 0;
    setThermocoupleTestoTemp(changement);
  }
  const handleClickHumidity = () => {
    const changement = humidity === 0 ? 1 : 0;
    setHumidity(changement);
  }






  return (
    <main>
      
      <h1 className='flex items-center justify-center  my-3  text-5xl  text-[#AB9D62]  underline' >GRAPHIQUE CUISSON</h1>
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
      <div className='flex justify-center gap-x-5'>
          <Button
            onClick={handleClickHumidity}
            className='mt-5 hover:bg-[#AB9D62]'
            variant={humidity === 0 ? "default" : 'outline' }
          >Humidity = {hum}
          </Button>
        
          <Button 
          onClick={handleClickTemperature} 
          className='mt-5 hover:bg-[#AB9D62]' 
          variant={temperature === 0 ? "default" : 'outline' }>
          Temperature = {temp}
          </Button>

          <Button
            onClick={handleClickThermocoupleTestoTemp}
            className='mt-5 hover:bg-[#AB9D62]'
            variant={thermocoupleTestoTemp === 0 ? "default" : 'outline' }
          >ThermoTestoTemp = {tctt}
          </Button>

          <Button
            onClick={handleClickPower}
            className='mt-5 hover:bg-[#AB9D62]'
            variant={power === 0 ? "default" : 'outline' }
          > Power = {p}
          </Button>

          <Button
            onClick={handleClickMlxTemp}
            className='mt-5 hover:bg-[#AB9D62] '
            variant={mlxTemp === 0 ? "default" : 'outline' }
          >MlxTemp = {mlx}
          </Button>
          <Button
            onClick={handleClickThermocoupleTemp}
            className='mt-5 hover:bg-[#AB9D62]'
            variant={thermocoupleTemp === 0 ? "default" : 'outline' }
          > ThermocoupleTemp = {tct}
          </Button>

          <Button
            onClick={handleClickDs18b20Temp}
            className='mt-5 hover:bg-[#AB9D62]'
            variant={ds18b20Temp === 0 ? "default" : 'outline' }
          >Ds18b20Temp = {ds}
          </Button>
      </div>



      <div className='flex justify-center h-[600px] mt-10'>
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
          {/* Afficher les lignes pour les mesures sélectionnées */}
          { temperature === 1 ? <Line type="monotone" dataKey="Temperature" stroke="#8884d8" /> : null }
          { ds18b20Temp === 1 ? <Line type="monotone" dataKey="Ds18b20Temp" stroke="#82ca9d" /> : null }
          { power === 1 ? <Line type="monotone" dataKey="Power" stroke="#581845 " /> : null }
          { thermocoupleTemp === 1 ? <Line type="monotone" dataKey="ThermocoupleTemp" stroke=" #049abb " /> : null }
          { thermocoupleTestoTemp === 1 ? <Line type="monotone" dataKey="ThermocoupleTestoTemp" stroke="#1dc206 " /> : null }
          { humidity === 1 ? <Line type="monotone" dataKey="Humidity" stroke=" #e406b8 " /> : null }
          { mlxTemp === 1 ? <Line type="monotone" dataKey="MlxTemp" stroke=" #AB9D62 " /> : null }
        </LineChart>
      </ResponsiveContainer>
      </div>
    </main>
  );
}

export default CuissonForm;
