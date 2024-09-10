/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "./editor.css";
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { useFormContext } from "@saas-ui/react";
import { IconButton } from "@chakra-ui/react";
import { FaceIcon, ImageIcon, FontBoldIcon, FontItalicIcon, StrikethroughIcon, ListBulletIcon, BorderSolidIcon, ResetIcon, ReloadIcon } from '@radix-ui/react-icons';

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-transparent">
      <div className="IconButton-group bg-background">
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FontBoldIcon />
        </IconButton>
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FontItalicIcon />
        </IconButton>
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <StrikethroughIcon />
        </IconButton>
        {/* <IconButton
          aria-label='command'
          onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </IconButton>
        <IconButton
          aria-label='command'
          onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </IconButton> */}
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          P
        </IconButton>
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </IconButton>
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </IconButton>
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          H3
        </IconButton>
        {/* <IconButton
          aria-label='command'
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          H4
        </IconButton>
        <IconButton
          aria-label='command'
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
          H5
        </IconButton>
        <IconButton
          aria-label='command'
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
          H6
        </IconButton> */}
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <ListBulletIcon />
        </IconButton>
        {/* <IconButton
          aria-label='command'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          Ordered list
        </IconButton> */}
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          Blockquote
        </IconButton>
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <BorderSolidIcon />
        </IconButton>
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </IconButton>
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <ResetIcon />
        </IconButton>
        <IconButton
          colorScheme='gray'
          aria-label='command'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <ReloadIcon />
        </IconButton>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

export const Editor: React.FC = React.forwardRef<any, any>((props, ref) => {

  const { setValue, getValues, watch } = useFormContext();
  const [content, setContent] = React.useState(getValues(props.name));
  const field = watch(props.name);

  React.useEffect(() => {
    setValue(props.name, content);
  }, [content]);

  return (<div ref={ref} className="editor border border-gray-500 p-0.5 rounded-md">
    <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} onUpdate={(editor) => {
      // console.log('content updated', content);
      const html = editor.editor.getHTML();
      setContent(html);
    }}

    ></EditorProvider></div>
  );
});

Editor.displayName = 'Editor';