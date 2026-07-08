import limassol from "@/assets/prop-limassol.jpg";
import paphos from "@/assets/prop-paphos.jpg";
import larnaca from "@/assets/prop-larnaca.jpg";
import nicosia from "@/assets/prop-nicosia.jpg";
import ayianapa from "@/assets/prop-ayianapa.jpg";

export type Property = {
  id: string;
  title: string;
  city: "Limassol" | "Paphos" | "Larnaca" | "Nicosia" | "Ayia Napa";
  type: "Villa" | "Apartment" | "Townhouse";
  fullPrice: number;
  minSharePct: number;
  availableSharePct: number;
  monthlyCosts: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  image: string;
  description: string;
  expectedUse: "Personal use" | "Rental income" | "Mixed";
};

export const properties: Property[] = [
  {
    id: "lim-01",
    title: "Seafront Infinity Villa",
    city: "Limassol",
    type: "Villa",
    fullPrice: 2_400_000,
    minSharePct: 10,
    availableSharePct: 60,
    monthlyCosts: 1850,
    bedrooms: 5,
    bathrooms: 5,
    sizeSqm: 420,
    image: limassol,
    description:
      "A contemporary five-bedroom villa overlooking the Mediterranean, with a private infinity pool, olive garden and direct beach access.",
    expectedUse: "Mixed",
  },
  {
    id: "paf-01",
    title: "Bougainvillea Stone House",
    city: "Paphos",
    type: "Villa",
    fullPrice: 1_150_000,
    minSharePct: 15,
    availableSharePct: 45,
    monthlyCosts: 940,
    bedrooms: 4,
    bathrooms: 3,
    sizeSqm: 260,
    image: paphos,
    description:
      "Traditional stone villa on a quiet cliff above the sea, with terraced gardens, a shaded pergola and panoramic sunset views.",
    expectedUse: "Personal use",
  },
  {
    id: "lar-01",
    title: "Marina View Residences",
    city: "Larnaca",
    type: "Apartment",
    fullPrice: 620_000,
    minSharePct: 5,
    availableSharePct: 80,
    monthlyCosts: 380,
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 145,
    image: larnaca,
    description:
      "Three-bedroom penthouse overlooking Larnaca Marina, minutes from the international airport, ideal for short-term rental yield.",
    expectedUse: "Rental income",
  },
  {
    id: "nic-01",
    title: "Old Town Courtyard House",
    city: "Nicosia",
    type: "Townhouse",
    fullPrice: 780_000,
    minSharePct: 10,
    availableSharePct: 50,
    monthlyCosts: 520,
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 210,
    image: nicosia,
    description:
      "Fully restored sandstone townhouse in the old city, arranged around a private courtyard with citrus trees and a plunge pool.",
    expectedUse: "Personal use",
  },
  {
    id: "ayn-01",
    title: "Turquoise Bay Villa",
    city: "Ayia Napa",
    type: "Villa",
    fullPrice: 1_950_000,
    minSharePct: 10,
    availableSharePct: 70,
    monthlyCosts: 1420,
    bedrooms: 4,
    bathrooms: 4,
    sizeSqm: 310,
    image: ayianapa,
    description:
      "White-on-white beachfront villa with heated infinity pool, sunken lounge and direct steps to the turquoise bay.",
    expectedUse: "Rental income",
  },
  {
    id: "lim-02",
    title: "Old Port Loft",
    city: "Limassol",
    type: "Apartment",
    fullPrice: 495_000,
    minSharePct: 5,
    availableSharePct: 55,
    monthlyCosts: 310,
    bedrooms: 2,
    bathrooms: 2,
    sizeSqm: 118,
    image: limassol,
    description:
      "Design-led loft in Limassol's old port district, walking distance to marina restaurants and the seafront promenade.",
    expectedUse: "Mixed",
  },
];

export const cities = ["Limassol", "Paphos", "Larnaca", "Nicosia", "Ayia Napa"] as const;
export const propertyTypes = ["Villa", "Apartment", "Townhouse"] as const;
export const uses = ["Personal use", "Rental income", "Mixed"] as const;

export const formatEUR = (n: number) =>
  new Intl.NumberFormat("en-CY", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
