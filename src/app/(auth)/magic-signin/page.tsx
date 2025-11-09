"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Magic Link Sign-in Page
 * Auto-signs in users who click magic links from their email
 */
export default function MagicSigninPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Signing you in...");

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setStatus("error");
      setMessage("Invalid magic link. Please request a new one.");
      return;
    }

    // Attempt to sign in with magic token
    signIn("credentials", {
      email,
      magicToken: token,
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        setStatus("error");
        setMessage("This link has expired or is invalid. Please request a new one.");
      } else {
        setStatus("success");
        setMessage("Success! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    });
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-brutal border-4 border-black bg-background p-8 shadow-brutal-xl">
        <div className="text-center">
          <h1 className="text-3xl font-black">
            {status === "loading" && "Signing In"}
            {status === "success" && "Welcome Back!"}
            {status === "error" && "Oops!"}
          </h1>
          <p className="mt-4 text-lg font-bold text-foreground">
            {message}
          </p>
        </div>

        {status === "loading" && (
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-primary" />
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="font-bold text-primary underline hover:text-primary/80"
            >
              Back to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
