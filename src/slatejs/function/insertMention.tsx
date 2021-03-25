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
import Paper from '@material-ui/core/Paper'

const insertMention = (editor: Editor, character: string) => {
  const mention = { type: 'mention', character, children: [{ text: '' }] }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}

export default insertMention
