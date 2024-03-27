import * as z from "zod"

export const LoginSchema = z.object({
  username: z.string().min(1,{
    message: "Veuillez entrer un username valide"
  }),
  password: z.string().min(1, {
    message: "Veuillez entrer un mot de passe"
    })
})

export const RegisterSchema = z.object({
  username: z.string().min(1,{
    message: "Username Obligatoire pour l'inscription"
  }),
  password: z.string().min(6, {
    message: "Veuillez entrer un mot de passe valide 10 characteres minimum"
  }),

  name: z.string().min(1, {
    message: "Nom Obligatoire pour l'inscription"
  }),

  role: z.enum(["User", "Admin"])
})



export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});