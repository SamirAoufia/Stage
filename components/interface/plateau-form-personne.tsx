'use client'

import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataTableplateau1 } from '@/components/datatable/datatableplateau1';
import { DataTableplateau2 } from '@/components/datatable/datatableplateau2';
import {json2csv} from 'json-2-csv';
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";



const ChoixPersonne = () => {
  const [data, setData] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [rangedebut, setRangeDebut] = useState([]);
  const [rangefin, setRangeFin] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [dataGraphique, setDataGraphique] = useState([]);
  const [dataSent, setDataSent] = useState(false);
  const [selectedPlateau, setSelectedPlateau] = useState('');  
  
  useEffect(() => {
    if (dataSent) {
      handlegraphiqueapi();
    }
  }, [dataSent]);
  
  
  useEffect(() => {
    if (selectedDateTime && selectedPlateau) {
      PostDataToAPI();
    }
  }, [selectedDateTime, selectedPlateau]);
  


  useEffect(() => {
    if (selectedPlateau) {
      handleUserApi();
    }
  }, [selectedPlateau]);

  const handlegraphiqueapi = async () => {
    try {
      const response = await fetch(`../api/${selectedPlateau}`);
      const data = await response.json();
      setDataGraphique(data);
      setDataSent(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleUserApi = async () => {
    try {
      const response = await fetch(`../api/${selectedPlateau}choix`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async function PostDataToAPI() {
    try {
      const response = await fetch(`../api/${selectedPlateau}`,{
        method: 'POST',
        body: JSON.stringify({from: rangedebut,to: rangefin}),
      
      });
      setDataSent(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const uniqueNames = Array.from(new Set(data.map(personne => personne.name)));



  const handleNameSelect = (selectedName) => {
    
    setSelectedName(selectedName);
    const selectedPersonData = data.filter(personne => personne.name === selectedName);
  
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
  
  const handlePlateauSelect = (value) => {
    setSelectedPlateau(value);
    setSelectedName("");
    setSelectedDateTime(""); 
  };


  const handleDownload = () => {
    const csvData = json2csv(dataGraphique);
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
          <Select onValueChange={handlePlateauSelect}  >
            <SelectTrigger className="w-[280px]">
              <SelectValue>{selectedPlateau}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem  value={'plateau1'}>Plateau 1</SelectItem>
              <SelectItem  value={'plateau2'}>Plateau 2</SelectItem>
            </SelectContent>
          </Select>
          </div>



      <div className="flex justify-center mt-6">
        {selectedPlateau === 'plateau1' && (
          <>
        <Select onValueChange={handleNameSelect}>
          <SelectTrigger className="w-[280px]">
            <SelectValue>{selectedName}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {uniqueNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </>
    )}
    {selectedPlateau === 'plateau2' && (
          <>
        <Select onValueChange={handleNameSelect}>
          <SelectTrigger className="w-[280px]">
            <SelectValue>{selectedName}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {uniqueNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </>
    )}
  
      </div>
      

      {selectedName && (
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
      )} <div className="flex items-center justify-center mt-6 gap-x-5">
    <Button onClick={handleDownload} className=" hover:bg-[#AB9D62]">
                Télécharger CSV
              </Button>
      </div>



{selectedDateTime && selectedName && (
  <>
<div className="flex justify-center mt-5 mb-5">

  <Card>
  <CardHeader>
    <CardTitle>Description</CardTitle>
    <CardDescription>{selectedDescription[selectedDates.indexOf(selectedDateTime)]}</CardDescription>
  </CardHeader>
</Card>

          </div>
        
 <div className='flex justify-center h-[600px] '>
            <ResponsiveContainer width="90%" height="100%">
              <LineChart data={dataGraphique}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Ptot" stroke="#049abb" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {!dataSent &&  selectedPlateau === 'plateau1' &&(
            <div className="p-16"><DataTableplateau1/></div>
          )}
          {!dataSent &&  selectedPlateau === 'plateau2' &&(
            <div className="p-16"><DataTableplateau2/></div>
          )}


         
</>


)}






     



       


    </main>
  );
}

export default ChoixPersonne;





