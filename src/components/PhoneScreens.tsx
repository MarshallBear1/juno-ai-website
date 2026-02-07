'use client';

import { ReactNode } from 'react';

// Shared components for iMessage-like UI
const JunoBubble = ({ children }: { children: ReactNode }) => (
  <div className="flex items-end gap-2">
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex-shrink-0 flex items-center justify-center shadow-sm">
      <span className="text-white text-xs font-medium">J</span>
    </div>
    <div className="bg-white rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm max-w-[80%]">
      <p className="text-gray-800 text-[13px] leading-relaxed">{children}</p>
    </div>
  </div>
);

const UserBubble = ({ children }: { children: ReactNode }) => (
  <div className="flex justify-end">
    <div className="bg-[#007AFF] rounded-2xl rounded-br-sm px-3.5 py-2.5 max-w-[80%]">
      <p className="text-white text-[13px] leading-relaxed">{children}</p>
    </div>
  </div>
);

const SystemBubble = ({ children, icon }: { children: ReactNode; icon?: ReactNode }) => (
  <div className="flex justify-center">
    <div className="bg-gray-100 rounded-xl px-3 py-2 flex items-center gap-2">
      {icon}
      <p className="text-gray-600 text-[11px] font-medium">{children}</p>
    </div>
  </div>
);

