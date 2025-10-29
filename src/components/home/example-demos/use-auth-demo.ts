/**
 * Auth Demo Auto-play Hook
 * Extracted to keep main component under 300 lines
 */

import { useEffect } from "react";

interface AuthDemoState {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setEmailTouched: (value: boolean) => void;
  setPasswordTouched: (value: boolean) => void;
  setIsSubmitting: (value: boolean) => void;
  setShowSuccess: (value: boolean) => void;
}

export function useAuthDemo(state: AuthDemoState) {
  useEffect(() => {
    const demoSequence = async () => {
      // Wait a bit before starting
      await new Promise((r) => setTimeout(r, 2000));

      // Type email
      const emailText = "sarah@company.com";
      for (let i = 0; i <= emailText.length; i++) {
        state.setEmail(emailText.slice(0, i));
        await new Promise((r) => setTimeout(r, 100));
      }
      state.setEmailTouched(true);
      await new Promise((r) => setTimeout(r, 800));

      // Type password
      const passwordText = "SecurePass123!";
      for (let i = 0; i <= passwordText.length; i++) {
        state.setPassword(passwordText.slice(0, i));
        await new Promise((r) => setTimeout(r, 80));
      }
      state.setPasswordTouched(true);
      await new Promise((r) => setTimeout(r, 1000));

      // Submit
      state.setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 1500));
      state.setIsSubmitting(false);
      state.setShowSuccess(true);
      await new Promise((r) => setTimeout(r, 2500));

      // Reset
      state.setShowSuccess(false);
      state.setEmail("");
      state.setPassword("");
      state.setEmailTouched(false);
      state.setPasswordTouched(false);
    };

    demoSequence();
    const interval = setInterval(demoSequence, 15000);
    return () => clearInterval(interval);
  }, [state]);
}
