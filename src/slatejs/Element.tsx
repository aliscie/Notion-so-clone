import {
  Editable,
  withReact,
  Slate,
  ReactEditor,
  useSelected,
  useFocused,
} from 'slate-react'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
const Element = (props: any) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'table':
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      )
    case 'mention':
      return <MentionElement {...props} />
    case 'table-row':
      return <tr {...attributes}>{children}</tr>
    case 'table-cell':
      return <td {...attributes}>{children}</td>
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'title':
      return <h2 {...attributes}>{children}</h2>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const MentionElement = ({ attributes, children, element }: any) => {
  const selected = useSelected()
  const focused = useFocused()

  return (
    <Chip
      size="small"
      avatar={
        <Avatar
          alt="Natacha"
          src="http://localhost:8000/images/20180815_123724.jpg"
        />
      }
      label={'@' + element.character}
      {...attributes}
      contentEditable={false}
    />
  )
}
export default Element
