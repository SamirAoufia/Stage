'use server'

import * as z from "zod"
import {db} from "@/lib/db"
import { PlateauSchema } from "@/schemas"

export const addPlateau2 = async (values: z.infer<typeof PlateauSchema>) => {
  const valitation = PlateauSchema.safeParse(values)

    if(!valitation.success) {
      return {Error: "Erreur"}
  }

  const {name, date,description, debutheure,debutminute, finheure, finminute} = valitation.data

  await db.plateau2.create({
    data: {
      name,
      description,
      date,
      debutheure,
      debutminute,
      finheure,
      finminute,
        }
  })

  return {success: "Date du plateau 2 ajouté avec succès"}
}