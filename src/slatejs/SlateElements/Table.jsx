import React from 'react'
import ReactDataGrid from 'react-data-grid'
import { Parser } from 'hot-formula-parser'
export var parser = new Parser()

function Table(props) {
  const onGridRowsUpdated = (actions: any) => {
    console.log(actions)
  }

  const { attributes, children, element } = props
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
}

export default Table
