import React from 'react'
import { Editor, Transforms, Range } from 'slate'
import { ReactEditor } from 'slate-react'

export default function useConvert(
  reg: any,
  convertFunction: Function,
  editor: Editor,
  ref: any,
) {
  function onChange() {
    const { selection } = editor
    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection)
      const wordBefore = Editor.before(editor, start, { unit: 'word' })
      const before = wordBefore && Editor.before(editor, wordBefore)
      const beforeRange = before && Editor.range(editor, before, start)
      const beforeText = beforeRange && Editor.string(editor, beforeRange)
      const beforeMatch = beforeText && beforeText.match(reg)
      // console.log(beforeMatch)

      if (beforeMatch) {
        // TODO
        // 1) select the text wappred in <>
        // 2) set the selcetedc text in to a leaf or element with type formula
        // 3) in Elements.tsx or leaf.tsx handl the formula
        // import {Parser} from 'hot-formula-parser'
        // var parser = new Parser()

        return
      }
    } else {
    }
  }

  return [onChange]
}
