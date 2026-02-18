'use client'


import { useState, useEffect } from 'react'
import { getDrafts, getPublishedBlogs } from '@/app/actions/stories'
import BlogListItem from '@/components/web/BlogListItem'
import { JSONContent } from '@tiptap/core'
import LoadingSpinner from '@/components/web/loading-spinner'

interface Blog {
    id: number
    title: string
    content_json: JSONContent | null
    createdAt: Date
    status: string
}

type Tab = 'drafts' | 'published'

export default function StoriesPage() {
    const [activeTab, setActiveTab] = useState<Tab>('drafts')
    const [drafts, setDrafts] = useState<Blog[]>([])
    const [published, setPublished] = useState<Blog[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            try {
                const [draftsData, publishedData] = await Promise.all([
                    getDrafts(),
                    getPublishedBlogs()
                ])
                setDrafts(draftsData as Blog[]);
                setPublished(publishedData as Blog[]);
            } catch (error) {
                console.error('Failed to load stories:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    if (isLoading) {
        return <LoadingSpinner message="Loading your stories…" />
    }

    const currentBlogs = activeTab === 'drafts' ? drafts : published
    const draftsCount = drafts.length
    const publishedCount = published.length


    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Stories</h1>
                </div>

                {/* Tabs */}
                <div className="border-b border-border mb-6">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('drafts')}
                            className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'drafts'
                                ? 'text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Drafts {draftsCount > 0 && <span className="ml-1">{draftsCount}</span>}
                            {activeTab === 'drafts' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('published')}
                            className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'published'
                                ? 'text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Published {publishedCount > 0 && <span className="ml-1">{publishedCount}</span>}
                            {activeTab === 'published' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Blog List */}
                <div className="bg-background">
                    {currentBlogs.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground text-lg mb-4">
                                {activeTab === 'drafts'
                                    ? "You don't have any drafts yet"
                                    : "You haven't published any stories yet"}
                            </p>
                            <p className="text-muted-foreground">
                                {activeTab === 'drafts'
                                    ? 'Start writing to create your first draft'
                                    : 'Publish a story to see it here'}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {currentBlogs.map((blog) => (
                                <BlogListItem
                                    key={blog.id}
                                    id={blog.id}
                                    title={blog.title}
                                    content_json={blog.content_json as JSONContent}
                                    createdAt={blog.createdAt}
                                    status={blog.status}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
