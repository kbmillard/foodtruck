export const SITE_NAME = "La Hamburguesa Loca";

export const HOME_TITLE =
  "La Hamburguesa Loca | Auténtico Sazón Mexicano | Kansas City";

export const HOME_DESCRIPTION =
  "La Hamburguesa Loca — Auténtico Sazón Mexicano. Hamburguesas, tacos, tortas, antojitos, and more. Restaurant on Southwest Blvd and food truck on Independence Ave. Open 5:00 PM – 11:00 PM. Order online for pickup.";

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "La Hamburguesa Loca",
  alternateName: "La Hamburguesa Loca Food Truck",
  telephone: "+1-816-589-8925",
  email: "lahamburguesaloca@yahoo.com",
  image: "/icons/la-hamburguesa-loca-logo-1024x1024.png",
  servesCuisine: "Mexican",
  priceRange: "$$",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "904 Southwest Blvd",
      addressLocality: "Kansas City",
      addressRegion: "MO",
      postalCode: "64108",
      addressCountry: "US",
    },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.075,
    longitude: -94.595,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "17:00",
      closes: "23:00",
    },
  ],
  sameAs: ["https://www.instagram.com/la_hamburguesaloca/"],
};
