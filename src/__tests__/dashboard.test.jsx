import Page from "../app/dashboard/page";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Load Dashboard', () => {
  it('renders headers', () => {
    render(<Page />)

    const total_request = screen.getByRole('heading', {
      name: '0'
    }) // Header for Total Requests have been initialized with a zero

    expect(total_request).toBeInTheDocument()
  })
  it('renders button', () => {
    render(<Page />)

    const random_string_button = screen.getByText('Random String') // verifies button for Random String is loaded

    expect(random_string_button).toBeInTheDocument()
  })
})
