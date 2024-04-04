'use server'

import * as z from "zod";
import { db } from "@/lib/db";
import { DeleteUserSchema } from "@/schemas";

export const deleteUser = async (
  values: z.infer<typeof DeleteUserSchema>,
) => {
  const validatedFields = DeleteUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { Error: "Erreur" };
  }

  const { id } = validatedFields.data;

  await db.user.delete({
    where: { id: id },
  });

  return { success: "Utilisateur supprimer" };
}