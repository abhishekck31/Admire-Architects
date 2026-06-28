export const CATEGORIES = ["Turnkey Projects", "Design & PMC", "Latest Projects"];

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
  "SJR Union City, Whitefield, Bangalore",
  "Black Hawk, Domlur, Bangalore",
  "Genpact, Surya Park, Electronic City, Bangalore",
  "Genpact, SEZ Bellandur, Bangalore",
  "Blueprint Technologies, Manyata Tech Park, Bangalore",
  "Everest, Manyata Tech Park, Bangalore",
  "ZS Technologies, Manyata Tech Park, Bangalore",
  "Daimler Truck, Whitefield, Bangalore",
  "Mercedes Benz, Whitefield, Bangalore",
  "Nexer, Manyata Tech Park, Bangalore",
  "ParentPay, Manyata Tech Park, Bangalore",
  "Zitro India, Whitefield, Bangalore",
  "Prestige Golfshire Villa, Nandi Hills, Bangalore",
  "Google Millennium, 1 Shobha, Bangalore",
  "Elastic Technologies, Domlur, Bangalore",
  "Maximus, SJR Primeco, Arekere, Bangalore",
  "Resillion, SJR Primeco, Arekere, Bangalore",
  "Rocketlane, Perungudi, Chennai",
  "Brillio, Perungudi, Chennai",
  "Faiser, Perungudi, Chennai",
  "ZS, Perungudi, Chennai",
  "GIP, Common Area, Perungudi, Chennai",
  "HealthMinds @ Yeshwanthpur, Bangalore",
  "GIP 13th Floor, Chennai",
  "Celonis @ Table Space Tower, Bangalore",
  "PWC, Elnath Building, PTP, Bangalore",
  "Table Space Office, Bangalore",
  "Green Space Office @ Yeshwanthpur, Bangalore",
  "Green Space Factory @ Nelamangala, Bangalore",
  "Genpact Madurai",
  "Pega System",
  "Venkatesh Office, Bangalore"
];

export interface Project {
  id: string;
  title: string;
  location: string;
  area: string;
  category: string;
  image: string | null;
  allImages: string[];
  description: string;
}

