'use client';

import { motion } from 'framer-motion';
import PhoneDevice from './PhoneDevice';

// Research screen content for the phone
function ResearchScreen() {
  return (
    <div className="flex flex-col h-full pt-[15%] pb-[5%] px-4">
      <div className="flex-1 space-y-3 overflow-hidden">
        {/* Time indicator */}
        <div className="text-center mb-2">
          <span className="text-gray-400 text-[10px]">7:32 AM</span>
        </div>

        {/* Juno message */}
        <div className="flex items-end gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex-shrink-0 flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-medium">J</span>
          </div>
          <div className="bg-white rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm max-w-[85%]">
            <p className="text-gray-800 text-[13px] leading-relaxed">
              Good morning! While you rested, I found some things that might help you today.
            </p>
          </div>
        </div>

        {/* Research cards */}
        <div className="ml-9 space-y-2">
          {/* Article card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100/50">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-blue-800 text-[12px] font-medium">New Research</p>
                <p className="text-gray-700 text-[11px] leading-snug mt-0.5 line-clamp-2">
                  Study: Cold therapy reduces inflammation markers in fibromyalgia patients
                </p>
              </div>
            </div>
          </div>

          {/* Weather alert */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-100/50">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-amber-800 text-[12px] font-medium">Weather Alert</p>
                <p className="text-gray-700 text-[11px] leading-snug mt-0.5">
                  Pressure drop expected tomorrow. Consider light pacing today.
                </p>
              </div>
            </div>
          </div>

          {/* Local event */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100/50">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-green-800 text-[12px] font-medium">Local Event</p>
                <p className="text-gray-700 text-[11px] leading-snug mt-0.5">
                  Chronic illness support group meeting this Saturday, 2pm
                </p>
                <button className="mt-2 text-green-700 text-[11px] font-medium flex items-center gap-1">
                  Add to calendar
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResearchSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#ECECEC] to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm font-medium text-orange-600 tracking-wide uppercase mb-3">
              Overnight Research
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
              Let Juno research for you while you rest
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Wake up to personalized insights. Juno works in the background to find relevant research,
              monitor weather patterns that affect your condition, and discover local support opportunities.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Latest research</h3>
                  <p className="text-gray-600 text-sm">
                    Curated studies and articles relevant to your specific condition
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Weather alerts</h3>
                  <p className="text-gray-600 text-sm">
                    Advance notice of pressure changes and conditions that affect you
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Local connections</h3>
                  <p className="text-gray-600 text-sm">
                    Support groups, events, and resources in your area
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="w-[280px] md:w-[320px] lg:w-[340px]">
              <PhoneDevice>
                <ResearchScreen />
              </PhoneDevice>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
