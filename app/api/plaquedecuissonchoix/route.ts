


  import { NextResponse } from "next/server";

import { getCuisson } from "@/data/choix";


export async function GET(){

  const choix = await getCuisson()


    return NextResponse.json(choix?.map(choix => ({id: choix.id, plat: choix.plat,description:choix.description, date: choix.date, debuth: choix.debutheure, debutm: choix.debutminute, finh: choix.finheure, finm: choix.finminute}) ) || [])}

  
