'use client';

export default function Dunes() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
      <svg
        viewBox="0 0 1440 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* Back layer - dark with organic shapes */}
        <path
          d="M-100 300V220C0 200 80 180 180 190C280 200 350 170 480 180C610 190 720 160 850 170C980 180 1100 150 1200 165C1300 180 1400 200 1540 190V300H-100Z"
          fill="#0a0a15"
        />

        {/* Dark pools/shadows - organic shapes */}
        <ellipse cx="80" cy="260" rx="100" ry="45" fill="#050508" />
        <ellipse cx="450" cy="270" rx="80" ry="35" fill="#050508" />
        <ellipse cx="900" cy="255" rx="110" ry="50" fill="#050508" />
        <ellipse cx="1300" cy="265" rx="90" ry="40" fill="#050508" />

        {/* Middle cream dune - flowing curves */}
        <path
          d="M-100 300V250C50 235 150 245 300 238C450 231 550 250 700 242C850 234 950 255 1100 245C1250 235 1350 250 1540 240V300H-100Z"
          fill="#f5f3e8"
        />

        {/* Light flowing lines on cream */}
        <path
          d="M-50 275C100 268 200 280 400 272C600 264 750 278 950 270C1150 262 1300 275 1490 268"
          stroke="#faf8f0"
          strokeWidth="25"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        {/* Front cream layer */}
        <path
          d="M-100 300V270C100 262 250 275 450 268C650 261 800 278 1000 270C1200 262 1350 272 1540 265V300H-100Z"
          fill="#fdfbf5"
        />

        {/* Dark accent pools in front */}
        <ellipse cx="150" cy="288" rx="60" ry="18" fill="#0a0a15" />
        <ellipse cx="550" cy="292" rx="50" ry="14" fill="#0a0a15" />
        <ellipse cx="1000" cy="286" rx="70" ry="20" fill="#0a0a15" />
        <ellipse cx="1350" cy="290" rx="55" ry="16" fill="#0a0a15" />

        {/* Subtle highlight lines */}
        <path
          d="M0 282C150 278 300 285 500 280C700 275 900 283 1100 279C1300 275 1440 281 1440 281"
          stroke="#eae8dd"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
