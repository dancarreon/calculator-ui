import {render, screen} from "@testing-library/react";
import {AccountInfo} from "../components/dashboard/account/account-info";
import '@testing-library/jest-dom'

const mockUser = {
  id: '1',
  username: 'Test User',
  avatar: 'Test',
  status: true,
}

describe('Load Account', () => {
  it('renders account', () => {
    render(<AccountInfo user={mockUser}/>)

    // verifies if user info is displayed
    const user = screen.getByRole('heading', {
      name: 'Test User'
    })

    // verifies if user avatar is shown
    const userAvatar = screen.getByRole('img', {
      src: 'Test',
      class: 'MuiAvatar-img css-1pqm26d-MuiAvatar-img'
    })

    expect(user).toBeInTheDocument()
    expect(userAvatar).toBeInTheDocument()
  })
})
