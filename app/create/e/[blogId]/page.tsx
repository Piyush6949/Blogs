'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Placeholder } from '@tiptap/extension-placeholder'
import { use, useEffect, useState, useCallback } from 'react'
import MenuBar from '@/components/web/Menubar'
import { Button } from '@/components/ui/button'
import { edit, publish, getContent } from '@/app/actions/blog'
import '@/app/globals.css'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LoadingSpinner from '@/components/web/loading-spinner'

export default function CreatePage({ params }: { params: Promise<{ blogId: string }> }) {
    const { blogId } = use(params);
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Placeholder.configure({
                placeholder: 'Start Writing your Blog...',
            })
        ],
        content: "",
        immediatelyRender: false,
    });

    // Fetch content once when editor is ready
    useEffect(() => {
        if (!editor) return;

        let isMounted = true; // Prevent state updates if component unmounts
        const fetchData = async () => {
            try {
                const response = await getContent(blogId);

                if (response && isMounted) {
                    setTitle(response.title);
                    editor.commands.setContent(response.content_json);
                }
            } catch (error) {
                console.error('Failed to load blog:', error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup
        };
    }, [editor, blogId]);


    // Memoize callbacks to avoid recreating on each render
    const handleSave = useCallback(async () => {
        if (!editor) return;
        setIsSaving(true);
        const content_json = editor.getJSON();
        await edit(content_json, title, blogId);
        setIsSaving(false);
    }, [editor, title, blogId]);

    if (isLoading) {
        return <LoadingSpinner message="Loading your story…" />
    }
    if (!editor) return null;

    return (
        <div className="flex flex-col">
            {/* ── Sticky toolbar ──────────────────────────────── */}
            <div className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border px-4 py-2">
                <div className="max-w-3xl mx-auto flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                        <MenuBar editor={editor} />
                    </div>
                    <Button
                        variant="outline"
                        className="px-5 shrink-0"
                        onClick={handleSave}
                    >
                        {isSaving ? 'Saving…' : 'Save Draft'}
                    </Button>
                    <Button asChild className="px-5 shrink-0">
                        <Link href={`/publish/${blogId}`}>Publish</Link>
                    </Button>
                </div>
            </div>

            {/* ── Editor area ─────────────────────────────────── */}
            <div className="max-w-3xl mx-auto w-full px-6 py-10 space-y-6">
                {/* Title */}
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full bg-transparent text-3xl md:text-4xl font-bold tracking-tight text-foreground placeholder:text-muted-foreground/40 border-none outline-none"
                    type="text"
                    placeholder="Title"
                />

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Content editor */}
                <EditorContent
                    editor={editor}
                    className="min-h-[60vh] prose-invert text-foreground/90 [&_.tiptap]:outline-none"
                />
            </div>
        </div>
    )
}