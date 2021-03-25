const withElements = (editor: any) => {
  const { isInline, isVoid, normalizeNode } = editor
  // this is for foced layout
  // editor.normalizeNode = ([node, path]: any) => {
  //   if (path.length === 0) {
  //     if (editor.children.length < 1) {
  //       const title = { type: "title", children: [{ text: "Untitled" }] };
  //       Transforms.insertNodes(editor, title, { at: path.concat(0) });
  //     }

  //     for (const [child, childPath] of Node.children(editor, path)) {
  //       const type = childPath[0] === 0 ? "title" : "paragraph";

  //       if (SlateElement.isElement(child) && child.type !== type) {
  //         const newProperties: Partial<SlateElement> = { type };
  //         Transforms.setNodes(editor, newProperties, { at: childPath });
  //       }
  //     }
  //   }

  //   return normalizeNode([node, path]);
  // };
  editor.isInline = (element: any) => {
    return element.type === 'mention' ? true : isInline(element)
  }

  editor.isVoid = (element: any) => {
    return element.type === 'mention' ? true : isVoid(element)
  }

  return editor
}
export default withElements
