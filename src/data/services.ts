/**
 * The five services the practice offers.
 *
 * One definition shared by the index (/services) and the detail pages
 * (/services/[slug]). The detail route builds its static params from this
 * list, so a slug that is not here 404s rather than rendering a page titled
 * after whatever was in the URL.
 */

export interface Service {
  /** URL slug. Frozen once published — changing one breaks existing links. */
  id: string;
  title: string;
  /** Display numeral on the index, e.g. "01". */
  number: string;
  /** One-line summary, used on the index card and as the page description. */
  description: string;
  /** Opening line under the heading on the detail page. */
  intro: string;
  /** Tailwind classes for the index card, which is colour-coded per service. */
  bg: string;
  numColor: string;
  titleColor: string;
  descColor: string;
  arrowBg: string;
}

export const SERVICES: Service[] = [
  {
    id: "architecture",
    title: "Architecture",
    number: "01",
    description:
      "Iconic structural design tailored for global corporate headquarters and monumental enterprise developments.",
    intro:
      "From the first massing study to the final construction drawing, we design buildings that carry an organisation's identity in their structure.",
    bg: "bg-[#179FB7] text-white hover:bg-[#138A9E] shadow-md hover:shadow-xl hover:shadow-[#179FB7]/30 border-transparent",
    numColor: "text-white/80 font-bold",
    titleColor: "text-white",
    descColor: "text-white/90",
    arrowBg: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#179FB7]",
  },
  {
    id: "interior-design",
    title: "Interior Design",
    number: "02",
    description:
      "Precision-crafted internal spaces that enhance enterprise productivity while exuding quiet, profound luxury.",
    intro:
      "Workplace interiors built around how teams actually work — circulation, acoustics, daylight and material warmth resolved together.",
    bg: "bg-[#008BB0] text-white hover:bg-[#007A9A] shadow-md hover:shadow-xl hover:shadow-[#008BB0]/30 border-transparent",
    numColor: "text-white/80 font-bold",
    titleColor: "text-white",
    descColor: "text-white/90",
    arrowBg: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#008BB0]",
  },
  {
    id: "project-management",
    title: "Project Management",
    number: "03",
    description:
      "Rigorous oversight and risk mitigation, ensuring multi-million dollar developments are executed flawlessly.",
    intro:
      "A single accountable team holding programme, cost and quality together across every consultant and contractor on the job.",
    bg: "bg-[#E09D00] text-white hover:bg-[#C98C00] shadow-md hover:shadow-xl hover:shadow-[#E09D00]/30 border-transparent",
    numColor: "text-white/85 font-bold",
    titleColor: "text-white",
    descColor: "text-white/90",
    arrowBg: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#E09D00]",
  },
  {
    id: "design-build",
    title: "Design Build",
    number: "04",
    description:
      "A unified workflow bridging the gap between visionary concept and physical construction under one entity.",
    intro:
      "Design and construction under one contract, so the drawings and the site never drift apart and nobody is caught between two firms.",
    bg: "bg-[#95B00F] text-white hover:bg-[#839B0D] shadow-md hover:shadow-xl hover:shadow-[#95B00F]/30 border-transparent",
    numColor: "text-white/85 font-bold",
    titleColor: "text-white",
    descColor: "text-white/90",
    arrowBg: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#95B00F]",
  },
  {
    id: "turnkey-solutions",
    title: "Turnkey Solutions",
    number: "05",
    description:
      "End-to-end delivery of enterprise spaces. From empty land to the final piece of curated furniture.",
    intro:
      "We hand over a finished, occupiable space — shell, services, fit-out, furniture and snagging closed out as one delivery.",
    bg: "bg-[#F36900] text-white hover:bg-[#D95D00] shadow-md hover:shadow-xl hover:shadow-[#F36900]/30 border-transparent",
    numColor: "text-white/80 font-bold",
    titleColor: "text-white",
    descColor: "text-white/90",
    arrowBg: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#F36900]",
  },
];

export function getServiceBySlug(slug: string): Service | null {
  return SERVICES.find((service) => service.id === slug) ?? null;
}
