import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Category = { id: string; name: string; budget: number }
type Transaction = { id: string; categoryId: string; description: string; amount: number; date: string }
type BudgetState = { income: number; transactions: Transaction[] }

const STORAGE_KEY = 'circuit-advanced-budget-v1'
const categories: Category[] = [
  { id: 'housing', name: 'Housing', budget: 1800 },
  { id: 'groceries', name: 'Groceries', budget: 650 },
  { id: 'transport', name: 'Transport', budget: 320 },
  { id: 'flex', name: 'Flex spending', budget: 500 },
]
const starterTransactions: Transaction[] = [
  { id: 'rent', categoryId: 'housing', description: 'Rent', amount: 1800, date: '2026-08-01' },
  { id: 'market', categoryId: 'groceries', description: 'Weekly market', amount: 142, date: '2026-08-06' },
]
const currency = new Intl.NumberFormat('en-US', { currency: 'USD', maximumFractionDigits: 0, style: 'currency' })

function loadState(): BudgetState {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '') as Partial<BudgetState>
    if (!Number.isFinite(parsed.income) || !Array.isArray(parsed.transactions)) throw new Error('invalid')
    return { income: parsed.income as number, transactions: parsed.transactions as Transaction[] }
  } catch {
    return { income: 5200, transactions: starterTransactions }
  }
}

function App() {
  const [initial] = useState(loadState)
  const [income, setIncome] = useState(initial.income)
  const [transactions, setTransactions] = useState<Transaction[]>(initial.transactions)
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('groceries')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('2026-08-28')
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ income, transactions }))
  }, [income, transactions])

  const totalBudget = categories.reduce((sum, item) => sum + item.budget, 0)
  const totalSpent = transactions.reduce((sum, item) => sum + item.amount, 0)
  const categoryRows = useMemo(() => categories.map((category) => {
    const spent = transactions.filter((item) => item.categoryId === category.id).reduce((sum, item) => sum + item.amount, 0)
    return { ...category, spent, remaining: category.budget - spent }
  }), [transactions])
  const filtered = useMemo(() => transactions.filter((item) => {
    const categoryMatch = categoryFilter === 'all' || item.categoryId === categoryFilter
    return categoryMatch && item.description.toLowerCase().includes(query.trim().toLowerCase())
  }).sort((a, b) => b.date.localeCompare(a.date)), [transactions, categoryFilter, query])

  function resetForm() {
    setDescription(''); setAmount(''); setEditingId(null); setFormError('')
  }

  function saveTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsedAmount = Number(amount)
    if (!description.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0 || !date) {
      setFormError('Enter a description, valid date, and an amount greater than $0.')
      return
    }
    const next = { id: editingId ?? crypto.randomUUID(), categoryId, description: description.trim(), amount: parsedAmount, date }
    setTransactions((current) => editingId ? current.map((item) => item.id === editingId ? next : item) : [next, ...current])
    resetForm()
  }

  function editTransaction(item: Transaction) {
    setEditingId(item.id); setDescription(item.description); setCategoryId(item.categoryId); setAmount(String(item.amount)); setDate(item.date)
  }

  function exportCsv() {
    const rows = ['date,description,category,amount', ...transactions.map((item) =>
      [item.date, `"${item.description.replaceAll('"', '""')}"`, item.categoryId, item.amount].join(','))]
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([rows.join('\n')], { type: 'text/csv' }))
    link.download = 'budget-transactions.csv'; link.click(); URL.revokeObjectURL(link.href)
  }

  return <main className="budget-shell">
    <section className="budget-header">
      <div><p className="eyebrow">Reference run 002</p><h1>Advanced money map</h1></div>
      <label className="income-control">Monthly income<input aria-label="Monthly income" type="number" min="0" value={income} onChange={(event) => setIncome(Number(event.target.value))} /></label>
    </section>
    <section className="summary-grid" aria-label="Budget summary">
      <div><span>Remaining cash</span><strong aria-label={`Remaining cash ${currency.format(income - totalSpent)}`}>{currency.format(income - totalSpent)}</strong></div>
      <div><span>Spent</span><strong>{currency.format(totalSpent)}</strong></div>
      <div><span>Budgeted</span><strong>{currency.format(totalBudget)}</strong></div>
      <div className={income - totalBudget >= 0 ? 'good' : 'bad'}><span>Unplanned</span><strong>{currency.format(income - totalBudget)}</strong></div>
    </section>
    <section className="tracker-grid">
      <div className="category-ledger">
        {categoryRows.map((item) => <article className={item.remaining < 0 ? 'category over' : 'category'} key={item.id}>
          <div><h2>{item.name}</h2><p>{currency.format(item.spent)} spent of {currency.format(item.budget)}</p></div>
          <strong>{item.remaining < 0 ? `${currency.format(-item.remaining)} over` : `${currency.format(item.remaining)} left`}</strong>
        </article>)}
      </div>
      <aside className="expense-panel">
        <form onSubmit={saveTransaction}>
          <h2>{editingId ? 'Edit transaction' : 'Add transaction'}</h2>
          <label htmlFor="description">Description</label><input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label htmlFor="category">Category</label><select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
          <label htmlFor="amount">Amount</label><input id="amount" type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <label htmlFor="date">Date</label><input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <p className="form-error" role="status">{formError}</p>
          <button type="submit">{editingId ? 'Save changes' : 'Add transaction'}</button>{editingId && <button type="button" onClick={resetForm}>Cancel edit</button>}
        </form>
      </aside>
    </section>
    <section className="expense-panel" aria-labelledby="ledger-title">
      <h2 id="ledger-title">Transaction ledger</h2>
      <label htmlFor="search">Search</label><input id="search" value={query} onChange={(e) => setQuery(e.target.value)} />
      <label htmlFor="filter">Category filter</label><select id="filter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option value="all">All categories</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
      <button type="button" onClick={exportCsv}>Export CSV</button>
      <ul>{filtered.map((item) => <li key={item.id}><span>{item.description}<small>{item.date} · {categories.find((category) => category.id === item.categoryId)?.name}</small></span><strong>{currency.format(item.amount)}</strong><button type="button" onClick={() => editTransaction(item)}>Edit {item.description}</button><button type="button" onClick={() => setTransactions((current) => current.filter((row) => row.id !== item.id))}>Delete {item.description}</button></li>)}</ul>
      {!filtered.length && <p>No transactions match these filters.</p>}
    </section>
  </main>
}

export default App
