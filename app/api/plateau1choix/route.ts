


  import { NextResponse } from "next/server";

import { getChoiceP1 } from "@/data/choix";


export async function GET(){

  const choix = await getChoiceP1()


    return NextResponse.json(choix?.map(choix => ({id: choix.id, name: choix.name,description:choix.description, date: choix.date, debuth: choix.debutheure, debutm: choix.debutminute, finh: choix.finheure, finm: choix.finminute}) ) || [])}

  
