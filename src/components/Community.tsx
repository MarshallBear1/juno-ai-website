'use client';

import { motion } from 'framer-motion';

const communityFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Find your tribe",
    description: "Connect with others who truly understand what you're going through.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Share experiences",
    description: "Exchange tips, strategies, and stories in a supportive environment.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Give and receive support",
    description: "Be there for others on tough days—and let them be there for you.",
  },
];

export default function Community() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <p className="text-sm font-medium text-orange-600 tracking-wide uppercase mb-3">
              Community
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
              Connect to a community that gets it
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Living with chronic illness can feel isolating. Our community brings together thousands
              of people who understand exactly what you&apos;re going through—because they&apos;re living it too.
            </p>

            <div className="space-y-6">
              {communityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Join the community
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="relative">
              {/* Community illustration - abstract connected dots/people */}
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Background gradient circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-100 via-orange-50 to-transparent opacity-60" />

                {/* Floating avatars */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="absolute top-[15%] left-[20%] w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg flex items-center justify-center"
                >
                  <span className="text-white text-lg font-semibold">JK</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute top-[10%] right-[25%] w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg flex items-center justify-center"
                >
                  <span className="text-white font-semibold">SM</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute top-[35%] right-[10%] w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-lg flex items-center justify-center"
                >
                  <span className="text-white text-sm font-semibold">AL</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute bottom-[30%] right-[20%] w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 shadow-lg flex items-center justify-center"
                >
                  <span className="text-white font-semibold">MR</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute bottom-[20%] left-[15%] w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 shadow-lg flex items-center justify-center"
                >
                  <span className="text-white text-lg font-semibold">EL</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="absolute top-[45%] left-[5%] w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg flex items-center justify-center"
                >
                  <span className="text-white text-sm font-semibold">TK</span>
                </motion.div>

                {/* Center Juno avatar */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 shadow-xl flex items-center justify-center ring-4 ring-white"
                >
                  <span className="text-white text-2xl font-bold">J</span>
                </motion.div>

                {/* Connection lines (subtle) */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                  <line x1="50" y1="50" x2="25" y2="20" stroke="#f97316" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="70" y2="15" stroke="#f97316" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="85" y2="40" stroke="#f97316" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="75" y2="70" stroke="#f97316" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="20" y2="75" stroke="#f97316" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="10" y2="50" stroke="#f97316" strokeWidth="0.5" />
                </svg>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">15K+</p>
                <p className="text-sm text-gray-500">Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">50+</p>
                <p className="text-sm text-gray-500">Conditions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-500">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
