import {db}   from "@/lib/db"

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username
      }
    })
    return user
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id
      }
    })
    return user
  } catch (error) {
    return null
  }
}

export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany()
    return users
  } catch (error) {
    return null
  }
}

