import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import Element from './slatejs/Components/Element'
import RichText from './slatejs/RichText'
import GoogleAuth from './Components/GoogleAuth'
import Table from './slatejs/SlateElements/Table'
import Formula from './slatejs/SlateElements/Formula'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/Material-UI/i)
  expect(linkElement).toBeInTheDocument()
})

// test('Elements', () => {
//   const x = render(<Formula />)
//   // console.log(x)
//   // const linkElement = x.debug()
//   // console.log(linkElement)
//   // expect(linkElement).toBeInTheDocument()
// })

// test('slatejs formula', () => {
//   const x = render(<Element element={'table'} />)
//   // console.log(x)
//   // const linkElement = x.debug()
//   // console.log(linkElement)
//   // expect(linkElement).toBeInTheDocument()
// })

// test('slatejs table', () => {
//   const x = render(<Table />)
//   // console.log(x)
//   // const linkElement = x.debug()
//   // console.log(linkElement)
//   // expect(linkElement).toBeInTheDocument()
// })
