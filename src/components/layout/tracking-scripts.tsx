"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const GA4_ID = "G-D813C0VRPC";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
const isProduction = process.env.NODE_ENV === "production";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    lintrk?: ((event: string, payload?: Record<string, unknown>) => void) & {
      q?: unknown[];
    };
    _linkedin_data_partner_ids?: string[];
    _linkedin_partner_id?: string;
  }
}

function GoogleAnalyticsPageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isProduction || typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    const query = window.location.search;
    const pagePath = query ? `${pathname}${query}` : pathname;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_path: pagePath,
      page_location: window.location.href,
    });
  }, [pathname]);

  return null;
}

export function TrackingScripts() {
  return (
    <>
      {isProduction ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { send_page_view: false });
            `}
          </Script>
          <GoogleAnalyticsPageTracker />
        </>
      ) : null}

      {isProduction && META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}

      {isProduction && LINKEDIN_PARTNER_ID ? (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            window._linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
            (function(l) {
              if (!l) {
                window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q = [];
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript"; b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      ) : null}
    </>
  );
}
