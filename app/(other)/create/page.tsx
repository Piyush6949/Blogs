'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import MenuBar from '@/components/web/Menubar'
import { Button } from '@/components/ui/button'
import { Placeholder } from '@tiptap/extension-placeholder'
import React from 'react'
import '@/app/globals.css'

function save(editor: ReturnType<typeof useEditor>) {
  console.log(editor.getJSON());
  console.log("Submitting editor content...");
  console.log(editor.getHTML())
}

function publish() {
  console.log("Publishing editor content...");
}

export default function CreatePage() {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Placeholder.configure({
      placeholder: 'Start Writing your Blog...',
    })],
    immediatelyRender: false,
  });


  if (!editor) return null

  return (
    <>
      <div className='flex flex-col items-center w-full gap-20 h-96 p-10'>
        <div>
          <input className='tiptap text-2xl text-center ' type="text" placeholder='Title' />
        </div>
        <div className='w-1/2 min-w-60'><MenuBar editor={editor} /></div>

        <EditorContent editor={editor} className='min-h-80 w-1/2' />
        <div className='flex flex-row gap-10'>
          <Button onClick={() => save(editor)}>
            Save
          </Button>
          <Button onClick={publish}>
            Publish
          </Button>
        </div>
      </div>
    </>
  )
}
