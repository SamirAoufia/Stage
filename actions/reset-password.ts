'use server'

import * as z from "zod";
import bcrypt from "bcryptjs";

import { ResetPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema> ,
) => {

  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { Error: "Erreur" };
  }

  const { id, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: id },
    data: { password: hashedPassword },
  });

  return { success: "Mot de passe réinitialiser" };
}