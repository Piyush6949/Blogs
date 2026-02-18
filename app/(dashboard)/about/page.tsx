import Link from "next/link";
import {
    PenSquare,
    BookOpen,
    Users,
    Heart,
    Sparkles,
    Globe,
    Zap,
    Shield,
} from "lucide-react";

const values = [
    {
        icon: Sparkles,
        title: "Quality First",
        description:
            "We believe in thoughtful, well-crafted writing that adds genuine value to readers.",
    },
    {
        icon: Globe,
        title: "Open Community",
        description:
            "Everyone has a story worth telling. Our platform welcomes voices from all backgrounds.",
    },
    {
        icon: Zap,
        title: "Distraction-Free",
        description:
            "A clean, focused writing experience so you can concentrate on what matters — your ideas.",
    },
    {
        icon: Shield,
        title: "Your Content, Your Rules",
        description:
            "You own everything you write. No hidden algorithms, no paywalls, no surprises.",
    },
];

const stats = [
    { label: "Writers", value: "2,500+" },
    { label: "Stories Published", value: "12,000+" },
    { label: "Monthly Readers", value: "85k+" },
    { label: "Topics Covered", value: "120+" },
];

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 pb-20">
            {/* ── Hero Section ─────────────────────────────────────── */}
            <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-accent/20 p-8 md:p-12 animate-fade-in">
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-sidebar-primary/10 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-chart-2/10 blur-3xl" />

                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                        <Heart className="w-4 h-4 text-chart-5" />
                        <span>About YourBlogs</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                        A space for{" "}
                        <span className="text-primary">
                            curious minds
                        </span>{" "}
                        to write and discover
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        YourBlogs is a modern blogging platform built for writers who care
                        about their craft. Share ideas, tell stories, and connect with a
                        growing community of readers and creators.
                    </p>
                </div>
            </section>

            {/* ── Stats ────────────────────────────────────────────── */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-border bg-card p-5 text-center"
                    >
                        <p className="text-2xl font-bold text-foreground mb-1">
                            {stat.value}
                        </p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* ── Our Values ───────────────────────────────────────── */}
            <section className="animate-fade-in-up">
                <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="w-5 h-5 text-chart-2" />
                    <h2 className="text-xl font-semibold text-foreground">
                        What We Believe
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {values.map((item) => (
                        <div
                            key={item.title}
                            className="group rounded-xl border border-border bg-card p-6 hover:border-sidebar-primary/30 hover:shadow-lg hover:shadow-sidebar-primary/5 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-accent/50 flex items-center justify-center shrink-0">
                                    <item.icon className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── How It Works ─────────────────────────────────────── */}
            <section className="animate-fade-in-up">
                <div className="flex items-center gap-2 mb-6">
                    <Users className="w-5 h-5 text-chart-3" />
                    <h2 className="text-xl font-semibold text-foreground">
                        How It Works
                    </h2>
                </div>

                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    {[
                        {
                            step: "01",
                            title: "Create an account",
                            desc: "Sign up in seconds. No credit card, no commitments.",
                        },
                        {
                            step: "02",
                            title: "Write your story",
                            desc: "Use our distraction-free editor with rich formatting tools.",
                        },
                        {
                            step: "03",
                            title: "Publish & share",
                            desc: "Hit publish and share your work with readers worldwide.",
                        },
                    ].map((item, i) => (
                        <div
                            key={item.step}
                            className={`flex items-center gap-6 px-6 py-5 ${i < 2 ? "border-b border-border" : ""}`}
                        >
                            <span className="text-2xl font-bold text-muted-foreground/20 shrink-0">
                                {item.step}
                            </span>
                            <div>
                                <h3 className="font-medium text-foreground">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────── */}
            <section className="text-center py-8 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                    Ready to start writing?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Join our community of writers and share your ideas with the world.
                </p>
                <Link
                    href="/create/new-story"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                >
                    <PenSquare className="w-4 h-4" />
                    Start Writing
                </Link>
            </section>
        </div>
    );
}