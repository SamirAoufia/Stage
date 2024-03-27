import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
// Pour le mode dev pour ne pas reload plusieurs client a chaque enregistrement des fichiers
// const db = new PrismaClient()
// pour le mode prod
