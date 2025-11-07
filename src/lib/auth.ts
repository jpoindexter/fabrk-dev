import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

/**
 * NextAuth configuration
 * Keep under 100 lines following 300-line rule
 */

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password as string, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // Fetch fresh user data for subscription info and session version
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            subscriptionTier: true,
            customerId: true,
            trialEndsAt: true,
            sessionVersion: true,
          },
        });
        if (dbUser) {
          token.subscriptionTier = dbUser.subscriptionTier;
          token.customerId = dbUser.customerId;
          token.trialEndsAt = dbUser.trialEndsAt;
          token.sessionVersion = dbUser.sessionVersion;
        }
      }

      // Verify session version on every request (invalidate if changed)
      if (token.id && token.sessionVersion) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { sessionVersion: true },
        });

        // If session version doesn't match, invalidate the token
        if (!dbUser || dbUser.sessionVersion !== token.sessionVersion) {
          return null; // This will log the user out
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.subscriptionTier = token.subscriptionTier;
        session.user.customerId = token.customerId;
        session.user.trialEndsAt = token.trialEndsAt;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
