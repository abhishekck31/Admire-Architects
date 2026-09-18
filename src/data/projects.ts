export const CATEGORIES = ["Latest Projects", "Design & PMC", "Turnkey Projects"];

const RAW_DESIGN_PMC = [
  "DELL, Hyderabad (40,000 SFT)",
  "TARGET Services India, Bangalore (1,50,000 SFT)",
  "CISCO SYSTEMS, Cafeteria, Bannerghatta Road, Bangalore (13,000 SFT)",
  "CORPORATE OFFICE FOR M/S.SCDC, Bangalore (60,000 SFT)",
  "INTEGRATED TOWNSHIP, Mysore (70 Acres)",
  "Integrated Township, Mysore (200 Acres) – With KHB",
  "First source, Millers Road, Bangalore (20,000 SFT)",
  "CGI Information Systems, Electronic City, Bangalore (1,000,000 SFT)",
  "DELL, Domlur (1,10,000 SFT)",
  "Dell, LAB (6000 SFT)",
  "Dell – CV Raman Nagar (55,000 SFT)",
  "IBM India Research Laboratory (4500 SFT)",
  "IBM, Client Briefing Centre, EGL, Bangalore – 7,500 SFT",
  "IBM Sterling Commerce (70,000 SFT)",
  "eMIDS Bangalore (55,000 SFT)",
  "Aruba Networks Bangalore (36,000 SFT)",
  "Synchronoss Technologies Bangalore (40,000 SFT)",
  "Collabera (33,000 SFT)",
  "Symphony Teleca Bangalore (3,00,000 SFT)",
  "Dell DLF Chennai (50,000 SFT)",
  "Dell Ambit Tech Park (50,000 SFT)",
  "IBM D1&D4 Retro Fit Works (25,000 SFT)",
  "IBM Food Court & LAB (20,000 SFT)",
  "Quickplay Chennai (10,000 SFT)"
];

const RAW_TURNKEY = [
  "IBM Collaboration Centre, Bangalore",
  "Genpact India, Pritech Park, Bangalore (50,000 SFT)",
  "Firstsource, Pritech Park, Bangalore (25,000 SFT)",
  "Genpact, DLF Hyderabad (50,000 SFT)",
  "Genpact, Pocharam Hyderabad (30,000 SFT)",
  "InMobi Bangalore (75,000 SFT)",
  "Retro-fit Projects (Project Value Rs.7.5 Crore to 10 Crore)",
  "Quickplay Chennai (10,000 SFT)",
  "Airtel Data Centre Mysore (1000 SFT)",
  "IBM Prince Info City Chennai (30,000 SFT)",
  "UBQ Technologies Bangalore (11,000 SFT)",
  "Thought Focus Bangalore (25,000 SFT)",
  "Concentrix Pune (6500 SFT)",
  "Concentrix Bangalore (7000 SFT)",
  "IBM Food Court Bangalore (15,000 SFT)",
  "Truven Health Analytics Hyderabad (32,000 SFT)",
  "Truven Health Analytics Hyderabad (16,000 SFT)",
  "Concentrix Hyderabad (8000 SFT)",
  "Firstsource Chennai (25,000 SFT)",
  "Cognizant Bangalore (50,000 SFT)",
  "Cognizant Chennai (12,000 SFT)",
  "Schneider Electric Hyderabad (25,000 SFT)",
  "Schneider, Attibele Bangalore (45,000 SFT)",
  "Schneider, Marathahalli Bangalore (50,000 SFT)",
  "IBM Automation Lab (5000 SFT)"
];

