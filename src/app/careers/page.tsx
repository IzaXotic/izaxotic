import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers — IzaXotic | Join Our Studio",
  description:
    "Join IzaXotic — a remote-first custom web development studio. Apply for open roles and become part of a team that builds extraordinary digital products.",
  alternates: { canonical: "https://izaxotic-prototype.netlify.app/careers" },
};

export default function CareersPage() {
  return <CareersClient />;
}
