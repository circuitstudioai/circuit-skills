import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Category = {
  id: string
  name: string
  budget: number
}

type Expense = {
  id: number
  categoryId: string
  description: string
  amount: number
}

const categories: Category[] = [
  { id: 'housing', name: 'Housing', budget: 1800 },
  { id: 'groceries', name: 'Groceries', budget: 650 },
  { id: 'transport', name: 'Transport', budget: 320 },
  { id: 'flex', name: 'Flex spending', budget: 500 },
]

const starterExpenses: Expense[] = [
  { id: 1, categoryId: 'housing', description: 'Rent', amount: 1800 },
  { id: 2, categoryId: 'groceries', description: 'Weekly market', amount: 142 },
]

const currency = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  maximumFractionDigits: 0,
  style: 'currency',
})

function App() {
  const [income, setIncome] = useState(5200)
  const [expenses, setExpenses] = useState<Expense[]>(starterExpenses)
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState(categories[1].id)
  const [amount, setAmount] = useState('')
  const [formError, setFormError] = useState('')

  const totalBudget = categories.reduce((sum, category) => sum + category.budget, 0)
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const remainingCash = income - totalSpent
  const unplannedCash = income - totalBudget

  const categoryRows = useMemo(
    () =>
      categories.map((category) => {
        const spent = expenses
          .filter((expense) => expense.categoryId === category.id)
          .reduce((sum, expense) => sum + expense.amount, 0)
        const remaining = category.budget - spent

        return {
          ...category,
          remaining,
          spent,
        }
      }),
    [expenses],
  )

  function addExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsedAmount = Number(amount)
    const trimmedDescription = description.trim()

    if (!trimmedDescription || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setFormError('Enter a description and an amount greater than $0.')
      return
    }

    setExpenses((current) => [
      {
        amount: parsedAmount,
        categoryId,
        description: trimmedDescription,
        id: Date.now(),
      },
      ...current,
    ])
    setDescription('')
    setAmount('')
    setFormError('')
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to budget dashboard
      </a>
      <main className="budget-shell" id="main-content">
      <section className="budget-header" aria-labelledby="budget-title">
        <div>
          <p className="eyebrow">Personal budget</p>
          <h1 id="budget-title">Monthly money map</h1>
        </div>
        <label className="income-control" htmlFor="monthly-income">
          <span>Monthly income</span>
          <input
            id="monthly-income"
            autoComplete="off"
            inputMode="decimal"
            min="0"
            name="monthly-income"
            type="number"
            value={income}
            onChange={(event) => setIncome(Number(event.target.value))}
          />
        </label>
      </section>

      <section className="summary-grid" aria-label="Budget summary">
        <div>
          <span>Remaining cash</span>
          <strong aria-label={`Remaining cash ${currency.format(remainingCash)}`} aria-live="polite">
            {currency.format(remainingCash)}
          </strong>
        </div>
        <div>
          <span>Spent so far</span>
          <strong>{currency.format(totalSpent)}</strong>
        </div>
        <div>
          <span>Budgeted</span>
          <strong>{currency.format(totalBudget)}</strong>
        </div>
        <div className={unplannedCash >= 0 ? 'good' : 'bad'}>
          <span>Unplanned cash</span>
          <strong>{currency.format(unplannedCash)}</strong>
        </div>
      </section>

      <section className="tracker-grid">
        <div className="category-ledger" aria-label="Budget categories">
          {categoryRows.map((category) => (
            <article
              className={category.remaining < 0 ? 'category over' : 'category'}
              key={category.id}
            >
              <div>
                <h2>{category.name}</h2>
                <p>
                  {currency.format(category.spent)} spent of{' '}
                  {currency.format(category.budget)}
                </p>
              </div>
              <strong>
                {category.remaining < 0
                  ? `${currency.format(Math.abs(category.remaining))} over`
                  : `${currency.format(category.remaining)} left`}
              </strong>
            </article>
          ))}
        </div>

        <aside className="expense-panel" aria-label="Add expense">
          <form onSubmit={addExpense}>
            <h2>Add expense</h2>
            <label htmlFor="expense-description">Description</label>
            <input
              id="expense-description"
              autoComplete="off"
              name="expense-description"
              placeholder="Example: Coffee, utility bill, train pass…"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />

            <label htmlFor="expense-category">Category</label>
            <select
              id="expense-category"
              autoComplete="off"
              name="expense-category"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label htmlFor="expense-amount">Amount</label>
            <input
              id="expense-amount"
              autoComplete="off"
              inputMode="decimal"
              min="0.01"
              name="expense-amount"
              placeholder="Example: 85.00…"
              step="0.01"
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />

            <p className="form-error" role="status" aria-live="polite">
              {formError}
            </p>

            <button type="submit">Add expense</button>
          </form>

          <div className="recent-expenses">
            <h2>Recent expenses</h2>
            <ul>
              {expenses.slice(0, 5).map((expense) => {
                const category = categories.find((item) => item.id === expense.categoryId)

                return (
                  <li key={expense.id}>
                    <span>
                      {expense.description}
                      <small>{category?.name}</small>
                    </span>
                    <strong>{currency.format(expense.amount)}</strong>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>
      </section>
      </main>
    </>
  )
}

export default App
