import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App'

const storage = new Map<string, string>()
Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: {
    clear: () => storage.clear(),
    getItem: (key: string) => storage.get(key) ?? null,
    removeItem: (key: string) => storage.delete(key),
    setItem: (key: string, value: string) => storage.set(key, value),
  },
})

beforeEach(() => window.localStorage.clear())
afterEach(cleanup)

function addTransaction(description: string, amount: string) {
  fireEvent.change(screen.getByLabelText('Description'), { target: { value: description } })
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: amount } })
  fireEvent.click(screen.getByRole('button', { name: 'Add transaction' }))
}

describe('advanced budget tracker', () => {
  it('adds, edits, and deletes a transaction while updating totals', () => {
    render(<App />)
    addTransaction('Pharmacy', '58')
    expect(screen.getByLabelText('Remaining cash $3,200')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Edit Pharmacy' }))
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '60' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(screen.getByLabelText('Remaining cash $3,198')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Delete Pharmacy' }))
    expect(screen.getByLabelText('Remaining cash $3,258')).toBeInTheDocument()
  })

  it('persists and restores budget state', () => {
    const first = render(<App />)
    addTransaction('Internet', '90')
    first.unmount()
    render(<App />)
    expect(screen.getByText('Internet')).toBeInTheDocument()
  })

  it('filters the ledger by query and category', () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'rent' } })
    expect(screen.getByText('Rent')).toBeInTheDocument()
    expect(screen.queryByText('Weekly market')).not.toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Search'), { target: { value: '' } })
    fireEvent.change(screen.getByLabelText('Category filter'), { target: { value: 'groceries' } })
    expect(screen.getByText('Weekly market')).toBeInTheDocument()
    expect(screen.queryByText('Rent')).not.toBeInTheDocument()
  })

  it('recovers safely from corrupt persisted data', () => {
    window.localStorage.setItem('circuit-advanced-budget-v1', '{broken')
    render(<App />)
    expect(screen.getByLabelText('Remaining cash $3,258')).toBeInTheDocument()
  })

  it('rejects invalid transactions', () => {
    render(<App />)
    addTransaction('', '2')
    expect(screen.getByRole('status')).toHaveTextContent('Enter a description, valid date, and an amount greater than $0.')
  })
})
