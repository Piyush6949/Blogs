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

export default function CreatePage({ params }: { params: Promise<{ blogId: string }> }) {
    // Unwrap params using React's `use` hook (Next.js 15 best practice)
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

    const handlePublish = useCallback(async () => {
        if (!editor) return;
        const content_json = editor.getJSON();
        await publish(content_json, title);
    }, [editor, title, blogId]);

    if (!editor || isLoading) {
        return <div className="flex justify-center p-10">Loading...</div>;
    }

    return (
        <div className='flex flex-col items-center w-full gap-20 p-10'>
            <div className='w-1/2'>
                <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className='tiptap text-2xl text-center w-full' 
                    type="text" 
                    placeholder='Title' 
                />
            </div>
            <div className='w-1/2 min-w-60'>
                <MenuBar editor={editor} />
            </div>
            <EditorContent editor={editor} className='min-h-80 w-1/2' />
            <div className='flex flex-row gap-10'>
                <Button onClick={handleSave}>{isSaving ? 'Saving...' : 'Save'}</Button>
                <Button onClick={handlePublish}>Publish</Button>
            </div>
        </div>
    )
}