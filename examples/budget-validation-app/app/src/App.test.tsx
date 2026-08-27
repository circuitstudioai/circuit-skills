import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
})

function addExpense(description: string, amount: string, category = 'groceries') {
  fireEvent.change(screen.getByLabelText('Description'), {
    target: { value: description },
  })
  fireEvent.change(screen.getByLabelText('Category'), {
    target: { value: category },
  })
  fireEvent.change(screen.getByLabelText('Amount'), {
    target: { value: amount },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Add expense' }))
}

describe('budget tracker', () => {
  it('adds an expense and updates remaining cash', () => {
    render(<App />)

    expect(screen.getByLabelText('Remaining cash $3,258')).toBeInTheDocument()

    addExpense('Pharmacy run', '58')

    expect(screen.getByText('Pharmacy run')).toBeInTheDocument()
    expect(screen.getByLabelText('Remaining cash $3,200')).toBeInTheDocument()
  })

  it('shows an over-budget category', () => {
    render(<App />)

    addExpense('Dinner party stock-up', '600')

    expect(screen.getByText('$92 over')).toBeInTheDocument()
  })

  it('does not add invalid expenses', () => {
    render(<App />)

    addExpense('', '45')

    expect(screen.queryByText('$3,213')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Remaining cash $3,258')).toBeInTheDocument()
    expect(
      screen.getByText('Enter a description and an amount greater than $0.'),
    ).toBeInTheDocument()
  })
})
