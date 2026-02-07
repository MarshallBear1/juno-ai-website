'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How does Juno understand my symptoms?",
    answer: "Juno uses advanced natural language processing to understand what you're describing in everyday language. You don't need to use medical terminology—just describe how you're feeling like you would to a friend. Juno learns from your patterns over time to provide increasingly personalized insights.",
  },
  {
    question: "Is my health data secure?",
    answer: "Absolutely. Your data is encrypted end-to-end, stored securely on HIPAA-compliant servers, and never sold to third parties. You own your data and can export or delete it at any time. We're committed to the highest standards of privacy and security.",
  },
  {
    question: "Can Juno replace my doctor?",
    answer: "No, and that's not our goal. Juno is designed to complement your healthcare team, not replace it. We help you track symptoms, identify patterns, and prepare for doctor's appointments with detailed reports. Always consult with healthcare professionals for medical advice and treatment decisions.",
  },
  {
    question: "What conditions does Juno support?",
    answer: "Juno is designed for people living with chronic conditions including ME/CFS, Long COVID, fibromyalgia, lupus, Crohn's disease, rheumatoid arthritis, multiple sclerosis, POTS, and many others. Our symptom tracking and insights adapt to your specific condition and experience.",
  },
  {
    question: "How much does Juno cost?",
    answer: "Juno offers a free tier with core features including symptom tracking and basic insights. Our premium plan includes advanced pattern detection, doctor reports, community access, and personalized recommendations. We also offer reduced pricing for those facing financial hardship.",
  },
  {
    question: "Can I share my data with my doctor?",
    answer: "Yes! You can generate comprehensive reports of your symptoms, triggers, and patterns that are designed to be easily understood by healthcare providers. These reports can be exported as PDFs or shared directly from the app.",
  },
  {
    question: "Does Juno work offline?",
    answer: "Basic symptom logging works offline, and your data syncs automatically when you're back online. However, some features like real-time insights and community access require an internet connection.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-start justify-between text-left group"
      >
        <span className="font-medium text-gray-900 pr-4 group-hover:text-orange-600 transition-colors">
          {question}
        </span>
        <span className="flex-shrink-0 mt-1">
          <motion.svg
            className="w-5 h-5 text-gray-400"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-orange-600 tracking-wide uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Juno
          </p>
        </div>

        {/* FAQ list */}
        <div className="bg-gray-50 rounded-2xl px-6 md:px-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            Contact our support team
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
