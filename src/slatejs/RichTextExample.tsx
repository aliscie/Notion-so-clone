import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import isHotkey from 'is-hotkey'
import {
  Editable,
  withReact,
  Slate,
  ReactEditor,
  useSelected,
  useFocused,
} from 'slate-react'
import {
  createEditor,
  Node,
  Editor,
  Transforms,
  Range,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import HoverToolbar from './HoverToolbar'
import Element from './Element'
import Leaf from './Leaf'
import Paper from '@material-ui/core/Paper'
import usePosts from '../Hooks/usePosts'
const HOTKEYS: any = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const CHARACTERS = ['username1', 'usernam2']
const insertMention = (editor: Editor, character: string) => {
  const mention = { type: 'mention', character, children: [{ text: '' }] }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}

const RichTextExample = ({ item }: any) => {
  const { loading, error, data, res, setstate }: any = usePosts()
  const ref = useRef<HTMLDivElement | null | any>()
  const [value, setValue] = useState<Node[]>(JSON.parse(item.description))
  React.useEffect(() => {
    setValue(JSON.parse(item.description))
  }, [item])
  const [search, setSearch] = useState('')
  const [index, setIndex] = useState(0)
  const [target, setTarget] = useState<Range | undefined | any>()

  const chars = CHARACTERS.filter((c: any) =>
    c.toString().toLowerCase().startsWith(search.toLowerCase()),
  ).slice(0, 10)

  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const withElements = (editor: any) => {
    const { isInline, isVoid, normalizeNode } = editor
    // this is for foced layout
    // editor.normalizeNode = ([node, path]: any) => {
    //   if (path.length === 0) {
    //     if (editor.children.length < 1) {
    //       const title = { type: "title", children: [{ text: "Untitled" }] };
    //       Transforms.insertNodes(editor, title, { at: path.concat(0) });
    //     }

    //     for (const [child, childPath] of Node.children(editor, path)) {
    //       const type = childPath[0] === 0 ? "title" : "paragraph";

    //       if (SlateElement.isElement(child) && child.type !== type) {
    //         const newProperties: Partial<SlateElement> = { type };
    //         Transforms.setNodes(editor, newProperties, { at: childPath });
    //       }
    //     }
    //   }

    //   return normalizeNode([node, path]);
    // };
    editor.isInline = (element: any) => {
      return element.type === 'mention' ? true : isInline(element)
    }

    editor.isVoid = (element: any) => {
      return element.type === 'mention' ? true : isVoid(element)
    }

    return editor
  }
  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  //🔴 is it bad to replace the the line upove
  const editor = useMemo(
    () => withElements(withReact(withHistory(createEditor()))),
    [],
  )

  const onKeyDown = useCallback(
    (event) => {
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event as any)) {
          event.preventDefault()
          // TODO what this sposed to do?
          // const mark = HOTKEYS[hotkey];
          // toggleMark(editor, mark);
        }
      }
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1
            setIndex(prevIndex)
            break
          case 'ArrowUp':
            event.preventDefault()
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1
            setIndex(nextIndex)
            break
          case 'Tab':
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, target)
            insertMention(editor, chars[index])
            setTarget(null)
            break
          case 'Escape':
            event.preventDefault()
            setTarget(null)
            break
        }
      }
    },
    [index, search, target],
  )
  useEffect(() => {
    if (target && chars.length > 0) {
      const el = ref.current
      const domRange = ReactEditor.toDOMRange(editor, target)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [chars.length, editor, index, search, target])
  const userId = 1 // parseInt(`${localStorage.getItem('userId')}`)
  var readOnly: boolean

  if (item.addedBy === userId) {
    readOnly = false
  } else if (item.whoCanEdite.length > 0) {
    readOnly = !item.whoCanEdite.includes(userId) ? true : false
  } else {
    readOnly = false
  }
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value)
        setstate({ id: item.id, description: JSON.stringify(value) })
        // lookup('PUT', `api/post/${item.id}/`, callback, {
        //   // title: "new title",
        //   description: JSON.stringify(value),
        //   // addedBy: item.addedBy,
        //   // created_date: item.created_date,
        //   // whoCanSee: item.whoCanSee,
        // })
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection)
          const wordBefore = Editor.before(editor, start, { unit: 'word' })
          const before = wordBefore && Editor.before(editor, wordBefore)
          const beforeRange = before && Editor.range(editor, before, start)
          const beforeText = beforeRange && Editor.string(editor, beforeRange)
          const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/)
          const after = Editor.after(editor, start)
          const afterRange = Editor.range(editor, start, after)
          const afterText = Editor.string(editor, afterRange)
          const afterMatch = afterText.match(/^(\s|$)/)

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange)
            setSearch(beforeMatch[1])
            setIndex(0)
            return
          }
        }

        setTarget(null)
      }}
    >
      <HoverToolbar />
      <Editable
        readOnly={readOnly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={onKeyDown}
      />
      {target && chars.length > 0 && (
        <Paper
          ref={ref}
          style={{
            cursor: 'pointer',
            top: '-9999px',
            left: '-9999px',
            position: 'absolute',
            zIndex: 1,
            padding: '3px',
          }}
        >
          {chars.map((char: any, i: number) => (
            <div
              onMouseEnter={(event: any) => {
                event.target.style.backgroundColor = 'lightblue'
              }}
              onMouseLeave={(event: any) => {
                event.target.style.backgroundColor = null
              }}
              // onClick={(event: any) => {
              //   // TODO
              //   console.log(event.target.innerText);
              //   Transforms.select(editor, target);
              //   insertMention(editor, event.target.innerText);
              //   setTarget(null);
              //   console.log("event.target");
              // }}
              key={char}
              style={{
                padding: '1px 3px',
                borderRadius: '3px',
                background: i === index ? '#B4D5FF' : 'transparent',
              }}
            >
              {char}
            </div>
          ))}
        </Paper>
      )}
    </Slate>
  )
}

export default RichTextExample
