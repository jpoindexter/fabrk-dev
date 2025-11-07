/**
 * TypeScript declarations for NextAuth
 * Extends NextAuth types to include custom user properties
 */

import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role: "USER" | "ADMIN";
    subscriptionTier?: string | null;
    customerId?: string | null;
    trialEndsAt?: Date | null;
  }

  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
      subscriptionTier?: string | null;
      customerId?: string | null;
      trialEndsAt?: Date | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "USER" | "ADMIN";
    subscriptionTier?: string | null;
    customerId?: string | null;
    trialEndsAt?: Date | null;
    sessionVersion?: number;
  }
}
