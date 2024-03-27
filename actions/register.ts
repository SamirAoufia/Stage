"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import {db} from "@/lib/db"
import { RegisterSchema } from "@/schemas"
import { getUserByUsername } from "@/data/user"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const valitation = RegisterSchema.safeParse(values)

    if(!valitation.success) {
      return {Error: "Erreur"}
  }

  const {username, password,name} = valitation.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser =  await getUserByUsername(username)

  if(existingUser) {
    return {Error: "Utilisateur existe déjà"}
  }

  await db.user.create({
    data: {
      username,
      password: hashedPassword,
      name,
      role: values.role
        }
  })

//todo send verification 

  return {success: "Utilisateur enregistré avec succès"}
}