const RAW_LATEST = [
  // Curated order requested for the Latest Projects list.
  "Celonis @ Table Space Tower, Bangalore",
  "Global Infocity Park, Perungudi, Chennai",
  "Green Space Factory @ Nelamangala, Bangalore",
  "Green Space Office @ Yeshwanthpur, Bangalore",
  "HealthMinds @ Yeshwanthpur, Bangalore",
  "Venkatesh Office, Bangalore",
  "Genpact Madurai",
  "Genpact, SEZ Bellandur, Bangalore",
  "Prestige Golfshire Villa, Nandi Hills, Bangalore",
  "Resillion, SJR Primeco, Arekere, Bangalore",
  "Everest, Manyata Tech Park, Bangalore",
  "Blueprint Technologies, Manyata Tech Park, Bangalore",
  "ZS, Perungudi, Chennai",
  "Brillio, Perungudi, Chennai",
  "Black Hawk, Domlur, Bangalore",
  "Google Millennium, 1 Shobha, Bangalore",
  "Pega System, Bangalore",
  "Truven Health Analytics, Hyderabad",
  "IBM Automation Lab, Bangalore",
  "Dell DLF, Chennai (50,000 SFT)",
  "Schneider Electric, PTP, Bangalore",
  // Remaining previously-listed projects, kept after the curated order above.
  "ZS Technologies, Manyata Tech Park, Bangalore",
  "Rocketlane, Perungudi, Chennai",
  "SJR Union City, Whitefield, Bangalore",
  "Genpact, Surya Park, Electronic City, Bangalore",
  "Daimler Truck, Whitefield, Bangalore",
  "Mercedes Benz, Whitefield, Bangalore",
  "Nexer, Manyata Tech Park, Bangalore",
  "ParentPay, Manyata Tech Park, Bangalore",
  "Zitro India, Whitefield, Bangalore",
  "Elastic Technologies, Domlur, Bangalore",
  "Maximus, SJR Primeco, Arekere, Bangalore",
  "Faiser, Perungudi, Chennai",
  "PWC, Elnath Building, PTP, Bangalore",
  "Table Space Office, Bangalore"
];

/**
 * Client-supplied project photography, read straight out of
 * `public/Admire Website - Project Images/<folder>/Edited/`.
 *
 * `folder` and `files` are copied verbatim from that directory — the client's
 * own numbering is the display order, so nothing here is re-sorted or curated.
 * `match` is tested against the *parsed* title and location (both lower-cased),
 * i.e. after parseProject has stripped the area and pulled the trailing place
 * name out into `location`.
 */
const IMAGE_ROOT = "/Admire Website - Project Images";

interface ProjectImageSet {
  folder: string;
  match: (title: string, location: string) => boolean;
  files: string[];
}

