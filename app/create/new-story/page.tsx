'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import MenuBar from '@/components/web/Menubar'
import { Button } from '@/components/ui/button'
import { Placeholder } from '@tiptap/extension-placeholder'
import React from 'react'
import '@/app/globals.css'
import { save } from '@/app/actions/blog';
import { publish } from '@/app/actions/blog';


async function saveDraft(editor: ReturnType<typeof useEditor>, title: string) {
  const raw = editor?.getJSON();
  if (!raw) return;
  const content_json = JSON.parse(JSON.stringify(raw));
  await save(content_json, title);
}


export default function CreatePage() {

  const [title, setTitle] = React.useState("");
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Placeholder.configure({
      placeholder: 'Start Writing your Blog...',
    })],
    immediatelyRender: false,
  });


  if (!editor) return null

  return (
    <div className="flex flex-col">
      {/* ── Sticky toolbar ──────────────────────────────────── */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border px-4 py-2">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <MenuBar editor={editor} />
          </div>
          <Button
            variant="outline"
            className="px-5 shrink-0"
            onClick={() => saveDraft(editor, title)}
          >
            Save Draft
          </Button>
        </div>
      </div>

      {/* ── Editor area ─────────────────────────────────────── */}
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
