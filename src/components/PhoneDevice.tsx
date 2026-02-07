'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence, MotionValue } from 'framer-motion';

interface PhoneDeviceProps {
  children?: ReactNode;
  activeScreenIndex?: number;
  screens?: ReactNode[];
  className?: string;
  style?: React.CSSProperties & { x?: MotionValue<string> };
}

export default function PhoneDevice({
  children,
  activeScreenIndex = 0,
  screens,
  className = '',
  style,
}: PhoneDeviceProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={style}
    >
      {/* iPhone 15 Pro frame */}
      <div className="relative w-full aspect-[9/19.5]">
        {/* Outer titanium frame */}
        <div className="absolute inset-0 rounded-[12%/5.5%] bg-gradient-to-b from-[#4A4A4F] via-[#3A3A3E] to-[#2A2A2E] p-[1px]">
          {/* Inner titanium edge */}
          <div className="absolute inset-[1px] rounded-[11.5%/5.3%] bg-gradient-to-b from-[#5A5A5F] via-[#4A4A4F] to-[#3A3A3E]" />

          {/* Black bezel */}
          <div className="absolute inset-[3px] rounded-[11%/5%] bg-[#1a1a1a] overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[28%] h-[3.5%] bg-black rounded-full z-20" />

            {/* Screen container - this is the masked area */}
            <div className="absolute inset-[1px] rounded-[10.5%/4.8%] overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-[#f0f0f5]">
              {/* Screen content */}
              {screens ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreenIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="w-full h-full"
                  >
                    {screens[activeScreenIndex]}
                  </motion.div>
                </AnimatePresence>
              ) : (
                children
              )}
            </div>
          </div>
        </div>

        {/* Side buttons */}
        {/* Power button (right) */}
        <div className="absolute -right-[1px] top-[22%] w-[1px] h-[8%] rounded-l-sm bg-[#4A4A4F]" />

        {/* Silent switch (left) */}
        <div className="absolute -left-[1px] top-[15%] w-[1px] h-[3%] rounded-r-sm bg-[#4A4A4F]" />

        {/* Volume buttons (left) */}
        <div className="absolute -left-[1px] top-[20%] w-[1px] h-[5%] rounded-r-sm bg-[#4A4A4F]" />
        <div className="absolute -left-[1px] top-[27%] w-[1px] h-[5%] rounded-r-sm bg-[#4A4A4F]" />

        {/* Subtle reflection overlay */}
        <div className="absolute inset-0 rounded-[12%/5.5%] bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Shadow */}
      <div
        className="absolute inset-x-[10%] bottom-0 h-[15%] -z-10 blur-2xl opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0%, transparent 70%)',
          transform: 'translateY(40%)',
        }}
      />
    </motion.div>
  );
}

// Responsive wrapper for the phone with proper sizing
export function ResponsivePhone({
  children,
  activeScreenIndex = 0,
  screens,
  className = '',
  style,
}: PhoneDeviceProps) {
  return (
    <div className={`w-[280px] md:w-[320px] lg:w-[360px] xl:w-[380px] ${className}`}>
      <PhoneDevice
        activeScreenIndex={activeScreenIndex}
        screens={screens}
        style={style}
      >
        {children}
      </PhoneDevice>
    </div>
  );
}
