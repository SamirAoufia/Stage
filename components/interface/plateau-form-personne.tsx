'use client'

import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ChoixPersonne = () => {
  const [data, setData] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    handleUserApi();
  }, []);

  const handleUserApi = async () => {
    try {
      const response = await fetch('../api/plateau1choix');
      const data = await response.json();
      setData(data);
      console.log(data); // Log the fetched data to the console
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Obtenir les noms uniques à partir des données
  const uniqueNames = Array.from(new Set(data.map(personne => personne.name)));

  // Gérer la sélection d'un nom depuis la table
  const handleTableSelect = (name) => {
    setSelectedName(name);
    const selectedPersonDates = data.filter(personne => personne.name === name)
      .map(personne => `${personne.date} ${personne.debuth}:${personne.debutm} - ${personne.finh}:${personne.finm}`);
    setSelectedDates(selectedPersonDates);
  };

  // Gérer la sélection d'un nom depuis le Select
  const handleNameSelect = (event) => {
    const selectedName = event.target.value;
    setSelectedName(selectedName);

    // Trouver les dates et heures correspondant au nom sélectionné
    const selectedPersonDates = data.filter(personne => personne.name === selectedName)
      .map(personne => `${personne.date} ${personne.debuth}:${personne.debutm} - ${personne.finh}:${personne.finm}`);
    setSelectedDates(selectedPersonDates);
  };

  return (
    <main>
      <h1 className='flex items-center justify-center my-3 text-5xl text-[#AB9D62] underline'>
        Choix Personne
      </h1>

      {data.map((personne: { id: string, name: string, date: string, debuth: string, debutm:string, finh:string,finm:string })  => (
        <div key={personne.id} onClick={() => handleTableSelect(personne.name)}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Heure de début</TableHead>
                <TableHead>Heure de fin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{personne.id}</TableCell>
                <TableCell>{personne.name}</TableCell>
                <TableCell>{personne.date}</TableCell>
                <TableCell>{personne.debuth}:{personne.debutm}</TableCell>
                <TableCell>{personne.finh}:{personne.finm}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}

      <div className="flex justify-center mt-6">
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
      </div>

      <div className="flex justify-center mt-6">
        <ul>
          {selectedDates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default ChoixPersonne;