'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import MenuBar from '@/components/web/Menubar'
import { Button } from '@/components/ui/button'
import { Placeholder } from '@tiptap/extension-placeholder'
import React from 'react'
import '@/app/globals.css'
import {save} from '@/app/actions/blog';
import {publish} from '@/app/actions/blog';


export async function saveDraft(editor: ReturnType<typeof useEditor>, title: string) {
  const content_json = editor.getJSON();
  await save(content_json,title);
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
    <>
      <div className='flex flex-col items-center w-full gap-20 h-96 p-10'>
        <div>
          <input value={title} onChange={e => { setTitle(e.target.value) }} className='tiptap text-2xl text-center ' type="text" placeholder='Title' />
        </div>
        <div className='w-1/2 min-w-60'><MenuBar editor={editor} /></div>

        <EditorContent editor={editor} className='min-h-80 w-1/2' />
        <div className='flex flex-row gap-10'>
          <Button onClick={() => saveDraft(editor, title)}>
            Save
          </Button>
          {/* <Button onClick={publish}>
            Publish
          </Button> */}
        </div>
      </div>
    </>
  )
}
