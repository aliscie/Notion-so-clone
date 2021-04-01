import React from 'react'
import { Editor, Transforms, Range } from 'slate'
import { ReactEditor } from 'slate-react'

export default function useMention(
  reg: RegExp,
  insertMention: Function,
  editor: any,
  CHARACTERS: any[],
  ref: HTMLDivElement | null | any,
) {
  const [target, setTarget] = React.useState<any | null>()
  const [index, setIndex] = React.useState(0)
  const [search, setSearch] = React.useState('')

  const chars = CHARACTERS.filter((c) =>
    c.toLowerCase().startsWith(search.toLowerCase()),
  ).slice(0, 10)

  React.useEffect(() => {
    if (target && chars.length > 0) {
      const el = ref.current
      const domRange = ReactEditor.toDOMRange(editor, target!)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [chars.length, editor, index, search, target])
  function activateMentionInsert(key: any) {
    Transforms.select(editor, target!)
    insertMention(editor, chars[index], key)
    setTarget(null)
    return
  }
  const onKeyDown = React.useCallback(
    (event) => {
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
            activateMentionInsert(event.key)
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
  function onChange() {
    const { selection } = editor
    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection)
      const wordBefore = Editor.before(editor, start, { unit: 'word' })
      const before = wordBefore && Editor.before(editor, wordBefore)
      const beforeRange = before && Editor.range(editor, before, start)
      const beforeText = beforeRange && Editor.string(editor, beforeRange)
      const beforeMatch = beforeText && beforeText.match(reg)
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
  }

  return [
    index,
    target && chars,
    onKeyDown,
    onChange,
    setIndex,
    activateMentionInsert,
  ]
}
