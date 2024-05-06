'use server'

import * as z from "zod"
import {db} from "@/lib/db"
import { CuissonSchema } from "@/schemas"

export const addCuisson = async (values: z.infer<typeof CuissonSchema>) => {
  const valitation = CuissonSchema.safeParse(values)

    if(!valitation.success) {
      return {Error: "Erreur"}
  }

  const {plat, date,description, debutheure,debutminute, finheure, finminute} = valitation.data

  await db.cuisson.create({
    data: {
      plat,
      description,
      date,
      debutheure,
      debutminute,
      finheure,
      finminute,
        }
  })

  return {success: "Date & plat ajouté avec succès"}
}