const ActionButton = ({ children }: { children: ReactNode }) => (
  <button className="w-full bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl px-4 py-3 flex items-center justify-between group">
    <span className="text-[13px] font-medium text-gray-800">{children}</span>
    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const MessageInput = () => (
  <div className="bg-gray-100 rounded-full px-4 py-2.5 flex items-center gap-2">
    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
    <span className="text-gray-400 text-[13px] flex-1">Message Juno...</span>
    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>
);

// Screen 1: Finally someone who understands
export function Screen1() {
  return (
    <div className="flex flex-col h-full pt-[15%] pb-[5%] px-4">
      <div className="flex-1 space-y-3 overflow-hidden">
        <JunoBubble>
          Hi there! I&apos;m Juno. How are you feeling today?
        </JunoBubble>

        <UserBubble>
          Not great... my body feels heavy and I can barely focus.
        </UserBubble>

        <JunoBubble>
          I understand. Living with a chronic condition can be exhausting, especially on tough days like this. You&apos;re not alone.
        </JunoBubble>

        <UserBubble>
          It&apos;s hard to explain to people who don&apos;t get it.
        </UserBubble>

        <JunoBubble>
          I get it. Your experience is valid. Would you like to track how you&apos;re feeling so we can look for patterns together?
        </JunoBubble>
      </div>

      <div className="pt-3">
        <MessageInput />
      </div>
    </div>
  );
}

// Screen 2: Track symptoms automatically
export function Screen2() {
  return (
    <div className="flex flex-col h-full pt-[15%] pb-[5%] px-4">
      <div className="flex-1 space-y-3 overflow-hidden">
        <UserBubble>
          I&apos;m feeling so drained. My head hurts.
        </UserBubble>

        <SystemBubble
          icon={
            <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        >
          Symptom recorded
        </SystemBubble>

        <JunoBubble>
          I&apos;ve logged your headache and fatigue. Would you rate the intensity?
        </JunoBubble>

        {/* Symptom intensity chips */}
        <div className="flex gap-2 pl-9">
          {['Mild', 'Moderate', 'Severe'].map((level, i) => (
            <button
              key={level}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                i === 1
                  ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="pt-2">
          <ActionButton>Export symptoms to your doctor</ActionButton>
        </div>
      </div>

      <div className="pt-3">
        <MessageInput />
      </div>
    </div>
  );
}

// Screen 3: Detect flares early
export function Screen3() {
  return (
    <div className="flex flex-col h-full pt-[15%] pb-[5%] px-4">
      <div className="flex-1 space-y-3 overflow-hidden">
        <JunoBubble>
          I noticed something interesting in your patterns...
        </JunoBubble>

        {/* Insight card */}
        <div className="ml-9 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 shadow-sm border border-purple-100/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-purple-700 text-[12px] font-semibold">Pattern Detected</span>
          </div>
          <p className="text-gray-700 text-[13px] leading-relaxed">
            Your symptoms worsen when the barometric pressure drops. This happened 4 times in the last month.
          </p>

          {/* Mini trend chart */}
          <div className="mt-3 flex items-end gap-1 h-8">
            {[40, 65, 50, 80, 45, 70, 55].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-purple-200 rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-gray-400">Mon</span>
            <span className="text-[9px] text-gray-400">Sun</span>
          </div>
        </div>

        <JunoBubble>
          Would you like me to notify you when weather changes are coming?
        </JunoBubble>

        <div className="flex gap-2 pl-9">
          <button className="flex-1 bg-[#007AFF] text-white px-4 py-2 rounded-full text-[13px] font-medium">
            Yes, please
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-[13px] font-medium">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

// Screen 4: Learn how to pace yourself
export function Screen4() {
  return (
    <div className="flex flex-col h-full pt-[15%] pb-[5%] px-4">
      <div className="flex-1 space-y-3 overflow-hidden">
        {/* Pacing report card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-800 text-[13px] font-semibold">Today&apos;s Pacing Report</span>
            <span className="text-[11px] text-gray-400">2:30 PM</span>
          </div>

          {/* Energy levels */}
          <div className="space-y-2">
            {[
              { time: 'Morning', level: 70, color: 'bg-green-400' },
              { time: 'Midday', level: 45, color: 'bg-yellow-400' },
              { time: 'Afternoon', level: 30, color: 'bg-orange-400' },
            ].map((item) => (
              <div key={item.time} className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500 w-16">{item.time}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${item.level}%` }}
                  />
                </div>
                <span className="text-[11px] text-gray-500 w-8">{item.level}%</span>
              </div>
            ))}
          </div>
        </div>

        <JunoBubble>
          Your energy dipped after lunch. I recommend a 15-minute rest to prevent a crash later.
        </JunoBubble>

        {/* Recommendation card */}
        <div className="ml-9 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-3 shadow-sm border border-blue-100/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-blue-800 text-[12px] font-medium">Take a rest break</p>
              <p className="text-blue-600 text-[11px]">15 min recommended</p>
            </div>
          </div>
        </div>

        <UserBubble>
          Starting my rest break now
        </UserBubble>

        <SystemBubble
          icon={
            <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          Timer started · 15:00
        </SystemBubble>
      </div>
    </div>
  );
}

// Export all screens as an array for easy use
export const phoneScreens = [
  <Screen1 key="screen1" />,
  <Screen2 key="screen2" />,
  <Screen3 key="screen3" />,
  <Screen4 key="screen4" />,
];

// Left side content cards for each step
export function FeatureCard1() {
  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
        Living with a chronic condition can feel isolating. Juno is designed to understand the daily
        challenges you face—from brain fog to fatigue to unpredictable symptoms.
      </p>
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <span>Developed with patients and clinicians</span>
      </div>
    </div>
  );
}

export function FeatureCard2() {
  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
        Just talk naturally. Juno understands your symptoms from conversation and logs them for you—no
        manual tracking required.
      </p>
      {/* Symptom log preview */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Today&apos;s log</p>
        <div className="space-y-2">
          {[
            { symptom: 'Headache', severity: '7/10', time: '2:14pm' },
            { symptom: 'Fatigue', severity: 'High', time: '2:14pm' },
            { symptom: 'Brain fog', severity: 'Moderate', time: '2:14pm' },
          ].map((item) => (
            <div key={item.symptom} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
              <span className="text-gray-800 text-sm font-medium">{item.symptom}</span>
              <div className="flex items-center gap-2">
                <span className="text-orange-600 text-sm font-medium">{item.severity}</span>
                <span className="text-gray-400 text-xs">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureCard3() {
  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
        Juno analyzes your symptoms over time to identify triggers and predict flares before they
        happen—giving you time to prepare.
      </p>
      {/* Insight chip */}
      <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-sm font-medium">4 patterns identified this month</span>
      </div>
      {/* Mini chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-800">Symptom Trend</span>
          <span className="text-xs text-green-600 font-medium">↓ 23% this week</span>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {[65, 80, 55, 70, 45, 60, 40].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t transition-all ${i === 6 ? 'bg-green-400' : 'bg-gray-200'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureCard4() {
  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
        Energy management is crucial. Juno helps you understand your energy patterns and suggests
        when to rest—before you crash.
      </p>
      {/* Today's pacing summary */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-800">Energy Today</span>
          <span className="text-xs text-gray-400">Updated 2:30pm</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="4"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#22c55e"
                strokeWidth="4"
                strokeDasharray="88"
                strokeDashoffset="35"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800">
              60%
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-800 font-medium">Good pacing today</p>
            <p className="text-xs text-gray-500 mt-0.5">1 rest break taken</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const featureCards = [
  <FeatureCard1 key="card1" />,
  <FeatureCard2 key="card2" />,
  <FeatureCard3 key="card3" />,
  <FeatureCard4 key="card4" />,
];
