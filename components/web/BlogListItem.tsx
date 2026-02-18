import Link from 'next/link'
import type { JSONContent } from '@tiptap/core'
import { useState, useRef, useEffect } from 'react'
import { redirect } from 'next/navigation'

interface BlogListItemProps {
    id: number
    title: string
    content_json: JSONContent | null
    createdAt: Date
    status: string
}

function getReadTime(content: JSONContent | null): string {
    if (!content) return '0 min read'

    // Count words in the content
    let wordCount = 0

    const countWords = (node: JSONContent) => {
        if (node.type === 'text' && node.text) {
            wordCount += node.text.split(/\s+/).filter(word => word.length > 0).length
        }
        if (node.content) {
            node.content.forEach(countWords)
        }
    }

    countWords(content)

    // Average reading speed is 200 words per minute
    const minutes = Math.ceil(wordCount / 200)
    return `${minutes} min read (${wordCount} words)`
}

function getRelativeTime(date: Date): string {
    const now = new Date()
    const diffInMs = now.getTime() - new Date(date).getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Updated today'
    if (diffInDays === 1) return 'Updated 1d ago'
    if (diffInDays < 30) return `Updated ${diffInDays}d ago`

    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths === 1) return 'Updated 1mo ago'
    if (diffInMonths < 12) return `Updated ${diffInMonths}mo ago`

    const diffInYears = Math.floor(diffInMonths / 12)
    return `Updated ${diffInYears}y ago`
}

export default function BlogListItem({ id, title, content_json, createdAt, status }: BlogListItemProps) {
    const readTime = getReadTime(content_json)
    const relativeTime = getRelativeTime(createdAt)
    const editUrl = status === 'draft' ? `/create/e/${id}` : `/blog/${id}`
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Toggle function
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex items-center justify-between border-b border-border py-6 px-4 hover:bg-accent/5 transition-colors">
            <Link href={editUrl} className="flex-1 min-w-0 group">
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors mb-2 truncate">
                        {title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{readTime}</span>
                        <span>•</span>
                        <span>{relativeTime}</span>
                    </div>
                </div>
            </Link>
            <div className="relative ml-4" ref={menuRef}>
                <button
                    className="p-2 hover:bg-accent/50 rounded-full transition-colors"
                    onClick={toggleMenu}
                >
                    <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <circle cx="10" cy="4" r="2" />
                        <circle cx="10" cy="10" r="2" />
                        <circle cx="10" cy="16" r="2" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute right-2 top-10 w-48 bg-background border border-border rounded-md shadow-lg py-1 z-10">
                        <button
                            className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent/50"
                            onClick={(e) => {
                                setIsOpen(false);
                                if(status === "draft"){
                                    redirect(`/publish/${id}`)
                                }else{
                                    redirect(`/create/e/${id}`)
                                }
                            }}
                        >
                            {status === 'draft' ? 'Publish' : 'Edit'}
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent/50"
                            onClick={(e) => {
                                // e.preventDefault();
                                // TODO: Add delete functionality
                                setIsOpen(false);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
