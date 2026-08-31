import React from "react";

export type AvatarType = 
  | "md" 
  | "pm" 
  | "pe" 
  | "se" 
  | "qs" 
  | "pa" 
  | "sa" 
  | "df" 
  | "acc" 
  | "pro" 
  | "adm" 
  | "ast";

interface HumanAvatarProps {
  type: AvatarType;
  size?: number;
  className?: string;
}

export default function HumanAvatar({ type, size = 44, className = "" }: HumanAvatarProps) {
  switch (type) {
    // 1. Managing Director / Chief (Executive Leader with suit, tie, glasses)
    case "md":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#E0E7FF" />
          {/* Shoulders / Navy Suit */}
          <path d="M20 96 C20 74 34 68 50 68 C66 68 80 74 80 96 Z" fill="#1E293B" />
          {/* White Shirt Collar */}
          <path d="M42 68 L50 82 L58 68 L50 64 Z" fill="#FFFFFF" />
          {/* Blue Tie */}
          <path d="M47 72 L53 72 L52 92 L50 96 L48 92 Z" fill="#2563EB" />
          {/* Neck */}
          <path d="M44 54 H56 V68 H44 Z" fill="#D49E78" />
          {/* Head & Ears */}
          <circle cx="34" cy="46" r="5" fill="#D49E78" />
          <circle cx="66" cy="46" r="5" fill="#D49E78" />
          <ellipse cx="50" cy="46" rx="16" ry="19" fill="#E8B896" />
          {/* Glasses */}
          <rect x="38" y="42" width="10" height="7" rx="2" fill="none" stroke="#0F172A" strokeWidth="1.8" />
          <rect x="52" y="42" width="10" height="7" rx="2" fill="none" stroke="#0F172A" strokeWidth="1.8" />
          <line x1="48" y1="45" x2="52" y2="45" stroke="#0F172A" strokeWidth="1.8" />
          {/* Eyes */}
          <circle cx="43" cy="45.5" r="1.5" fill="#1E293B" />
          <circle cx="57" cy="45.5" r="1.5" fill="#1E293B" />
          {/* Smile */}
          <path d="M46 56 Q50 59 54 56" fill="none" stroke="#9A3412" strokeWidth="1.6" strokeLinecap="round" />
          {/* Hair */}
          <path d="M34 40 C34 26 44 22 50 22 C58 22 66 26 66 38 C64 36 60 32 50 32 C42 32 36 36 34 40 Z" fill="#334155" />
          <path d="M33 38 C32 44 33 46 34 47 C35 43 35 40 34 38 Z" fill="#334155" />
        </svg>
      );

    // 2. Project Manager (Teal Theme, Leader, Sharp Blazer)
    case "pm":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#CCFBF1" />
          {/* Teal Blazer */}
          <path d="M22 96 C22 75 35 70 50 70 C65 70 78 75 78 96 Z" fill="#115E59" />
          {/* Inner Shirt */}
          <path d="M43 70 L50 84 L57 70 Z" fill="#F0FDFA" />
          {/* Lanyard / Badge */}
          <path d="M47 78 L50 96 L53 78" fill="none" stroke="#0D9488" strokeWidth="1.5" />
          {/* Neck */}
          <path d="M44 56 H56 V70 H44 Z" fill="#E2A680" />
          {/* Ears */}
          <circle cx="34" cy="48" r="4.5" fill="#E2A680" />
          <circle cx="66" cy="48" r="4.5" fill="#E2A680" />
          {/* Face */}
          <ellipse cx="50" cy="48" rx="16" ry="18" fill="#F5C3A1" />
          {/* Eyes */}
          <circle cx="43" cy="47" r="2" fill="#134E4A" />
          <circle cx="57" cy="47" r="2" fill="#134E4A" />
          {/* Eyebrows */}
          <path d="M40 43 Q43 41 46 43" fill="none" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M54 43 Q57 41 60 43" fill="none" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />
          {/* Smile */}
          <path d="M45 57 Q50 61 55 57" fill="none" stroke="#9A3412" strokeWidth="1.6" strokeLinecap="round" />
          {/* Hair (Modern Side Part) */}
          <path d="M34 43 C33 28 44 24 54 24 C64 24 67 31 66 43 C64 36 57 32 50 32 C41 32 36 37 34 43 Z" fill="#451A03" />
        </svg>
      );

    // 3. Project Engineer (With Yellow Safety Helmet / Hard Hat)
    case "pe":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#FEF3C7" />
          {/* Navy Polo / Vest */}
          <path d="M22 96 C22 75 35 70 50 70 C65 70 78 75 78 96 Z" fill="#1E3A8A" />
          {/* Orange Collar */}
          <path d="M44 70 L50 82 L56 70 Z" fill="#EA580C" />
          {/* Neck */}
          <path d="M44 56 H56 V70 H44 Z" fill="#D99B73" />
          {/* Face */}
          <ellipse cx="50" cy="50" rx="16" ry="18" fill="#E8B088" />
          <circle cx="34" cy="50" r="4" fill="#D99B73" />
          <circle cx="66" cy="50" r="4" fill="#D99B73" />
          {/* Eyes */}
          <circle cx="43" cy="50" r="2" fill="#1E293B" />
          <circle cx="57" cy="50" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M46 59 Q50 62 54 59" fill="none" stroke="#7C2D12" strokeWidth="1.6" strokeLinecap="round" />
          {/* Yellow Hard Hat */}
          <ellipse cx="50" cy="38" rx="20" ry="14" fill="#F59E0B" />
          <path d="M28 40 C28 38 72 38 72 40 L70 42 H30 Z" fill="#D97706" />
          <rect x="47" y="24" width="6" height="12" rx="2" fill="#FBBF24" />
        </svg>
      );

    // 4. Site Engineer (With White Hard Hat + High-vis Vest)
    case "se":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#E0F2FE" />
          {/* High-vis Vest */}
          <path d="M22 96 C22 75 35 70 50 70 C65 70 78 75 78 96 Z" fill="#0284C7" />
          <path d="M30 76 L36 96 H44 L39 74 Z" fill="#EAB308" />
          <path d="M70 76 L64 96 H56 L61 74 Z" fill="#EAB308" />
          {/* Neck */}
          <path d="M44 56 H56 V70 H44 Z" fill="#D69770" />
          {/* Face */}
          <ellipse cx="50" cy="50" rx="16" ry="18" fill="#F0BE9B" />
          <circle cx="34" cy="50" r="4" fill="#D69770" />
          <circle cx="66" cy="50" r="4" fill="#D69770" />
          {/* Eyes */}
          <circle cx="43" cy="50" r="2" fill="#0F172A" />
          <circle cx="57" cy="50" r="2" fill="#0F172A" />
          {/* Smile */}
          <path d="M46 59 Q50 62 54 59" fill="none" stroke="#7C2D12" strokeWidth="1.6" strokeLinecap="round" />
          {/* White Hard Hat with Blue Badge */}
          <ellipse cx="50" cy="38" rx="20" ry="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <path d="M28 40 C28 38 72 38 72 40 L70 42 H30 Z" fill="#E2E8F0" />
          <rect x="46" y="27" width="8" height="7" rx="1.5" fill="#2563EB" />
        </svg>
      );

    // 5. Quantity Surveyor (Spectacles, Emerald Cardigan)
    case "qs":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#ECFDF5" />
          {/* Emerald Sweater */}
          <path d="M22 96 C22 75 35 70 50 70 C65 70 78 75 78 96 Z" fill="#065F46" />
          <path d="M44 70 L50 79 L56 70 Z" fill="#FFFFFF" />
          {/* Neck */}
          <path d="M44 56 H56 V70 H44 Z" fill="#DDA07A" />
          {/* Face */}
          <ellipse cx="50" cy="48" rx="16" ry="18" fill="#F4C7A7" />
          <circle cx="34" cy="48" r="4" fill="#DDA07A" />
          <circle cx="66" cy="48" r="4" fill="#DDA07A" />
          {/* Round Wireframe Glasses */}
          <circle cx="43" cy="47" r="5.5" fill="none" stroke="#047857" strokeWidth="1.5" />
          <circle cx="57" cy="47" r="5.5" fill="none" stroke="#047857" strokeWidth="1.5" />
          <line x1="48.5" y1="47" x2="51.5" y2="47" stroke="#047857" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="43" cy="47" r="1.5" fill="#064E3B" />
          <circle cx="57" cy="47" r="1.5" fill="#064E3B" />
          {/* Smile */}
          <path d="M46 57 Q50 60 54 57" fill="none" stroke="#9A3412" strokeWidth="1.6" strokeLinecap="round" />
          {/* Curly Hair */}
          <path d="M33 42 C32 30 40 24 50 24 C60 24 68 30 67 42 C64 35 58 31 50 31 C42 31 36 35 33 42 Z" fill="#1F2937" />
          <circle cx="37" cy="30" r="4" fill="#1F2937" />
          <circle cx="50" cy="27" r="4.5" fill="#1F2937" />
          <circle cx="63" cy="30" r="4" fill="#1F2937" />
        </svg>
      );

    // 6. Principal Architect (Round Black Glasses, Turtle Neck, Salt-Pepper Beard)
    case "pa":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#F3E8FF" />
          {/* Charcoal Turtleneck */}
          <path d="M22 96 C22 75 35 68 50 68 C65 68 78 75 78 96 Z" fill="#1E293B" />
          {/* Turtleneck collar */}
          <rect x="42" y="62" width="16" height="10" rx="3" fill="#334155" />
          {/* Face */}
          <ellipse cx="50" cy="46" rx="16" ry="18" fill="#EBB998" />
          <circle cx="34" cy="46" r="4" fill="#D99E7A" />
          <circle cx="66" cy="46" r="4" fill="#D99E7A" />
          {/* Architect Thick Round Glasses */}
          <circle cx="43" cy="44" r="6" fill="none" stroke="#0F172A" strokeWidth="2" />
          <circle cx="57" cy="44" r="6" fill="none" stroke="#0F172A" strokeWidth="2" />
          <line x1="49" y1="44" x2="51" y2="44" stroke="#0F172A" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="43" cy="44" r="1.8" fill="#0F172A" />
          <circle cx="57" cy="44" r="1.8" fill="#0F172A" />
          {/* Stylish Architect Beard */}
          <path d="M42 54 C42 62 58 62 58 54 C54 57 46 57 42 54 Z" fill="#475569" />
          {/* Hair */}
          <path d="M34 40 C34 26 44 22 50 22 C58 22 66 26 66 38 C63 33 58 30 50 30 C42 30 37 34 34 40 Z" fill="#475569" />
        </svg>
      );

    // 7. Senior Architects (Creative Linen Shirt, Bun/Bob Hair, Glasses)
    case "sa":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#EDE9FE" />
          {/* Indigo Linen Shirt */}
          <path d="M22 96 C22 75 35 70 50 70 C65 70 78 75 78 96 Z" fill="#4338CA" />
          <path d="M45 70 L50 82 L55 70 Z" fill="#C7D2FE" />
          {/* Drafting Pencil in pocket */}
          <line x1="33" y1="74" x2="35" y2="86" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          {/* Neck */}
          <path d="M44 56 H56 V70 H44 Z" fill="#E8B08B" />
          {/* Face */}
          <ellipse cx="50" cy="48" rx="16" ry="18" fill="#F8CBB0" />
          <circle cx="34" cy="48" r="4" fill="#E8B08B" />
          <circle cx="66" cy="48" r="4" fill="#E8B08B" />
          {/* Eyes */}
          <circle cx="43" cy="47" r="2" fill="#312E81" />
          <circle cx="57" cy="47" r="2" fill="#312E81" />
          {/* Smile */}
          <path d="M45 57 Q50 61 55 57" fill="none" stroke="#9A3412" strokeWidth="1.6" strokeLinecap="round" />
          {/* Modern Creative Bob Hair */}
          <path d="M33 48 C31 32 38 23 50 23 C62 23 69 32 67 48 C64 33 58 28 50 28 C42 28 36 33 33 48 Z" fill="#6B21A8" />
          <path d="M32 40 C32 50 34 54 36 56 C34 50 33 45 32 40 Z" fill="#6B21A8" />
          <path d="M68 40 C68 50 66 54 64 56 C66 50 67 45 68 40 Z" fill="#6B21A8" />
        </svg>
      );

    // 8. Draftsman (Tech Glasses, Dark Studio Hoodie)
    case "df":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#F1F5F9" />
          {/* Studio Charcoal Top */}
          <path d="M22 96 C22 75 35 70 50 70 C65 70 78 75 78 96 Z" fill="#334155" />
          {/* Cyan Stylus/Badge */}
          <circle cx="62" cy="80" r="3" fill="#06B6D4" />
          {/* Neck */}
          <path d="M44 56 H56 V70 H44 Z" fill="#D69B75" />
          {/* Face */}
          <ellipse cx="50" cy="48" rx="16" ry="18" fill="#EBBA98" />
          <circle cx="34" cy="48" r="4" fill="#D69B75" />
          <circle cx="66" cy="48" r="4" fill="#D69B75" />
          {/* Modern Rectangular Frames */}
          <rect x="38" y="44" width="10" height="6" rx="1.5" fill="none" stroke="#06B6D4" strokeWidth="1.6" />
          <rect x="52" y="44" width="10" height="6" rx="1.5" fill="none" stroke="#06B6D4" strokeWidth="1.6" />
          <line x1="48" y1="47" x2="52" y2="47" stroke="#06B6D4" strokeWidth="1.6" />
          {/* Eyes */}
          <circle cx="43" cy="47" r="1.5" fill="#0F172A" />
          <circle cx="57" cy="47" r="1.5" fill="#0F172A" />
          {/* Smile */}
          <path d="M46 58 Q50 61 54 58" fill="none" stroke="#7C2D12" strokeWidth="1.6" strokeLinecap="round" />
          {/* Textured Modern Crop Hair */}
          <path d="M34 42 C34 27 43 24 50 24 C57 24 66 27 66 42 C64 34 58 30 50 30 C42 30 36 34 34 42 Z" fill="#1E293B" />
        </svg>
      );

    // 9. Accounts (Finance Specialist with Burgundy Blazer)
    case "acc":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#FFE4E6" />
          {/* Burgundy Blazer */}
          <path d="M22 96 C22 75 35 70 50 70 C65 70 78 75 78 96 Z" fill="#9F1239" />
          <path d="M44 70 L50 84 L56 70 Z" fill="#FFF1F2" />
          {/* Gold Brooch */}
          <circle cx="36" cy="80" r="2.5" fill="#F59E0B" />
          {/* Neck */}
          <path d="M44 56 H56 V70 H44 Z" fill="#E5AA84" />
          {/* Face */}
          <ellipse cx="50" cy="48" rx="16" ry="18" fill="#F8CDB0" />
          <circle cx="34" cy="48" r="4" fill="#E5AA84" />
          <circle cx="66" cy="48" r="4" fill="#E5AA84" />
          {/* Glasses */}
          <rect x="38" y="44" width="10" height="6.5" rx="2" fill="none" stroke="#881337" strokeWidth="1.5" />
          <rect x="52" y="44" width="10" height="6.5" rx="2" fill="none" stroke="#881337" strokeWidth="1.5" />
          <line x1="48" y1="47" x2="52" y2="47" stroke="#881337" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="43" cy="47" r="1.5" fill="#4C0519" />
          <circle cx="57" cy="47" r="1.5" fill="#4C0519" />
          {/* Smile */}
          <path d="M45 57 Q50 61 55 57" fill="none" stroke="#9F1239" strokeWidth="1.6" strokeLinecap="round" />
          {/* Sleek Dark Hair Updo */}
          <path d="M33 46 C32 30 40 24 50 24 C60 24 68 30 67 46 C64 34 58 29 50 29 C42 29 36 34 33 46 Z" fill="#1C1917" />
          <circle cx="50" cy="22" r="6" fill="#1C1917" />
        </svg>
      );

    // 10. Procurement (Terracotta / Warm Coat & Checklist icon)
    case "pro":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#FFEDD5" />
          {/* Terracotta Coat */}
          <path d="M22 96 C22 75 35 70 50 70 C65 70 78 75 78 96 Z" fill="#C2410C" />
          <path d="M44 70 L50 82 L56 70 Z" fill="#FFF7ED" />
          {/* Neck */}
          <path d="M44 56 H56 V70 H44 Z" fill="#D99B72" />
          {/* Face */}
          <ellipse cx="50" cy="48" rx="16" ry="18" fill="#ECB895" />
          <circle cx="34" cy="48" r="4" fill="#D99B72" />
          <circle cx="66" cy="48" r="4" fill="#D99B72" />
          {/* Eyes */}
          <circle cx="43" cy="47" r="2" fill="#431407" />
          <circle cx="57" cy="47" r="2" fill="#431407" />
          {/* Smile */}
          <path d="M46 58 Q50 61 54 58" fill="none" stroke="#9A3412" strokeWidth="1.6" strokeLinecap="round" />
          {/* Short Tapered Hair */}
          <path d="M34 43 C33 28 42 25 50 25 C58 25 67 28 66 43 C64 35 58 31 50 31 C42 31 36 35 34 43 Z" fill="#292524" />
        </svg>
      );

    // 11. Admin (Operations Lead, Warm Plum/Amethyst Outfit)
    case "adm":
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#FAE8FF" />
          {/* Plum Corporate Top */}
          <path d="M22 96 C22 75 35 70 50 70 C65 70 78 75 78 96 Z" fill="#7E22CE" />
          <path d="M44 70 L50 80 L56 70 Z" fill="#FAF5FF" />
          {/* Neck */}
          <path d="M44 56 H56 V70 H44 Z" fill="#E2A580" />
          {/* Face */}
          <ellipse cx="50" cy="48" rx="16" ry="18" fill="#F6C7A8" />
          <circle cx="34" cy="48" r="4" fill="#E2A580" />
          <circle cx="66" cy="48" r="4" fill="#E2A580" />
          {/* Eyes */}
          <circle cx="43" cy="47" r="2" fill="#3B0764" />
          <circle cx="57" cy="47" r="2" fill="#3B0764" />
          {/* Smile */}
          <path d="M45 57 Q50 61 55 57" fill="none" stroke="#7E22CE" strokeWidth="1.6" strokeLinecap="round" />
          {/* Wavy Auburn Hair */}
          <path d="M32 46 C31 30 39 23 50 23 C61 23 69 30 68 46 C65 33 58 28 50 28 C42 28 35 33 32 46 Z" fill="#581C87" />
          <circle cx="33" cy="50" r="4" fill="#581C87" />
          <circle cx="67" cy="50" r="4" fill="#581C87" />
        </svg>
      );

    // 12. Admin Assistant (Support Specialist, Powder Blue)
    case "ast":
    default:
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`rounded-full shadow-inner ${className}`}>
          <circle cx="50" cy="50" r="50" fill="#E0F2FE" />
          {/* Sky Blue Collared Top */}
          <path d="M22 96 C22 75 35 70 50 70 C65 70 78 75 78 96 Z" fill="#0284C7" />
          <path d="M44 70 L50 82 L56 70 Z" fill="#F0F9FF" />
          {/* Neck */}
          <path d="M44 56 H56 V70 H44 Z" fill="#EAB48E" />
          {/* Face */}
          <ellipse cx="50" cy="48" rx="16" ry="18" fill="#FBD4B9" />
          <circle cx="34" cy="48" r="4" fill="#EAB48E" />
          <circle cx="66" cy="48" r="4" fill="#EAB48E" />
          {/* Eyes */}
          <circle cx="43" cy="47" r="2" fill="#0C4A6E" />
          <circle cx="57" cy="47" r="2" fill="#0C4A6E" />
          {/* Smile */}
          <path d="M45 57 Q50 61 55 57" fill="none" stroke="#0284C7" strokeWidth="1.6" strokeLinecap="round" />
          {/* Ponytail/Bun Hair */}
          <path d="M33 44 C32 29 41 24 50 24 C59 24 68 29 67 44 C64 34 58 30 50 30 C42 30 36 34 33 44 Z" fill="#78350F" />
          <circle cx="50" cy="21" r="5" fill="#78350F" />
        </svg>
      );
  }
}
