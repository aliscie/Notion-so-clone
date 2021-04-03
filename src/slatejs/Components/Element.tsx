import React from 'react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import UserChip from '../../Components/UserChip'
import { parser } from '../function/formulaParsers'
import ReactDataGrid from 'react-data-grid'
import { useSelected, useFocused } from 'slate-react'

const Element = (props: any) => {
  const selected = useSelected()
  const focused = useFocused()

  const onGridRowsUpdated = (actions: any) => {
    console.log(actions)
  }

  const [s, set] = React.useState(false)
  const { attributes, children, element } = props
  switch (element.type) {
    case 'table':
      return (
        <div contentEditable={false} {...attributes}>
          <ReactDataGrid
            columns={element.columns}
            rowGetter={(i) => element.rows[i]}
            rowsCount={element.rows.length}
            minHeight={150}
            // onGridRowsUpdated={eval(element.onGridRowsUpdated)}
            onGridRowsUpdated={onGridRowsUpdated}
          />

          {children}
        </div>
      )

    case 'mention':
      return (
        <span {...attributes} contentEditable={false}>
          {UserChip(element.character, selected)}
          {children}
        </span>
      )
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'title':
      return <h2 {...attributes}>{children}</h2>
    case 'formula':
      return (
        <span onMouseEnter={() => set(true)} onMouseLeave={() => set(false)}>
          {s && (
            <code style={{ color: 'blue' }}>
              {children}
              {s && '='}
            </code>
          )}
          <span>{`${parser.parse(element.children[0].text).result}`}</span>
        </span>
      )
    case 'divider':
      return (
        <div contentEditable={false} {...attributes}>
          <Divider />
          {children}
        </div>
      )
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
    case 'subtitle1':
    case 'subtitle2':
    case 'body1':
    case 'body2':
    case 'button':
    case 'caption':
    case 'overline':
      return (
        <Typography variant={element.type} {...attributes}>
          {children}
        </Typography>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default Element
