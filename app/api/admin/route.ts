import { NextResponse } from "next/server";
import  { getAllUsers } from "@/data/user";
import {currentRole } from "@/lib/auth";

export async function GET(){

  const users = await getAllUsers()
  const role = await currentRole()

  if(role === 'Admin'){
    return NextResponse.json(users)}
  else{
    return NextResponse.json({error: 'Unauthorized'})
  }
  }
