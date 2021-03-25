import { Editor, Transforms } from 'slate'

const insertMention = (editor: Editor, character: string) => {
  const mention = { type: 'mention', character, children: [{ text: '' }] }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}

export default insertMention
