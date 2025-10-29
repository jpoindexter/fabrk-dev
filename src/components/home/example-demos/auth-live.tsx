/**
 * Live Auth Demo - Production-quality authentication screen
 * Modeled after GitHub, Linear, and Notion login flows
 */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Chrome, Eye, EyeOff, Github, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useAuthDemo } from "./use-auth-demo";

export function AuthLiveDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Email validation
  const emailValid = email.length > 0 ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : null;
  const emailError = emailTouched && email.length > 0 && !emailValid;

  // Password validation
  const passwordStrength =
    password.length === 0
      ? null
      : password.length < 8
        ? "weak"
        : password.length < 12
          ? "medium"
          : "strong";
  const passwordError = passwordTouched && password.length > 0 && password.length < 8;

  // Auto-demo sequence
  useAuthDemo({
    setEmail,
    setPassword,
    setEmailTouched,
    setPasswordTouched,
    setIsSubmitting,
    setShowSuccess,
  });

  return (
    <div className="mx-auto w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border bg-card p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500">
            <div className="size-6 rounded-full bg-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="mb-4 flex items-center gap-3 rounded-lg border border-primary/20 bg-success/10 p-4"
            >
              <CheckCircle2 className="size-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Sign in successful!</p>
                <p className="text-xs text-muted-foreground">Redirecting to dashboard...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Login */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full" size="lg">
            <Github className="mr-2 size-5" />
            Continue with GitHub
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            <Chrome className="mr-2 size-5" />
            Continue with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="auth-email" className="text-sm font-medium">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="auth-email"
                type="email"
                placeholder="sarah@company.com"
                className={`pl-10 ${
                  emailValid
                    ? "border-emerald-500 focus-visible:ring-emerald-500"
                    : emailError
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
              />
              {emailValid && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle2 className="size-4 text-emerald-600" />
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {emailError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-1 text-xs text-destructive"
                >
                  <AlertCircle className="size-3" />
                  <span>Please enter a valid email address</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auth-password" className="text-sm font-medium">
                Password
              </Label>
              <button type="button" className="text-xs font-medium text-primary hover:underline">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`px-10 ${
                  passwordError ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            {/* Password Strength */}
            <AnimatePresence>
              {passwordStrength && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i === 0 && passwordStrength
                            ? passwordStrength === "weak"
                              ? "bg-destructive"
                              : passwordStrength === "medium"
                                ? "bg-warning"
                                : "bg-success"
                            : i === 1 &&
                                (passwordStrength === "medium" || passwordStrength === "strong")
                              ? passwordStrength === "medium"
                                ? "bg-warning"
                                : "bg-success"
                              : i === 2 && passwordStrength === "strong"
                                ? "bg-success"
                                : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs ${
                      passwordStrength === "weak"
                        ? "text-destructive"
                        : passwordStrength === "medium"
                          ? "text-accent-foreground"
                          : "text-primary"
                    }`}
                  >
                    Password strength:{" "}
                    <span className="font-medium capitalize">{passwordStrength}</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full"
            size="lg"
            disabled={!emailValid || passwordError || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <button className="font-medium text-primary hover:underline">Sign up</button>
        </p>
      </motion.div>
    </div>
  );
}
