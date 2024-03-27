"use server"

import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { signIn } from "@/auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values)

  if(!validation.success) {
    return {Error: "Erreur"}
  }

  const {username, password} = validation.data

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { Error: "Invalid credentials!" }
        default:
          return { Error: "Something went wrong!" }
      }
    }
  throw error
  }
} 
