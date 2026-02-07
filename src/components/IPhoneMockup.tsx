'use client';

interface IPhoneMockupProps {
  children?: React.ReactNode;
  variant?: 'dark' | 'light';
  screenIndex?: number;
}

const screens = [
  // Screen 1: Chat
  (
    <div key="chat" className="flex flex-col h-full pt-12 pb-4 px-3">
      <div className="flex-1 space-y-3 overflow-hidden">
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex-shrink-0" />
          <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm">
            <p className="text-gray-800 text-xs">Hi! How are you feeling today?</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-3 py-2">
            <p className="text-white text-xs">Having some headaches lately</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex-shrink-0" />
          <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm">
            <p className="text-gray-800 text-xs">Let's track this together 💛</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-full px-3 py-2.5 shadow-sm border border-gray-100 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
          </svg>
        </div>
        <span className="text-gray-400 text-xs flex-1">Message Juno...</span>
      </div>
    </div>
  ),
  // Screen 2: Tracking
  (
    <div key="track" className="flex flex-col h-full pt-12 pb-4 px-3">
      <div className="text-center mb-4">
        <p className="text-gray-500 text-[10px]">This week</p>
        <p className="text-gray-900 font-semibold text-sm">Symptom Tracker</p>
      </div>
      <div className="flex-1 space-y-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
          <div key={day} className="flex items-center gap-2 bg-white rounded-xl p-2 shadow-sm">
            <span className="text-[10px] text-gray-400 w-8">{day}</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                style={{ width: `${[70, 85, 60, 90, 75][i]}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-600">{['😊', '😄', '😐', '😄', '😊'][i]}</span>
          </div>
        ))}
      </div>
      <div className="bg-orange-50 rounded-xl p-3 mt-2">
        <p className="text-orange-800 text-[10px] font-medium">Insight</p>
        <p className="text-orange-600 text-[10px]">You feel best on days with 7+ hours of sleep</p>
      </div>
    </div>
  ),
  // Screen 3: Learn
  (
    <div key="learn" className="flex flex-col h-full pt-12 pb-4 px-3">
      <div className="text-center mb-4">
        <p className="text-gray-900 font-semibold text-sm">Learn</p>
      </div>
      <div className="space-y-2">
        {[
          { title: 'Understanding Flares', color: 'bg-purple-100', icon: '📚' },
          { title: 'Talking to Family', color: 'bg-blue-100', icon: '💬' },
          { title: 'Managing Stress', color: 'bg-green-100', icon: '🧘' },
        ].map((item) => (
          <div key={item.title} className={`${item.color} rounded-xl p-3 flex items-center gap-3`}>
            <span className="text-lg">{item.icon}</span>
            <div>
              <p className="text-gray-800 text-xs font-medium">{item.title}</p>
              <p className="text-gray-500 text-[10px]">5 min read</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  // Screen 4: Voice
  (
    <div key="voice" className="flex flex-col h-full pt-12 pb-4 px-3 items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center mb-4 shadow-lg">
        <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center animate-pulse">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
          </svg>
        </div>
      </div>
      <p className="text-gray-800 font-medium text-sm mb-1">Listening...</p>
      <p className="text-gray-400 text-[10px]">Tell me how you're feeling</p>
      <div className="flex gap-1 mt-4">
        {[14, 22, 18, 26, 16].map((h, i) => (
          <div
            key={i}
            className="w-1 bg-orange-400 rounded-full animate-pulse"
            style={{
              height: `${h}px`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  ),
];

export default function IPhoneMockup({ children, variant = 'dark', screenIndex = 0 }: IPhoneMockupProps) {
  const isDark = variant === 'dark';

  return (
    <div className="relative">
      {/* iPhone frame - iPhone 15 Pro style */}
      <div
        className={`relative rounded-[2.5rem] p-[3px] ${
          isDark
            ? 'bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900'
            : 'bg-gradient-to-b from-[#E8E8ED] via-[#D2D2D7] to-[#E8E8ED]'
        }`}
        style={{
          width: '220px',
          height: '450px',
        }}
      >
        {/* Titanium edge effect */}
        <div className={`absolute inset-0 rounded-[2.5rem] ${isDark ? 'bg-gray-800' : 'bg-[#D8D8DC]'}`} />

        {/* Inner bezel */}
        <div className="absolute inset-[3px] rounded-[2.3rem] bg-black overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20" />

          {/* Screen content */}
          <div className="relative w-full h-full bg-gradient-to-b from-[#f8f9fa] to-[#f0f0f5] overflow-hidden">
            {children || screens[screenIndex % screens.length]}
          </div>
        </div>

        {/* Side button (right) */}
        <div className={`absolute right-[-1.5px] top-24 w-[2px] h-10 rounded-l-sm ${isDark ? 'bg-gray-600' : 'bg-[#B8B8BC]'}`} />

        {/* Volume buttons (left) */}
        <div className={`absolute left-[-1.5px] top-20 w-[2px] h-6 rounded-r-sm ${isDark ? 'bg-gray-600' : 'bg-[#B8B8BC]'}`} />
        <div className={`absolute left-[-1.5px] top-28 w-[2px] h-10 rounded-r-sm ${isDark ? 'bg-gray-600' : 'bg-[#B8B8BC]'}`} />

        {/* Subtle reflection */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Shadow */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, transparent 70%)',
          transform: 'translateY(30px) scale(0.85)',
        }}
      />
    </div>
  );
}
