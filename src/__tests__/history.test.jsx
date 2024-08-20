import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {HistoryTable} from "../components/dashboard/history/history-table";

const userRecords = [{
  amount: 1,
  userBalance: 10,
  operationResponse: 200,
  date: new Date(),
  avatar: 'User Test',
}]

describe('Load History', () => {
  it('renders history table', () => {
    render(<HistoryTable rows={userRecords}/>)

    // verifies if history table contains some of the headers and the mock user info
    const columnHeaderUser = screen.getByRole('columnheader', {
      name: 'User'
    })
    const columnHeaderAmount = screen.getByRole('columnheader', {
      name: 'Amount'
    })
    const cellAmount = screen.getByRole('cell', {
      name: '1'
    })
    const cellBalance = screen.getByRole('cell', {
      name: '10'
    })

    expect(columnHeaderUser).toBeInTheDocument()
    expect(columnHeaderAmount).toBeInTheDocument()
    expect(cellAmount).toBeInTheDocument()
    expect(cellBalance).toBeInTheDocument()
  })
})