const PROJECT_IMAGE_SETS: ProjectImageSet[] = [
  {
    folder: "01. Celonis - BLR",
    match: (t) => t.includes("celonis"),
    files: [
      "01. Reception.jpeg",
      "02. Training Room.jpeg",
      "03. Training Room.jpeg",
      "04. Open Office.jpeg",
      "05. Cabin.jpeg",
      "06. Collab Area.jpeg",
      "07. Cafeteria.jpeg",
      "08. Cafeteria.jpeg",
      "09. Cafeteria.jpeg",
      "10. Step Seating.jpeg",
    ],
  },
  {
    folder: "02. GIP Chennai",
    match: (t, loc) => t.includes("global infocity") && loc.includes("chennai"),
    files: [
      "01. Open Office.jpeg",
      "02. Open Office.jpeg",
      "03. Open Office.jpeg",
      "04. Open Office.jpeg",
      "05. Open Office.jpeg",
      "06. Open Office.jpeg",
      "07. Open Office.jpeg",
      "08. Cafeteria.jpeg",
      "09. Cafeteria.jpeg",
      "10. Cabin.jpeg",
      "11. 3 Pax Meeting Room.jpeg",
      "12. 4 Pax.jpeg",
      "13. 8 Pax.jpeg",
    ],
  },
  {
    folder: "03. Green Space Factory - BLR",
    match: (t) => t.includes("green space factory"),
    files: [
      "01. Reception.png",
      "02. Reception.png",
      "03. Workstation Area.png",
      "04. Workstation.png",
      "05. 8 Pax Meeting Room.png",
      "06. MD_s Cabin.png",
      "07. Manager Cabin.png",
      "08. Head Cabin.png",
      "09. Operation Head Cabin.png",
      "10. Operation Head Cabin.png",
    ],
  },
  {
    folder: "04. Green Space Office - BLR",
    match: (t) => t.includes("green space office"),
    files: [
      "01. Reception.png",
      "02. Reception.png",
      "03. Open Office.jpeg",
      "04. Open Office.jpeg",
      "05. Prayer Room.png",
      "06. Prayer Room.png",
      "07. 4 Pax.png",
      "08. Cabin.png",
      "09. Head Cabin.png",
      "10. pantry.png",
      "11. Pantry.png",
      "12. 6 Pax.jpg",
      "13. 6 Pax.jpg",
      "14. Phone Booth.png",
    ],
  },
  {
    folder: "05. Venkatesh Office - BLR",
    match: (t) => t.includes("venkatesh"),
    files: [
      "01. Reception.jpeg",
      "02. Reception.jpeg",
      "03. Reception.jpeg",
      "04. Reception.jpeg",
      "05. MD Cabin.jpeg",
      "06. MD Cabin.jpeg",
      "07. Board Room.jpeg",
      "08. Board Room.jpeg",
    ],
  },
  {
    folder: "06. Genpact Madurai",
    match: (t) => t.includes("genpact") && t.includes("madurai"),
    files: [
      "01. Reception.jpeg",
      "02. Open Office.jpeg",
      "03. Open Office.jpeg",
      "04. Open Office.jpeg",
      "05. Open Office.jpeg",
      "06. Board Room.jpeg",
      "07. Cafeteria.jpeg",
      "08. Cafeteria.jpeg",
      "09. Toilet.jpeg",
      "10. Toilet.jpeg",
    ],
  },
  {
    folder: "07. Health Minds - BLR",
    match: (t) => t.includes("healthmind") || t.includes("health mind"),
    files: [
      "01. Reception.jpg",
      "02. Open Office.png",
      "03. Open Office.png",
      "04. Open Office.jpg",
      "05. Open Office.jpg",
      "06. Ceo Cabin.jpg",
      "07. 10 Pax.jpg",
      "08. Pantry.png",
      "09. Pantry.png",
      "10. Cabin.png",
      "11. Locker.png",
      "12. Phone Booth.jpg",
    ],
  },
  {
    folder: "08. Prestige Golfshire - BLR",
    match: (t) => t.includes("prestige golfshire"),
    files: [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "05.jpg",
      "06.jpg",
      "07.jpg",
    ],
  },
  {
    folder: "09. Resillion - BLR",
    match: (t) => t.includes("resillion"),
    files: [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
    ],
  },
  {
    folder: "10. Genpact Surya Park - BLR",
    match: (t) => t.includes("genpact") && t.includes("surya"),
    files: [
      "01.png",
      "02.png",
      "03.png",
      "04.png",
      "05.png",
      "06.png",
      "07.png",
      "08.png",
      "09.png",
      "10.png",
      "11.png",
      "12.png",
      "13.png",
      "14.png",
      "15.png",
    ],
  },
  {
    folder: "11. Everest - BLR",
    match: (t) => t.includes("everest"),
    files: [
      "01.png",
      "02.jpeg",
      "03.png",
      "04.png",
      "05.jpeg",
      "06.jpeg",
      "07.png",
      "08.jpg",
      "09.jpeg",
      "10.png",
    ],
  },
  {
    folder: "12. Blue Print - BLR",
    match: (t) => t.includes("blueprint") || t.includes("blue print"),
    files: [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "05.jpg",
      "06.jpg",
      "07.jpg",
      "08.jpg",
      "09.jpg",
      "10.jpg",
    ],
  },
  {
    folder: "13. Black Hawk - BLR",
    match: (t) => t.includes("black hawk"),
    files: [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "05.jpg",
      "06.jpg",
      "07.jpg",
      "08.jpg",
      "09.jpg",
      "10.jpg",
      "11.jpg",
      "13.jpg",
      "14.jpg",
    ],
  },
  {
    folder: "14. Millenium - BLR",
    match: (t) => t.includes("millennium") || t.includes("millenium"),
    files: [
      "01.png",
      "02.png",
      "03.png",
      "04.png",
      "05.png",
      "06.png",
      "07.png",
      "08.png",
      "09.png",
      "10.png",
      "11.png",
      "12.png",
    ],
  },
  {
    folder: "15. Pega System",
    match: (t) => t.includes("pega"),
    files: [
      "001.jpeg",
      "002.jpeg",
      "003.jpeg",
      "004.jpeg",
      "005.jpeg",
      "006.jpeg",
      "007.jpeg",
      "008.jpeg",
      "009.jpeg",
      "010.jpeg",
    ],
  },
  {
    folder: "16. Rocketlane - Chennai",
    match: (t) => t.includes("rocketlane"),
    files: [
      "01.png",
      "02.png",
      "03.png",
      "04.png",
      "05.png",
      "06.png",
    ],
  },
  {
    folder: "17. Brillo Chennai",
    match: (t, loc) => (t.includes("brillio") || t.includes("brillo")) && loc.includes("chennai"),
    files: [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "05.jpg",
      "06.jpg",
      "07.jpg",
      "08.jpg",
    ],
  },
  {
    folder: "18. ZS Chennai",
    match: (t, loc) => t.includes("zs") && loc.includes("chennai"),
    files: [
      "01.jpg",
      "02.png",
      "03.jpg",
      "04.jpg",
      "05.jpg",
    ],
  },
  {
    folder: "19. Genpact SEZ - BLR",
    match: (t) => t.includes("genpact") && t.includes("sez"),
    files: [
      "01.jpeg",
      "02.jpeg",
      "03.jpeg",
      "04.jpeg",
      "05.jpeg",
      "06.jpeg",
    ],
  },
  {
    folder: "20. Truven Health Analytics-Hyderabad",
    match: (t, loc) => t.includes("truven") && loc.includes("hyderabad"),
    files: [
      "01.png",
      "02.png",
      "03.png",
      "04.png",
      "05.png",
      "06.png",
    ],
  },
  {
    folder: "21. IBM Automation Lab-BLR",
    match: (t) => t.includes("ibm automation lab"),
    files: [
      "01.png",
      "02.png",
      "03.png",
      "04.png",
      "05.png",
    ],
  },
  {
    folder: "22. Dell DLF Chennai",
    match: (t) => t.includes("dell") && t.includes("dlf"),
    files: [
      "01.png",
      "02.png",
      "03.png",
      "04.png",
      "05.png",
    ],
  },
];

