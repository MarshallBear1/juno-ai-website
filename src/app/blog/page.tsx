import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Chronic Illness Support & AI Health Tips',
  description: 'Expert articles on managing chronic illness, energy pacing, symptom tracking, and how AI companions can support your health journey. Tips for ME/CFS, fibromyalgia, Long COVID, and more.',
  keywords: ['chronic illness blog', 'ME/CFS tips', 'fibromyalgia support', 'Long COVID resources', 'energy pacing', 'symptom tracking', 'AI health companion'],
};

const posts = [
  {
    slug: 'ai-companion-chronic-illness-game-changer',
    title: 'Why an AI Health Companion is a Game-Changer for Chronic Illness',
    excerpt: 'Living with chronic illness means navigating a world that doesn\'t understand invisible symptoms. Here\'s how AI companions are changing the game for millions of us.',
    date: '2026-02-24',
    readTime: '6 min read',
    category: 'AI & Technology',
  },
  {
    slug: 'energy-pacing-guide-spoon-theory',
    title: 'The Complete Guide to Energy Pacing: Beyond Spoon Theory',
    excerpt: 'Spoon theory introduced the world to energy management. Here\'s how to take it further with practical pacing strategies that actually work.',
    date: '2026-02-20',
    readTime: '8 min read',
    category: 'Self-Management',
  },
  {
    slug: 'tracking-symptoms-find-triggers',
    title: 'How to Track Symptoms and Actually Find Your Triggers',
    excerpt: 'Most symptom tracking fails because it\'s too complicated. Learn the simple approach that helps you identify patterns and triggers.',
    date: '2026-02-15',
    readTime: '5 min read',
    category: 'Symptom Tracking',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Juno
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Chronic Illness Blog
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real talk about living with chronic illness. Tips, research, and stories from people who get it.
          </p>
        </div>
      </header>

      {/* Posts Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {posts.map((post) => (
              <article 
                key={post.slug}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-slate-600 mb-4">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 font-medium hover:text-blue-800"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to try Juno?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            An AI companion that actually understands chronic illness. Track symptoms, predict flares, and feel supported.
          </p>
          <a 
            href="https://apps.apple.com/app/juno-chronic-illness-support/id6749455368"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-colors"
          >
            Download Free on iOS
          </a>
        </div>
      </section>
    </main>
  );
}
