/**
 * Cookie Consent Component - GDPR Compliant
 * Floating button with comprehensive modal
 * Styled with Fabrk neobrutalist design system
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
    // Push consent update to dataLayer for Google Tag Manager
    if (typeof window !== "undefined" && "dataLayer" in window) {
      const dataLayer = (window as { dataLayer?: unknown[] }).dataLayer;
      if (dataLayer) {
        dataLayer.push({
          event: "consent_update",
          ad_storage: prefs.marketing ? "granted" : "denied",
          analytics_storage: prefs.statistics ? "granted" : "denied",
          functionality_storage: prefs.preferences ? "granted" : "denied",
          personalization_storage: prefs.marketing ? "granted" : "denied",
        });
      }
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
      {/* Floating Cookie Button - Neobrutalist Style */}
      {showButton && !showModal && (
        <button
          onClick={openModal}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-brutal border-2 border-foreground bg-background px-4 py-3 text-foreground shadow-brutal transition-all duration-300 animate-in slide-in-from-bottom-5 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
          aria-label="Cookie Settings"
        >
          <Cookie className="size-5" />
          <span className="text-sm font-semibold">Cookie Settings</span>
        </button>
      )}

      {/* Cookie Modal - Neobrutalist Style */}
      {showModal && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className={`relative w-full max-w-2xl rounded-brutal border-2 border-foreground bg-background shadow-brutal-lg transition-all duration-300 ${
                isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-foreground p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-brutal border-2 border-foreground bg-muted p-2">
                    <Cookie className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Cookie Preferences</h2>
                    <p className="text-sm text-muted-foreground">
                      Manage your cookie settings
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="rounded-brutal border-2 border-foreground p-2 transition-colors hover:bg-muted"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b-2 border-foreground">
                {(["consent", "details", "about"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-3 text-sm font-semibold transition-colors ${
                      activeTab === tab
                        ? "border-b-4 border-primary bg-primary/10 text-primary"
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