/** Photographs for a parsed project, or [] when the client sent none. */
function imagesFor(title: string, location: string): string[] {
  const t = title.toLowerCase();
  const loc = location.toLowerCase();
  const set = PROJECT_IMAGE_SETS.find((entry) => entry.match(t, loc));
  if (!set) return [];
  return set.files.map((file) => `${IMAGE_ROOT}/${set.folder}/Edited/${file}`);
}

export interface Project {
  id: string;
  title: string;
  location: string;
  /** Floor area / project value, when the client has disclosed one. */
  area: string | null;
  category: string;
  image: string | null;
  allImages: string[];
  description: string;
}

function parseProject(str: string, category: string, index: number): Project {
  let title = str;
  let area: string | null = null;
  let location = "Multiple Locations";
  
  // Extract area if present in parentheses
  const areaMatch = str.match(/\(([^)]+)\)/);
  if (areaMatch) {
    area = areaMatch[1];
    title = title.replace(`(${area})`, '').trim();
  }
  
  // Extract location if present after comma
  const parts = title.split(',');
  if (parts.length > 1) {
    location = parts.pop()?.trim() || "";
    title = parts.join(',').trim();
  } else {
    // If no comma, check if Bangalore/Chennai/Hyderabad is in the title
    if (title.toLowerCase().includes("bangalore")) { location = "Bangalore"; title = title.replace(/bangalore/i, "").trim(); }
    else if (title.toLowerCase().includes("chennai")) { location = "Chennai"; title = title.replace(/chennai/i, "").trim(); }
    else if (title.toLowerCase().includes("hyderabad")) { location = "Hyderabad"; title = title.replace(/hyderabad/i, "").trim(); }
  }
  
  // Clean up stray hyphens or commas at the end
  title = title.replace(/[-,\s]+$/, '');
  
  if (location === "Multiple Locations" && title === "Retro-fit Projects") {
    area = "Rs.7.5 Crore to 10 Crore";
  }

  const projectImages = imagesFor(title, location);

  const mainImage = projectImages.length > 0 ? projectImages[0] : null;

  return {
    id: `${category.toLowerCase().replace(/[^a-z]/g, '')}-${index}`,
    title,
    location,
    area,
    category,
    image: mainImage,
    allImages: projectImages,
    description: `Enterprise-scale corporate architecture and interior project located in ${location}. Delivered by Admire Architects Pvt Ltd focusing on high-efficiency workspace design and structural precision.`
  }
}

export const PROJECTS_DATA: Project[] = [
  ...RAW_TURNKEY.map((p, i) => parseProject(p, "Turnkey Projects", i)),
  ...RAW_DESIGN_PMC.map((p, i) => parseProject(p, "Design & PMC", i)),
  ...RAW_LATEST.map((p, i) => parseProject(p, "Latest Projects", i)),
];
