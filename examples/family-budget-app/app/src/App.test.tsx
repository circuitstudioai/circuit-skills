import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('family budget demo mode', () => {
  it('shows the household plan, members, goals, and ledger', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'The Morgan Family' })).toBeInTheDocument()
    expect(screen.getByText('Family beach week')).toBeInTheDocument()
    expect(screen.getByText('Saturday groceries')).toBeInTheDocument()
    expect(screen.getByLabelText('2 household members')).toBeInTheDocument()
  })

  it('adds an expense and updates breathing room', () => {
    render(<App />)
    expect(screen.getByText('$3,757')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '＋ Add money move' }))
    fireEvent.change(screen.getByLabelText('What was it?'), { target: { value: 'School supplies' } })
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '75' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add to ledger' }))
    expect(screen.getByText('School supplies')).toBeInTheDocument()
    expect(screen.getByText('$3,682')).toBeInTheDocument()
  })

  it('adds a shared savings goal', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '◎ New family goal' }))
    fireEvent.change(screen.getByLabelText('Goal name'), { target: { value: 'Emergency fund' } })
    fireEvent.change(screen.getByLabelText('Target amount'), { target: { value: '10000' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create family goal' }))
    expect(screen.getByText('Emergency fund')).toBeInTheDocument()
  })

  it('deletes a transaction and recalculates totals', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Delete Fuel' }))
    expect(screen.queryByText('Fuel')).not.toBeInTheDocument()
    expect(screen.getByText('$3,816')).toBeInTheDocument()
  })
})