function parseProject(str: string, category: string, index: number): Project {
  let title = str;
  let area = "Undisclosed";
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

  // Map to project images
  let projectImages: string[] = [];
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("dell") && lowerTitle.includes("dlf") && location.toLowerCase().includes("chennai")) {
     projectImages = [
       "/Projects/Dell DLF Chennai-20260628T015144Z-3-001/Dell DLF Chennai/Picture10.png",
       "/Projects/Dell DLF Chennai-20260628T015144Z-3-001/Dell DLF Chennai/Picture12.png",
       "/Projects/Dell DLF Chennai-20260628T015144Z-3-001/Dell DLF Chennai/Picture13.png",
       "/Projects/Dell DLF Chennai-20260628T015144Z-3-001/Dell DLF Chennai/Picture14.png",
       "/Projects/Dell DLF Chennai-20260628T015144Z-3-001/Dell DLF Chennai/Picture15.png"
     ];
  } else if (lowerTitle.includes("ibm automation lab")) {
     projectImages = [
       "/Projects/IBM Automation Lab-BLR-20260628T015204Z-3-001/IBM Automation Lab-BLR/Picture1.png",
       "/Projects/IBM Automation Lab-BLR-20260628T015204Z-3-001/IBM Automation Lab-BLR/Picture2.png",
       "/Projects/IBM Automation Lab-BLR-20260628T015204Z-3-001/IBM Automation Lab-BLR/Picture3.png"
     ];
  } else if (lowerTitle.includes("black hawk")) {
     projectImages = [
       "/Projects/Black Hawk - BLR-20260628T015121Z-3-001/Black Hawk - BLR/Picture19.jpg",
       "/Projects/Black Hawk - BLR-20260628T015121Z-3-001/Black Hawk - BLR/Picture20.jpg",
       "/Projects/Black Hawk - BLR-20260628T015121Z-3-001/Black Hawk - BLR/Picture21.jpg"
     ];
  } else if (lowerTitle.includes("blueprint") || lowerTitle.includes("blue print")) {
     projectImages = [
       "/Projects/BLue Print - BLR-20260628T015136Z-3-001/BLue Print - BLR/Picture144.jpg",
       "/Projects/BLue Print - BLR-20260628T015136Z-3-001/BLue Print - BLR/Picture145.jpg",
       "/Projects/BLue Print - BLR-20260628T015136Z-3-001/BLue Print - BLR/Picture146.jpg"
     ];
  } else if (lowerTitle.includes("brillio") && location.toLowerCase().includes("chennai")) {
     projectImages = [
       "/Projects/Brillo Chennai-20260628T015139Z-3-001/Brillo Chennai/Picture87.jpg",
       "/Projects/Brillo Chennai-20260628T015139Z-3-001/Brillo Chennai/Picture88.jpg",
       "/Projects/Brillo Chennai-20260628T015139Z-3-001/Brillo Chennai/Picture89.jpg"
     ];
  } else if (lowerTitle.includes("celonis")) {
     projectImages = [
       "/Projects/Celonis - BLR-20260628T015143Z-3-001/Celonis - BLR/Picture131.jpg",
       "/Projects/Celonis - BLR-20260628T015143Z-3-001/Celonis - BLR/Picture132.jpg",
       "/Projects/Celonis - BLR-20260628T015143Z-3-001/Celonis - BLR/Picture133.jpg"
     ];
  } else if (lowerTitle.includes("everest")) {
     projectImages = [
       "/Projects/Everest - BLR-20260628T015147Z-3-001/Everest - BLR/Picture65.jpg",
       "/Projects/Everest - BLR-20260628T015147Z-3-001/Everest - BLR/Picture66.jpg",
       "/Projects/Everest - BLR-20260628T015147Z-3-001/Everest - BLR/Picture67.jpg"
     ];
  } else if (lowerTitle.includes("gip") && location.toLowerCase().includes("chennai")) {
     projectImages = [
       "/Projects/GIP Chennai-20260628T015158Z-3-001/GIP Chennai/Picture192.jpg",
       "/Projects/GIP Chennai-20260628T015158Z-3-001/GIP Chennai/Picture193.jpg",
       "/Projects/GIP Chennai-20260628T015158Z-3-001/GIP Chennai/Picture194.jpg"
     ];
  } else if (lowerTitle.includes("genpact") && lowerTitle.includes("sez")) {
     projectImages = [
       "/Projects/Genpact SEZ - BLR-20260628T015155Z-3-001/Genpact SEZ - BLR/001.jpeg",
       "/Projects/Genpact SEZ - BLR-20260628T015155Z-3-001/Genpact SEZ - BLR/002.jpeg",
       "/Projects/Genpact SEZ - BLR-20260628T015155Z-3-001/Genpact SEZ - BLR/003.jpeg"
     ];
  } else if (lowerTitle.includes("genpact") && lowerTitle.includes("surya")) {
     projectImages = [
       "/Projects/Genpact Surya Park - BLR-20260628T015156Z-3-001/Genpact Surya Park - BLR/Picture100.jpg",
       "/Projects/Genpact Surya Park - BLR-20260628T015156Z-3-001/Genpact Surya Park - BLR/Picture101.jpg",
       "/Projects/Genpact Surya Park - BLR-20260628T015156Z-3-001/Genpact Surya Park - BLR/Picture102.jpg"
     ];
  } else if (lowerTitle.includes("genpact") && lowerTitle.includes("madurai")) {
     projectImages = [
       "/Projects/Genpact Madurai-20260628T015154Z-3-001/Genpact Madurai/WhatsApp Image 2025-07-29 at 10.52.30 (1).jpeg",
       "/Projects/Genpact Madurai-20260628T015154Z-3-001/Genpact Madurai/WhatsApp Image 2025-07-29 at 10.52.31.jpeg",
       "/Projects/Genpact Madurai-20260628T015154Z-3-001/Genpact Madurai/WhatsApp Image 2025-07-29 at 10.52.32 (1).jpeg"
     ];
  } else if (lowerTitle.includes("green space factory")) {
     projectImages = [
       "/Projects/Green Space Factory - BLR-20260628T015201Z-3-001/Green Space Factory - BLR/Picture165.png",
       "/Projects/Green Space Factory - BLR-20260628T015201Z-3-001/Green Space Factory - BLR/Picture166.png",
       "/Projects/Green Space Factory - BLR-20260628T015201Z-3-001/Green Space Factory - BLR/Picture167.png"
     ];
  } else if (lowerTitle.includes("green space office")) {
     projectImages = [
       "/Projects/Green Space Office - BLR-20260628T015202Z-3-001/Green Space Office - BLR/Picture152.png",
       "/Projects/Green Space Office - BLR-20260628T015202Z-3-001/Green Space Office - BLR/Picture153.png",
       "/Projects/Green Space Office - BLR-20260628T015202Z-3-001/Green Space Office - BLR/Picture154.png"
     ];
  } else if (lowerTitle.includes("healthminds")) {
     projectImages = [
       "/Projects/Health Minds - BLR-20260628T015203Z-3-001/Health Minds - BLR/Picture118.jpg",
       "/Projects/Health Minds - BLR-20260628T015203Z-3-001/Health Minds - BLR/Picture120.jpg",
       "/Projects/Health Minds - BLR-20260628T015203Z-3-001/Health Minds - BLR/Picture121.png"
     ];
  } else if (lowerTitle.includes("pega")) {
     projectImages = [
       "/Projects/Pega System-20260628T015208Z-3-001/Pega System/001.jpeg",
       "/Projects/Pega System-20260628T015208Z-3-001/Pega System/002.jpeg",
       "/Projects/Pega System-20260628T015208Z-3-001/Pega System/003.jpeg"
     ];
  } else if (lowerTitle.includes("prestige") && lowerTitle.includes("golfshire")) {
     projectImages = [
       "/Projects/Prestige Golfshire - BLR-20260628T015209Z-3-001/Prestige Golfshire - BLR/Picture111.jpg",
       "/Projects/Prestige Golfshire - BLR-20260628T015209Z-3-001/Prestige Golfshire - BLR/Picture112.jpg",
       "/Projects/Prestige Golfshire - BLR-20260628T015209Z-3-001/Prestige Golfshire - BLR/Picture113.jpg"
     ];
  } else if (lowerTitle.includes("resillion")) {
     projectImages = [
       "/Projects/Resillion - BLR-20260628T015212Z-3-001/Resillion - BLR/Picture188.jpg",
       "/Projects/Resillion - BLR-20260628T015212Z-3-001/Resillion - BLR/Picture189.jpg",
       "/Projects/Resillion - BLR-20260628T015212Z-3-001/Resillion - BLR/Picture190.jpg"
     ];
  } else if (lowerTitle.includes("schneider")) {
     projectImages = [
       "/Projects/Schneider - BLR-20260628T015216Z-3-001/Schneider - BLR/Picture6.jpg",
       "/Projects/Schneider - BLR-20260628T015216Z-3-001/Schneider - BLR/Picture7.jpg",
       "/Projects/Schneider - BLR-20260628T015216Z-3-001/Schneider - BLR/Picture8.jpg",
       "/Projects/Schneider - BLR-20260628T015216Z-3-001/Schneider - BLR/Picture9.jpg"
     ];
  } else if (lowerTitle.includes("truven health analytics") && location.toLowerCase().includes("hyderabad")) {
     projectImages = [
       "/Projects/Truven Health Analytics-Hyderabad-20260628T015217Z-3-001/Truven Health Analytics-Hyderabad/Picture1.png",
       "/Projects/Truven Health Analytics-Hyderabad-20260628T015217Z-3-001/Truven Health Analytics-Hyderabad/Picture2.png",
       "/Projects/Truven Health Analytics-Hyderabad-20260628T015217Z-3-001/Truven Health Analytics-Hyderabad/Picture3.png"
     ];
  } else if (lowerTitle.includes("venkatesh")) {
     projectImages = [
       "/Projects/Venkatesh Office - BLR-20260628T015218Z-3-001/Venkatesh Office - BLR/WhatsApp Image 2026-06-26 at 16.48.21 (1).jpeg",
       "/Projects/Venkatesh Office - BLR-20260628T015218Z-3-001/Venkatesh Office - BLR/WhatsApp Image 2026-06-26 at 16.48.21 (2).jpeg",
       "/Projects/Venkatesh Office - BLR-20260628T015218Z-3-001/Venkatesh Office - BLR/WhatsApp Image 2026-06-26 at 16.48.21.jpeg"
     ];
  } else if (lowerTitle.includes("zs") && location.toLowerCase().includes("chennai")) {
     projectImages = [
       "/Projects/ZS Chennai-20260628T015219Z-3-001/ZS Chennai/Picture82.jpg",
       "/Projects/ZS Chennai-20260628T015219Z-3-001/ZS Chennai/Picture83.jpg",
       "/Projects/ZS Chennai-20260628T015219Z-3-001/ZS Chennai/Picture84.png"
     ];
  }

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
