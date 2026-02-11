'use client'

import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
} from 'lucide-react'

import { menuBarStateSelector } from '@/lib/menubarState'

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  const btn = (active?: boolean) =>
    active ? 'default' : 'outline'

  return (
    <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/40">
      
      {/* Text formatting */}
      <div className="flex gap-1">
        <Button
          size="icon"
          variant={btn(editorState.isBold)}
          disabled={!editorState.canBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant={btn(editorState.isItalic)}
          disabled={!editorState.canItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant={btn(editorState.isStrike)}
          disabled={!editorState.canStrike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant={btn(editorState.isCode)}
          disabled={!editorState.canCode}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      {/* Headings */}
      <div className="flex gap-1 border-l pl-2">
        <Button
          size="icon"
          variant={btn(editorState.isHeading1)}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant={btn(editorState.isHeading2)}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editorState.isHeading2 ? 'is-active' : ''}
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant={btn(editorState.isHeading3)}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
      </div>

      {/* Lists & blocks */}
      <div className="flex gap-1 border-l pl-2">
        <Button
          size="icon"
          variant={btn(editorState.isBulletList)}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant={btn(editorState.isOrderedList)}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant={btn(editorState.isBlockquote)}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>

      {/* Undo / redo */}
      <div className="flex gap-1 border-l pl-2 ml-auto">
        <Button
          size="icon"
          variant="outline"
          disabled={!editorState.canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          disabled={!editorState.canRedo}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
