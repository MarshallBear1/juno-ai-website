'use client';

import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Co-founder & CEO",
    bio: "Former physician, chronic illness advocate. Lives with ME/CFS.",
    initials: "SC",
    gradient: "from-orange-400 to-orange-500",
  },
  {
    name: "James Morrison",
    role: "Co-founder & CTO",
    bio: "AI researcher, health tech veteran. Stanford PhD.",
    initials: "JM",
    gradient: "from-blue-400 to-blue-500",
  },
  {
    name: "Dr. Emily Park",
    role: "Chief Medical Officer",
    bio: "Rheumatologist, digital health specialist.",
    initials: "EP",
    gradient: "from-purple-400 to-purple-500",
  },
  {
    name: "Alex Rivera",
    role: "Head of Product",
    bio: "UX leader, accessibility advocate. Previously at Apple Health.",
    initials: "AR",
    gradient: "from-green-400 to-green-500",
  },
  {
    name: "Dr. Michael Thompson",
    role: "Research Lead",
    bio: "Chronic pain researcher, patient-centered design expert.",
    initials: "MT",
    gradient: "from-pink-400 to-pink-500",
  },
  {
    name: "Lisa Nakamura",
    role: "Community Lead",
    bio: "Patient advocate, support group facilitator for 10+ years.",
    initials: "LN",
    gradient: "from-cyan-400 to-cyan-500",
  },
];

export default function Team() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-orange-600 tracking-wide uppercase mb-3">
            Our Team
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Meet the people behind Juno
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re a team of doctors, researchers, technologists, and patients united by a
            mission to make chronic illness care more human.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Avatar */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-4 shadow-md`}>
                <span className="text-white text-xl font-semibold">{member.initials}</span>
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-orange-600 font-medium text-sm mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>

              {/* Social link placeholder */}
              <a
                href="#"
                className="inline-flex items-center gap-1 mt-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Careers CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl px-8 py-6 shadow-sm">
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Want to join our mission?</h3>
              <p className="text-gray-600 text-sm">We&apos;re always looking for passionate people.</p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
            >
              View open roles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
