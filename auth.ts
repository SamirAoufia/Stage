import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db  }   from "@/lib/db"
import { Role } from "@prisma/client";
import { getUserById, getUserByUsername } from "@/data/user";



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async linkAccount({user}){
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          email: user.email
        }
      })
    }
  },
  callbacks: {

    async session({token, session} ) {

      if(token.sub && session.user){
        session.user.id = token.sub
      }

      
      if(token.role && session.user){
        session.user.role = await getUserById(session.user.id).then(user => user?.role as Role)
        session.user.username = await getUserById(session.user.id).then(user => user?.username ?? '')
      }

      return session

    },

    async jwt({token}){
      if (!token.name) return token;


      const user = await getUserByUsername(token.name)

      token.role = user?.role

      
      return token
    }
  },

  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },



  adapter: PrismaAdapter(db),
  session: { strategy: "jwt",
  maxAge:  24 * 60 * 60, // 24 hours
  updateAge:  1 * 60 * 60,  // 1 hour
},

  ...authConfig,
})
