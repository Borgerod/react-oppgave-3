"use client";

import { useGeolocation, GeoLocation } from "@/app/hooks/useGeolocation";
import { cn } from "../lib/utils";

export default function GeoLocationTestPage() {
  const geo: GeoLocation = useGeolocation();
  //   if (geo.status === "loading") return <p>Requesting location...</p>;
  //   if (geo.status === "denied") return <p>Location denied.</p>;

  return (
    <div>
      <p>
        Coordinates: {geo.lat}, {geo.lng}
      </p>
      <p>City: {geo.city}</p>
      <p>Country: {geo.country}</p>
      <p>Country code: {geo.countryCode}</p>
      <p>Browser language: {geo.language}</p>
    </div>
  );
}

// "use client";

// import { useGeolocation, GeoLocation } from "@/app/hooks/useGeolocation";
// import { cn } from "../lib/utils";

// export default function GeoLocationTestPage() {
//   const geoString =
//     typeof window !== "undefined" ? localStorage.getItem("geoLocation") : null;
//   const geo: GeoLocation = geoString
//     ? JSON.parse(geoString)
//     : {
//         lat: 0,
//         lng: 0,
//         city: null,
//         country: null,
//         countryCode: null,
//         language: null,
//       };

//   return (
//     <div className={cn("container glass", "", "")}>
//       <p>
//         Coordinates: {geo.lat}, {geo.lng}
//       </p>
//       <p>City: {geo.city}</p>
//       <p>Country: {geo.country}</p>
//       <p>Country code: {geo.countryCode}</p>
//       <p>Browser language: {geo.language}</p>
//     </div>
//   );
// }
