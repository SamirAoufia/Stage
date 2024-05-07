"use client"
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { DataTablecuisson} from '@/components/datatable/datatablecuisson';

const CuissonForm = () => {
  const [data, setData] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [ds18b20Temp, setDs18b20Temp] = useState(0);
  const [mlxTemp, setMlxTemp] = useState(0);
  const [thermocoupleTemp, setThermocoupleTemp] = useState(0);
  const [thermocoupleTestoTemp, setThermocoupleTestoTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [power, setPower] = useState(0);
  const [dataSent, setDataSent] = useState(false);
  const [selectedPlat, setSelectedPlat] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [rangedebut, setRangeDebut] = useState([]);
  const [rangefin, setRangeFin] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [dataGraphique, setDataGraphique] = useState([]);


  useEffect(() => {
    handleUserApi();
  }, []);

  useEffect(() => {
    if (selectedDateTime ) {
      PostDataToAPI();
    }
  }, [selectedDateTime]);

  useEffect(() => {
    if (dataSent) {
      handlegraphiqueapi();
    }
  }, [dataSent]);


  const handlegraphiqueapi = async () => {
    try {
      const response = await fetch(`../api/plaquedecuisson`);
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
  
      setDataGraphique(adjustedData);
      setDataSent(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  


  const handleUserApi = async () => {
    try {
      const response = await fetch(`../api/plaquedecuissonchoix`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async function PostDataToAPI() {
    try {
      const response = await fetch(`../api/plaquedecuisson`,{
        method: 'POST',
        body: JSON.stringify({from: rangedebut,to: rangefin}),
      
      });
      setDataSent(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const uniqueplat = Array.from(new Set(data.map(personne => personne.plat)));



  const handlePlatSelect = (selectedPlat) => {
    
    setSelectedPlat(selectedPlat);
    const selectedPersonData = data.filter(personne => personne.plat === selectedPlat);
  
    const selectedPersonDates = selectedPersonData.map(personne => `${personne.date} ${personne.debuth}:${personne.debutm} - ${personne.finh}:${personne.finm}`);
    setSelectedDates(selectedPersonDates);
  
    const selectedPersonDescriptions = selectedPersonData.map(personne => personne.description);
    setSelectedDescription(selectedPersonDescriptions);
    setSelectedDateTime("");
  
  
  };

  
  


  

  const handleDateTimeSelect = (selectedDateTime) => {
    setSelectedDateTime(selectedDateTime);

    const [dateString, timeString,timeString2, timeString3] = selectedDateTime.split(" ");
    // Extraire l'année, le mois et le jour de la date
    const [year, month, day] = dateString.split("-");
    // Extraire l'heure et les minutes du temps
    const [hours, minutes] = timeString.split(":");
    const [hours2, minutes2] = timeString3.split(":");
  
    // Créer un objet Date avec les valeurs extraites
    const selectedDate = new Date(year, month - 1, day, hours, minutes);
    const selectedDate2 = new Date(year, month - 1, day, hours2, minutes2);
  
    // Formater la date et l'heure dans le format requis
    const formattedDateTime = selectedDate.toISOString();
    const formattedDateTime2 = selectedDate2.toISOString();




    setRangeDebut(formattedDateTime);
    setRangeFin(formattedDateTime2);
  };



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
       
        <div className="flex justify-center mt-6">  
        <Select onValueChange={handlePlatSelect}>
          <SelectTrigger className="w-[280px]">
            <SelectValue>{selectedPlat}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {uniqueplat.map((plat) => (
              <SelectItem key={plat} value={plat}>
                {plat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>
      
        {selectedPlat && (
        <div className="flex justify-center mt-6">
          <Select onValueChange={handleDateTimeSelect}>
            <SelectTrigger className="w-[280px]">
              <SelectValue>{selectedDateTime}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {selectedDates.map((dateTime, index) => (
                <SelectItem key={index} value={dateTime}>
                  {dateTime}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
         
        </div>
      )} 

      {selectedDateTime && selectedPlat && (
        <>
        <div className="flex justify-center mt-5 mb-5">

<Card>
<CardHeader>
  <CardTitle>Description</CardTitle>
  <CardDescription>{selectedDescription[selectedDates.indexOf(selectedDateTime)]}</CardDescription>
</CardHeader>
</Card>

        </div>
        
        
        
        <div className='flex justify-center gap-x-5'>
          <Button
            onClick={handleClickHumidity}
            className='mt-5 hover:bg-[#AB9D62]'
            variant={humidity === 0 ? "default" : 'outline' }
          >Humidity 
          </Button>
         

          <Button 
          onClick={handleClickTemperature} 
          className='mt-5 hover:bg-[#AB9D62]' 
          variant={temperature === 0 ? "default" : 'outline' }>
          Temperature
          </Button>

          <Button
            onClick={handleClickThermocoupleTestoTemp}
            className='mt-5 hover:bg-[#AB9D62]'
            variant={thermocoupleTestoTemp === 0 ? "default" : 'outline' }
          >ThermoTestoTemp
          </Button>

          <Button
            onClick={handleClickPower}
            className='mt-5 hover:bg-[#AB9D62]'
            variant={power === 0 ? "default" : 'outline' }
          > Power
          </Button>

          <Button
            onClick={handleClickMlxTemp}
            className='mt-5 hover:bg-[#AB9D62] '
            variant={mlxTemp === 0 ? "default" : 'outline' }
          >MlxTemp
          </Button>
          <Button
            onClick={handleClickThermocoupleTemp}
            className='mt-5 hover:bg-[#AB9D62]'
            variant={thermocoupleTemp === 0 ? "default" : 'outline' }
          > ThermocoupleTemp
          </Button>

          <Button
            onClick={handleClickDs18b20Temp}
            className='mt-5 hover:bg-[#AB9D62]'
            variant={ds18b20Temp === 0 ? "default" : 'outline' }
          >Ds18b20Temp
          </Button>
      </div>



      <div className='flex justify-center h-[600px] mt-10'>
      <ResponsiveContainer width="90%" height="100%">
        <LineChart data={dataGraphique}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_time" tickFormatter={(time) => {
    // Extraire l'heure de la chaîne de temps
    const [, timeString] = time.split("T");
    const [hours, minutes, seconds] = timeString.split(":")

    // Formater l'heure avec les ajustements
    return `${hours}:${minutes}:${seconds}`;
  }} />
  <YAxis />
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

      {!dataSent &&(
            <div className="p-16"><DataTablecuisson/></div>
          )}
        
        </>

       ) }


     
    </main>
  );
}

export default CuissonForm;
