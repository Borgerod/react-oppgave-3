"use client";

import { useEffect, useState } from "react";

export type GeoLocation = {
  lat: number;
  lng: number;
  city: string | null;
  country: string | null;
  countryCode: string | null;
  language: string | null;
  isDenied: boolean;
};

const defaultState: GeoLocation = {
  lat: 0,
  lng: 0,
  city: null,
  country: null,
  countryCode: null,
  language: null,
  isDenied: true,
};

export function useGeolocation(): GeoLocation {
  const [state, setState] = useState<GeoLocation>(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      return defaultState;
    }
    return { ...defaultState, isDenied: false };
  });

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            {
              headers: {
                "Accept-Language": navigator.language,
                "User-Agent": "react-oppgave-3/1.0",
              },
            },
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();

          const geoData: GeoLocation = {
            lat: latitude,
            lng: longitude,
            city:
              data.address?.city ??
              data.address?.village ??
              data.address?.town ??
              null,
            country: data.address?.country ?? null,
            countryCode: data.address?.country_code?.toUpperCase() ?? null,
            language: navigator.language ?? null,
            isDenied: false,
          };

          setState(geoData);
          localStorage.setItem("geoLocation", JSON.stringify(geoData));
        } catch (error) {
          console.log("GeolocationPositionError:", error);
          setState((s) => ({ ...s, isDenied: true }));
        }
      },
    );
  }, []);

  return state;
}

export default function GeolocationInit() {
  useGeolocation();
  return null;
}
