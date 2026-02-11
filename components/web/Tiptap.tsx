'use client'

import Bold from '@tiptap/extension-bold'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import "@/app/globals.css";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit,Document,Paragraph,Text,Bold],
    content: '<p>Hello World! 🌎️</p>',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })
  
  if(!editor) {
    return null;
  }

  return (<>
      <div className="control-group">
        <div className="button-group flex flex-row gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </button>
        </div>
      </div>
      <EditorContent editor={editor} className='editor'/>
    </>)
  
}

export default Tiptap