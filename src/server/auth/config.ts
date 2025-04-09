import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      role: "pasien" | "nakes";
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   user: User & {
  //     nama: string
  //   }
  //   token: {
  //     nama: string
  //   }
  // }
}

export const authConfig = {
  providers: [
    Credentials({
      id: "pasien",
      name: "Pasien Credentials",

      credentials: {
        email: { label: "Username", type: "text", placeholder: "Username"},
        password: { label: "Password", type: "password", placeholder: "Password"        }
      },

      async authorize(credentials, ) {if (!credentials?.email || !credentials?.password) {
        return null;
      } 
      const existingUser = await db.pasien.findUnique({
        where: { email: credentials?.email as string },
      });
      if (!existingUser) {
        return null;
      }

      const passwordMatch = await compare(
        credentials?.password as string,
        existingUser.password
      )
      if (!passwordMatch) {
        return null;
      }
      return {
        id: `${existingUser.id}`,
        email: existingUser.email,
        name: existingUser.nama,
        role: "pasien",
      }
    }
    }),

    Credentials({
      id: "nakes",
      name: "Nakes Credentials",

      credentials: {
        email: { label: "Username", type: "text", placeholder: "Username"},
        password: { label: "Password", type: "password", placeholder: "Password"        }
      },

      async authorize(credentials, ) {if (!credentials?.email || !credentials?.password) {
        return null;
      } 
      const existingUser = await db.nakes.findUnique({
        where: { email: credentials?.email as string },
      });
      if (!existingUser) {
        return null;
      }

      const passwordMatch = await compare(
        credentials?.password as string,
        existingUser.password
      )
      if (!passwordMatch) {
        return null;
      }
      return {
        id: `${existingUser.id}`,
        email: existingUser.email,
        name: existingUser.nama,
        role: "nakes",
      }
    }
    })
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  adapter: PrismaAdapter(db),
  
  callbacks: {
    async jwt({ token, user }) {
      console.log({ token, user });
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      console.log({ session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          name: token.name as string,
        }
      }
    },
  }
} satisfies NextAuthConfig;
