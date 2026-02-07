'use client';

const cloudPuffs = [
  { left: '8%', bottom: '24%', width: 100, height: 50, opacity: 0.85, duration: 8.6, delay: -1.8 },
  { left: '24%', bottom: '35%', width: 122, height: 58, opacity: 0.92, duration: 7.2, delay: -2.1 },
  { left: '41%', bottom: '22%', width: 116, height: 54, opacity: 0.88, duration: 9.1, delay: -0.6 },
  { left: '56%', bottom: '34%', width: 126, height: 60, opacity: 0.95, duration: 7.8, delay: -3.4 },
  { left: '72%', bottom: '23%', width: 104, height: 50, opacity: 0.82, duration: 8.9, delay: -1.1 },
  { left: '31%', bottom: '15%', width: 138, height: 62, opacity: 0.8, duration: 10.2, delay: -2.7 },
  { left: '61%', bottom: '14%', width: 146, height: 66, opacity: 0.78, duration: 9.7, delay: -0.9 },
];

export default function JunoClouds() {
  return (
    <div className="absolute -bottom-10 left-1/2 z-10 h-[150px] w-[360px] -translate-x-1/2 pointer-events-none">
      <div className="juno-cloud-glow absolute bottom-0 left-1/2 h-14 w-60 -translate-x-1/2 rounded-full bg-[#9cc1ff]/40 blur-2xl" />

      {cloudPuffs.map((cloud, index) => (
        <span
          key={index}
          className="juno-cloud-puff absolute rounded-full bg-gradient-to-b from-white/90 via-[#dce9ff]/80 to-[#a7bfff]/70 shadow-[0_14px_35px_rgba(140,176,255,0.28)]"
          style={{
            left: cloud.left,
            bottom: cloud.bottom,
            width: cloud.width,
            height: cloud.height,
            opacity: cloud.opacity,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
