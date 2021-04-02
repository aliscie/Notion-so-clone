import React from 'react'
import { useSelected, useFocused } from 'slate-react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import UserChip from '../../Components/UserChip'
import { Parser } from 'hot-formula-parser'
import { HotTable } from '@handsontable/react'
import 'handsontable/dist/handsontable.full.css'

var parser = new Parser()

const Element = (props) => {

  const [s,set]=React.useState(null)
  const { attributes, children, element } = props
  switch (element.type) {
    case 'table':
      return (
        <div {...attributes}>
          <HotTable
          // licenseKey="00000-00000-00000-00000-00000"
          data={element.data}
          colHeaders={true}
          rowHeaders={true}
          width="600"
          height="300"
        />
          {children}
        </div>
      )
    // case 'table-row':
    //   return <tr {...attributes}>{children}</tr>
    // case 'table-cell':
    //   return <td {...attributes}>{children}</td>
    case 'mention':
      return <MentionElement {...props} />
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
        <span
          onMouseEnter={() => set(true)}
          onMouseLeave={() => set(false)}>
         
          {s && <code style={{ color: 'blue' }}>{ children}{s && '='}</code>}
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

const MentionElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()

  return (
    <span
      {...attributes}
      contentEditable={false}
      style={{
        padding: '3px 3px 2px',
        margin: '0 1px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '20px',
        fontSize: '0.9em',
      }}
    >
      {UserChip(element.character, selected && focused)}
      {children}
    </span>
  )
}
export default Element
