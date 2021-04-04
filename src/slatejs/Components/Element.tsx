import React from 'react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import UserChip from '../../Components/UserChip'
import { parser } from '../function/formulaParsers'
import ReactDataGrid from 'react-data-grid'
import { useSelected, useFocused } from 'slate-react'
import Table from '../SlateElements/Table'
import Formula from '../SlateElements/Formula'

const Element = (props: any) => {
  const selected = useSelected()

  const { attributes, children, element } = props
  switch (element.type) {
    case 'table':
      return <Table {...props} />
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
      return <Formula {...props} />
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
