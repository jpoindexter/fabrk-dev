/**
 * Cookie Consent Component - GDPR Compliant
 * Floating button with comprehensive modal
 * Integrates with Google Consent Mode v2 for GTM
 */

"use client";

import { Cookie, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AboutTabContent, ConsentTabContent, DetailsTabContent } from "./cookie-consent-tabs";
import type { CookiePreferences } from "./cookie-consent-types";

export function CookieConsent() {
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState<"consent" | "details" | "about">("consent");
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    preferences: false,
    statistics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if localStorage is available (for Safari private browsing)
    try {
      const testKey = "__cookie_consent_test__";
      localStorage.setItem(testKey, "test");
      localStorage.removeItem(testKey);

      const consent = localStorage.getItem("cookie-consent");
      const consentDate = localStorage.getItem("cookie-consent-date");

      // Check if consent needs renewal (older than 12 months as per GDPR)
      if (consent && consentDate) {
        const daysSinceConsent = Math.floor(
          (Date.now() - new Date(consentDate).getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysSinceConsent < 365) {
          const savedPreferences = JSON.parse(consent);
          setPreferences(savedPreferences);
          updateGoogleConsent(savedPreferences);
        } else {
          setShowButton(true);
        }
      } else {
        setShowButton(true);
      }
    } catch {
      // localStorage not available, showing cookie consent
      setShowButton(true);
    }
  }, []);

  const updateGoogleConsent = (prefs: CookiePreferences) => {
    // Use gtag consent API for Google Consent Mode v2
    if (typeof window !== "undefined") {
      const win = window as Window & {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
      };

      // Ensure dataLayer and gtag exist
      win.dataLayer = win.dataLayer || [];
      if (!win.gtag) {
        win.gtag = function() {
          win.dataLayer?.push(arguments);
        };
      }

      // Update consent state
      win.gtag("consent", "update", {
        ad_storage: prefs.marketing ? "granted" : "denied",
        ad_user_data: prefs.marketing ? "granted" : "denied",
        ad_personalization: prefs.marketing ? "granted" : "denied",
        analytics_storage: prefs.statistics ? "granted" : "denied",
        functionality_storage: prefs.preferences ? "granted" : "denied",
        personalization_storage: prefs.marketing ? "granted" : "denied",
      });

      // Also push event for GTM triggers
      win.dataLayer?.push({
        event: "cookie_consent_update",
        cookie_consent: prefs,
      });
    }
  };

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem("cookie-consent", JSON.stringify(prefs));
      localStorage.setItem("cookie-consent-date", new Date().toISOString());
      updateGoogleConsent(prefs);
      closeModal();
    } catch (e) {
      console.error("Could not save cookie consent", e);
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      preferences: true,
      statistics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const acceptSelected = () => {
    saveConsent(preferences);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    saveConsent(onlyNecessary);
  };

  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowModal(false);
      setShowButton(false);
      setIsExiting(false);
      setActiveTab("consent");
    }, 300);
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (!showModal) {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  if (!showButton && !showModal) return null;

  return (
    <>
      {/* Floating Cookie Button */}
      {showButton && !showModal && (
        <button
          onClick={openModal}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border bg-background px-4 py-3 text-foreground transition-all duration-300 animate-in slide-in-from-bottom-5 hover:bg-muted"
          aria-label="Cookie Settings"
        >
          <Cookie className="size-5" />
          <span className="text-sm font-normal">Cookie Settings</span>
        </button>
      )}

      {/* Cookie Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={closeModal} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className={`relative w-full max-w-2xl rounded-lg border bg-background transition-all duration-300 ${
                isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border bg-muted p-2">
                    <Cookie className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold leading-tight text-foreground">Cookie Preferences</h2>
                    <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                      Manage your cookie settings
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="rounded-md p-2 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b">
                {(["consent", "details", "about"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="max-h-[60vh] overflow-y-auto p-6">
                {activeTab === "consent" && (
                  <ConsentTabContent
                    preferences={preferences}
                    setPreferences={setPreferences}
                    acceptAll={acceptAll}
                    acceptSelected={acceptSelected}
                    rejectAll={rejectAll}
                  />
                )}
                {activeTab === "details" && (
                  <DetailsTabContent preferences={preferences} setPreferences={setPreferences} />
                )}
                {activeTab === "about" && <AboutTabContent />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
