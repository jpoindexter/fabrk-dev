/**
 * Auth Preview Component
 * Terminal-style login form with typing animation
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TerminalHeader } from "./terminal-header";

export function AuthPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [emailText, setEmailText] = useState("");
  const [passwordDots, setPasswordDots] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const fullEmail = "user@example.com";

  useEffect(() => {
    if (!isInView) return;

    // Typing animation for email
    let emailIndex = 0;
    const emailTimer = setInterval(() => {
      if (emailIndex <= fullEmail.length) {
        setEmailText(fullEmail.slice(0, emailIndex));
        emailIndex++;
      } else {
        clearInterval(emailTimer);
        // Start password animation after email is done
        let dotIndex = 0;
        const dotTimer = setInterval(() => {
          if (dotIndex <= 8) {
            setPasswordDots(dotIndex);
            dotIndex++;
          } else {
            clearInterval(dotTimer);
          }
        }, 100);
      }
    }, 80);

    // Blinking cursor
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(emailTimer);
      clearInterval(cursorTimer);
    };
  }, [isInView]);

  return (
    <div ref={ref} className="border-border bg-card w-full max-w-sm border">
      <TerminalHeader title="auth_module.exe" animated />

      <div className="p-6">
        <div className="text-muted-foreground mb-4 font-mono text-xs">[AUTH_FORM]:</div>

        <div className="space-y-4">
          <div>
            <span className="text-muted-foreground mb-1.5 block font-mono text-xs">EMAIL:</span>
            <div className="border-border bg-background flex min-h-[36px] items-center border px-3 py-2">
              <span className="text-muted-foreground font-mono text-xs">
                {emailText}
                {emailText.length < fullEmail.length && showCursor && (
                  <span className="text-primary">|</span>
                )}
              </span>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground mb-1.5 block font-mono text-xs">PASSWORD:</span>
            <div className="border-border bg-background flex min-h-[36px] items-center border px-3 py-2">
              <span className="text-muted-foreground font-mono text-xs">
                {"•".repeat(passwordDots)}
                {passwordDots < 8 && passwordDots > 0 && showCursor && (
                  <span className="text-primary">|</span>
                )}
              </span>
              {passwordDots === 0 && emailText.length >= fullEmail.length && showCursor && (
                <span className="text-primary font-mono text-xs">|</span>
              )}
            </div>
          </div>
          <div className="bg-primary cursor-pointer px-4 py-2 text-center transition-opacity hover:opacity-90">
            <span className="text-primary-foreground font-mono text-xs">&gt; AUTHENTICATE</span>
          </div>
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="border-border w-full border-t" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card text-muted-foreground px-2 font-mono text-xs">OR</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-border hover:border-primary/50 cursor-pointer border px-4 py-2 text-center transition-colors">
              <span className="font-mono text-xs">GOOGLE</span>
            </div>
            <div className="border-border hover:border-primary/50 cursor-pointer border px-4 py-2 text-center transition-colors">
              <span className="font-mono text-xs">MICROSOFT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
