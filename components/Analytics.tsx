"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

type Props = {
  gaId: string;
  clarityId: string;
};

export default function Analytics({ gaId, clarityId }: Props) {
  const [consent, setConsent] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Controlla se c'è già una scelta salvata
    const savedConsent = localStorage.getItem("cookie_consent");
    if (savedConsent === "true") {
      setConsent(true);
    } else if (savedConsent === null) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setConsent(true);
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "false");
    setShowBanner(false);
  };

  return (
    <>
      {/* Script Google Analytics (Caricati solo se consent=true) */}
      {consent && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {/* Script Microsoft Clarity (Caricati solo se consent=true) */}
      {consent && clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}

      {/* Banner GDPR */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="text-sm text-gray-600">
            <p className="font-bold text-gray-800 mb-1">Rispettiamo la tua privacy</p>
            <p>Usiamo cookie tecnici e di analisi per migliorare l'esperienza. Accetti il tracciamento anonimo?</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={declineCookies}
              className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
            >
              Solo necessari
            </button>
            <button 
              onClick={acceptCookies}
              className="px-6 py-2 bg-terracotta text-white rounded text-sm font-bold hover:opacity-90 transition-opacity shadow-md"
            >
              Accetta tutto
            </button>
          </div>
        </div>
      )}
    </>
  );
}
