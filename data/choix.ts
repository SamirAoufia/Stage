import {db}   from "@/lib/db"


export const getChoiceP1 = async () => {
  try {
    const name = await db.plateau1.findMany()
    return name
  } catch (error) {
    return null
  }
}

export const getChoiceP2 = async () => {
  try {
    const name = await db.plateau2.findMany()
    return name
  } catch (error) {
    return null
  }
}

export const getCuisson = async () => {
  try {
    const plat = await db.cuisson.findMany()
    return plat
  } catch (error) {
    return null
  }
}