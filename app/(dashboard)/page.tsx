import Link from "next/link";
import {
  TrendingUp,
  Clock,
  Heart,
  MessageCircle,
  Bookmark,
  ArrowRight,
  Sparkles,
  Flame,
  Star,
  PenSquare,
} from "lucide-react";

// ── Dummy data ──────────────────────────────────────────────────
const trendingPosts = [
  {
    id: 1,
    title: "Building Scalable APIs with Next.js Server Actions",
    excerpt:
      "How server actions are changing the way we think about backend logic in modern web apps.",
    author: "Sarah Chen",
    date: "Feb 17, 2026",
    readTime: "6 min read",
    likes: 234,
    comments: 42,
    tag: "Next.js",
  },
  {
    id: 2,
    title: "The Art of Writing Clean TypeScript",
    excerpt:
      "Patterns and practices that will make your TypeScript code more maintainable and readable.",
    author: "Alex Kumar",
    date: "Feb 16, 2026",
    readTime: "8 min read",
    likes: 189,
    comments: 31,
    tag: "TypeScript",
  },
  {
    id: 3,
    title: "Why I Switched from REST to tRPC",
    excerpt:
      "A deep dive into end-to-end type safety and how it transformed my development workflow.",
    author: "Jordan Lee",
    date: "Feb 15, 2026",
    readTime: "5 min read",
    likes: 312,
    comments: 67,
    tag: "Backend",
  },
];

const recentPosts = [
  {
    id: 4,
    title: "CSS Container Queries: A Practical Guide",
    author: "Mia Park",
    date: "Feb 18, 2026",
    readTime: "4 min read",
    tag: "CSS",
  },
  {
    id: 5,
    title: "Understanding React Server Components",
    author: "Raj Patel",
    date: "Feb 18, 2026",
    readTime: "7 min read",
    tag: "React",
  },
  {
    id: 6,
    title: "Mastering Git Rebase: Tips & Tricks",
    author: "Emma Wilson",
    date: "Feb 17, 2026",
    readTime: "3 min read",
    tag: "DevOps",
  },
  {
    id: 7,
    title: "Building a Design System from Scratch",
    author: "Leo Zhang",
    date: "Feb 17, 2026",
    readTime: "10 min read",
    tag: "Design",
  },
  {
    id: 8,
    title: "PostgreSQL Performance Tuning",
    author: "Nina Ivanova",
    date: "Feb 16, 2026",
    readTime: "6 min read",
    tag: "Database",
  },
];

const topics = [
  { name: "JavaScript", count: 1240 },
  { name: "React", count: 980 },
  { name: "Next.js", count: 760 },
  { name: "TypeScript", count: 650 },
  { name: "CSS", count: 520 },
  { name: "Node.js", count: 430 },
  { name: "DevOps", count: 310 },
  { name: "AI / ML", count: 890 },
];

const featuredAuthors = [
  { name: "Sarah Chen", posts: 48, followers: "2.1k" },
  { name: "Alex Kumar", posts: 35, followers: "1.8k" },
  { name: "Jordan Lee", posts: 29, followers: "1.5k" },
];

// ── Tag color mapping ───────────────────────────────────────────
const tagColors: Record<string, string> = {
  "Next.js": "bg-blue-500/15 text-blue-400",
  TypeScript: "bg-indigo-500/15 text-indigo-400",
  Backend: "bg-emerald-500/15 text-emerald-400",
  CSS: "bg-pink-500/15 text-pink-400",
  React: "bg-cyan-500/15 text-cyan-400",
  DevOps: "bg-amber-500/15 text-amber-400",
  Design: "bg-violet-500/15 text-violet-400",
  Database: "bg-orange-500/15 text-orange-400",
};

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16">
      {/* ── SECTION 1: Hero / Welcome ────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-accent/20 p-8 md:p-12 animate-fade-in">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-sidebar-primary/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-chart-2/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <Sparkles className="w-4 h-4 text-chart-3" />
            <span>Welcome back</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Discover stories that{" "}
            <span className="text-primary">
              inspire
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mb-6">
            Read, write, and share ideas with a community of curious minds.
          </p>
          <Link
            href="/create/new-story"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <PenSquare className="w-4 h-4" />
            Start Writing
          </Link>
        </div>
      </section>

      {/* ── SECTION 2: Trending Posts ────────────────────────────── */}
      <section className="animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-chart-5" />
            <h2 className="text-xl font-semibold text-foreground">Trending</h2>
          </div>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {trendingPosts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 hover:border-sidebar-primary/30 hover:shadow-lg hover:shadow-sidebar-primary/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[post.tag] || "bg-muted text-muted-foreground"}`}
                >
                  {post.tag}
                </span>
                <span className="text-2xl font-bold text-muted-foreground/20">
                  0{i + 1}
                </span>
              </div>

              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                <span>{post.author}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" /> {post.comments}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: Two‑column: Recent + Sidebar ─────────────── */}
      <div className="grid md:grid-cols-[1fr_300px] gap-8 animate-fade-in-up">
        {/* Recent Posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-chart-2" />
              <h2 className="text-xl font-semibold text-foreground">
                Recent Posts
              </h2>
            </div>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-1 rounded-xl border border-border bg-card overflow-hidden">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group flex items-center justify-between px-5 py-4 hover:bg-accent/30 transition-colors border-b border-border last:border-b-0"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <span
                  className={`ml-4 shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[post.tag] || "bg-muted text-muted-foreground"}`}
                >
                  {post.tag}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="space-y-6">
          {/* ── SECTION 4: Explore Topics ─────────────────────────── */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-chart-1" />
              <h3 className="font-semibold text-foreground text-sm">
                Explore Topics
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Link
                  key={topic.name}
                  href="#"
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  {topic.name}
                  <span className="ml-1 text-muted-foreground/50">
                    {topic.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── SECTION 5: Featured Authors ───────────────────────── */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-chart-3" />
              <h3 className="font-semibold text-foreground text-sm">
                Featured Authors
              </h3>
            </div>
            <div className="space-y-4">
              {featuredAuthors.map((author) => (
                <div
                  key={author.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-chart-1 to-chart-4 flex items-center justify-center text-xs font-bold text-white">
                      {author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {author.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {author.posts} posts · {author.followers} followers
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 6: Reading List / Bookmarks ──────────────── */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Bookmark className="w-4 h-4 text-chart-4" />
              <h3 className="font-semibold text-foreground text-sm">
                Your Reading List
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Save articles to read later. Your bookmarks will appear here.
            </p>
            <Link
              href="#"
              className="text-xs text-sidebar-primary hover:underline flex items-center gap-1"
            >
              Browse popular posts <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
