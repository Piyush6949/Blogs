'use client'
import { use, useEffect, useState } from 'react'
import { getPublishedBlog } from '@/app/actions/blog'
import { JSONContent } from '@tiptap/react'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Heart, Bookmark, Clock, Calendar, MessageCircle } from 'lucide-react'
import '@/app/globals.css'

interface BlogData {
    id: number
    title: string
    content_json: JSONContent
    content_html: null
    createdAt: Date
    authorId: number
    status: string
    author: {
        id: number
        name: string | null
        username: string
    }
    _count: {
        likedBy: number
        favoritedBy: number
        comments: number
    }
}



export default function BlogDetailPage({ params }: { params: Promise<{ blogId: string }> }) {
    const { blogId } = use(params);
    const [isLiked, setIsLiked] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [blog, setBlog] = useState<BlogData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogc = await getPublishedBlog(blogId) as BlogData;
                setBlog(blogc);
                console.log(blogc);
                console.log(blog);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchBlog()
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                    <p className="text-muted-foreground text-xl">Blog not found</p>
                </div>
            </div>
        )
    }

    const htmlContent = generateHTML(blog.content_json, [StarterKit, TextStyle])
    const readingTime = Math.ceil(JSON.stringify(blog.content_json).length / 1000)
    const publishDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (

        <div className="min-h-screen bg-background text-foreground">

            {/* Main Content */}
            <article className="max-w-4xl mx-auto px-6 py-20 sm:px-8 lg:px-12">
                {/* Hero Section */}
                <header className="mb-16 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-primary leading-tight">
                        {blog.title}
                    </h1>

                    {/* Author & Metadata */}
                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg">
                                {blog.author.name?.[0]?.toUpperCase() || blog.author.username[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="text-foreground font-medium">
                                    {blog.author.name || blog.author.username}
                                </p>
                                <p className="text-sm text-muted-foreground">@{blog.author.username}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{publishDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{readingTime} min read</span>
                            </div>
                        </div>
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border">
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span>{blog._count.likedBy} likes</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>{blog._count.comments} comments</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bookmark className="w-4 h-4" />
                            <span>{blog._count.favoritedBy} saves</span>
                        </div>
                    </div>
                </header>

                {/* Blog Content */}
                <div
                    className="tiptap prose prose-invert prose-lg max-w-none mb-16 animate-fade-in-up"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />

                {/* Floating Action Buttons */}
                <div className="fixed bottom-8 right-8 flex flex-col gap-4">
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`group w-14 h-14 rounded-full backdrop-blur-md border transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 ${isLiked
                            ? 'bg-accent border-accent text-accent-foreground'
                            : 'bg-background/80 border-border hover:border-accent'
                            }`}
                    >
                        <Heart
                            className={`w-6 h-6 transition-all ${isLiked ? 'fill-current' : 'text-muted-foreground group-hover:text-accent-foreground'
                                }`}
                        />
                    </button>

                    <button
                        onClick={() => setIsFavorited(!isFavorited)}
                        className={`group w-14 h-14 rounded-full backdrop-blur-md border transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 ${isFavorited
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'bg-background/80 border-border hover:border-primary'
                            }`}
                    >
                        <Bookmark
                            className={`w-6 h-6 transition-all ${isFavorited ? 'fill-current' : 'text-muted-foreground group-hover:text-primary-foreground'
                                }`}
                        />
                    </button>
                </div>
            </article>
        </div >

    )
}
