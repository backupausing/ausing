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
    // Controllo cookie
    const savedConsent = localStorage.getItem("cookie_consent");
    
    if (savedConsent === "true") {
      setConsent(true);
    } else if (savedConsent === null) {
      // Se non c'è scelta, mostra il banner dopo un breve ritardo 
      // per evitare conflitti di idratazione
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
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
      {/* Script Google Analytics */}
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

      {/* Script Microsoft Clarity */}
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

      {/* Banner GDPR - Z-Index altissimo e struttura fissa */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          <div className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="text-sm text-gray-600 text-center md:text-left">
              <p className="font-bold text-gray-900 mb-1">Rispettiamo la tua privacy</p>
              <p>
                Questo sito utilizza cookie tecnici e di analisi anonima per offrirti un'esperienza migliore. 
                Nessun dato viene venduto a terzi.
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <button 
                onClick={declineCookies}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Solo necessari
              </button>
              <button 
                onClick={acceptCookies}
                className="px-6 py-2.5 bg-terracotta text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-sm"
              >
                Accetta tutto
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
