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

export const ResetPasswordSchema = z.object({

  id: z.string().min(1, {
    message: "Id is required",
  }),

  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const DeleteUserSchema = z.object({
  id: z.string().min(1, {
    message: "Id is required",
  }),
});

export const PlateauSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string(),
  
  date: z.string().min(1, {
    message: "Date is required",
  }),
  debutheure: z.string().min(1, {
    message: "Start time is required",
  }),
  debutminute: z.string().min(1, {
    message: "Start time is required",
  }),
  finheure: z.string().min(1, {
    message: "End time is required",
  }),
  finminute: z.string().min(1, {
    message: "End time is required",
  }),
});