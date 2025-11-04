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
        magicToken: { label: "Magic Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          return null;
        }

        // Magic link authentication
        if (credentials.magicToken) {
          const magicToken = await prisma.verificationToken.findFirst({
            where: {
              identifier: credentials.email as string,
              token: credentials.magicToken as string,
              expires: { gt: new Date() },
            },
          });

          if (!magicToken) {
            return null;
          }

          // Delete the used token (one-time use)
          await prisma.verificationToken.delete({
            where: { token: credentials.magicToken as string },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        // Regular password authentication
        if (!credentials.password || !user.password) {
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
        // @ts-ignore - role exists in database but not in NextAuth user type
        token.role = user.role;
        // Fetch fresh user data for subscription info
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            subscriptionTier: true,
            customerId: true,
            trialEndsAt: true,
          },
        });
        if (dbUser) {
          token.subscriptionTier = dbUser.subscriptionTier;
          token.customerId = dbUser.customerId;
          token.trialEndsAt = dbUser.trialEndsAt;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).subscriptionTier = token.subscriptionTier as string;
        (session.user as any).customerId = token.customerId as string | null;
        (session.user as any).trialEndsAt = token.trialEndsAt as Date | null;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
