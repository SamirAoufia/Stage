"use client"
import React, { useState, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import DateRangePicker2 from '@/components/calendrier/data-picker-time-plateau1';



const PlateauForm = () => { 
  const [data, setData] = useState([]);
  const [selectedPlateau, setSelectedPlateau] = useState(''); // Défaut sélectionné







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

          <div className='flex justify-center mt-6 gap-x-5 '>
            
            {selectedPlateau === 'plateau1' && (
              <>

              <DateRangePicker2  />
              </>

            )}
            {selectedPlateau === 'plateau2' && (
              <>
 
              <Button  className=" hover:bg-[#AB9D62]">
            Télécharger CSV
          </Button></>
            )}
          </div>


      </main>
          

  );
}

export default PlateauForm;
