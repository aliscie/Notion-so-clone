const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.Special) {
    children = <span style={{ fontSize: '22px' }}>{children}</span>
  }
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = (
      <code
        style={{
          background: '#F0F0F7',
          borderRadius: '5px',
          color: 'tomato',
        }}
      >
        {children}
      </code>
    )
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}
export default Leaf
