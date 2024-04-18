"use client"
import React, { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plateau1FormAjoutPersonne } from '@/components/ajout/addplateau1';
import { Plateau2FormAjoutPersonne } from '@/components/ajout/addplateau2';

const PlateauForm = () => { 
  const [selectedPlateau, setSelectedPlateau] = useState(''); 
  return (
      <main >
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
                <Plateau1FormAjoutPersonne/>
                </>)}
            {selectedPlateau === 'plateau2' && (
              <>
              <Plateau2FormAjoutPersonne/></>
            )}
          </div>
      </main>
          

  );
}

export default PlateauForm;
