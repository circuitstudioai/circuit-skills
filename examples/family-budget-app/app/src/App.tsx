import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from './lib/supabase'
import './App.css'

type Category = { id: string; name: string; color: string; monthly_limit: number }
type Transaction = { id: string; category_id: string | null; created_by: string; description: string; amount: number; occurred_on: string; kind: 'expense' | 'income' }
type Goal = { id: string; name: string; target_amount: number; saved_amount: number; target_date: string | null }
type Member = { user_id: string; role: 'owner' | 'adult' | 'viewer'; profiles?: { display_name: string } | null }
type Household = { id: string; name: string; currency: string; invite_code: string }

const demoHousehold: Household = { id: 'demo-household', name: 'The Morgan Family', currency: 'USD', invite_code: 'TABLE42' }
const demoCategories: Category[] = [
  { id: 'home', name: 'Home', color: '#c56b3f', monthly_limit: 1800 },
  { id: 'food', name: 'Food', color: '#668c67', monthly_limit: 700 },
  { id: 'transport', name: 'Transport', color: '#477b91', monthly_limit: 400 },
  { id: 'fun', name: 'Fun', color: '#c7943e', monthly_limit: 350 },
]
const demoTransactions: Transaction[] = [
  { id: '1', category_id: 'home', created_by: 'sam', description: 'Mortgage', amount: 1420, occurred_on: '2026-08-02', kind: 'expense' },
  { id: '2', category_id: 'food', created_by: 'alex', description: 'Saturday groceries', amount: 164.38, occurred_on: '2026-08-24', kind: 'expense' },
  { id: '3', category_id: null, created_by: 'sam', description: 'Salary', amount: 5400, occurred_on: '2026-08-01', kind: 'income' },
  { id: '4', category_id: 'transport', created_by: 'alex', description: 'Fuel', amount: 58.2, occurred_on: '2026-08-22', kind: 'expense' },
]
const demoGoals: Goal[] = [{ id: 'goal-1', name: 'Family beach week', target_amount: 3200, saved_amount: 1840, target_date: '2027-06-01' }]
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured)
  const [household, setHousehold] = useState<Household | null>(isSupabaseConfigured ? null : demoHousehold)
  const [categories, setCategories] = useState<Category[]>(isSupabaseConfigured ? [] : demoCategories)
  const [transactions, setTransactions] = useState<Transaction[]>(isSupabaseConfigured ? [] : demoTransactions)
  const [goals, setGoals] = useState<Goal[]>(isSupabaseConfigured ? [] : demoGoals)
  const [members, setMembers] = useState<Member[]>(isSupabaseConfigured ? [] : [
    { user_id: 'sam', role: 'owner', profiles: { display_name: 'Sam' } },
    { user_id: 'alex', role: 'adult', profiles: { display_name: 'Alex' } },
  ])
  const [notice, setNotice] = useState(isSupabaseConfigured ? '' : 'Demo mode — connect Supabase to share this household live.')

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthReady(true) })
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session || !supabase) return
    void loadHousehold()
  }, [session])

  async function loadHousehold() {
    if (!supabase) return
    const { data: membership, error } = await supabase.from('household_members').select('household_id').limit(1).maybeSingle()
    if (error) return setNotice(error.message)
    if (!membership) return setHousehold(null)
    const id = membership.household_id
    const [home, categoryRows, transactionRows, goalRows, memberRows] = await Promise.all([
      supabase.from('households').select('id,name,currency,invite_code').eq('id', id).single(),
      supabase.from('categories').select('id,name,color,monthly_limit').eq('household_id', id).order('name'),
      supabase.from('transactions').select('id,category_id,created_by,description,amount,occurred_on,kind').eq('household_id', id).order('occurred_on', { ascending: false }),
      supabase.from('goals').select('id,name,target_amount,saved_amount,target_date').eq('household_id', id),
      supabase.from('household_members').select('user_id,role,profiles(display_name)').eq('household_id', id),
    ])
    if (home.error) return setNotice(home.error.message)
    setHousehold(home.data as Household); setCategories((categoryRows.data ?? []) as Category[])
    setTransactions((transactionRows.data ?? []) as Transaction[]); setGoals((goalRows.data ?? []) as Goal[])
    setMembers((memberRows.data ?? []) as unknown as Member[])
  }

  if (!authReady) return <main className="loading-screen">Setting the table…</main>
  if (isSupabaseConfigured && !session) return <AuthScreen notice={notice} setNotice={setNotice} />
  if (!household) return <HouseholdSetup onReady={loadHousehold} setNotice={setNotice} />

  return <Dashboard household={household} categories={categories} transactions={transactions} goals={goals} members={members} notice={notice}
    currentUser={session?.user.id ?? 'alex'} setTransactions={setTransactions} setGoals={setGoals} setNotice={setNotice} />
}

function AuthScreen({ notice, setNotice }: { notice: string; setNotice: (value: string) => void }) {
  const [email, setEmail] = useState('')
  async function signIn(event: FormEvent) {
    event.preventDefault(); if (!supabase) return
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } })
    setNotice(error ? error.message : 'Check your email for a secure sign-in link.')
  }
  return <main className="auth-shell"><section className="auth-card"><p className="eyebrow">Common Ground</p><h1>Money works better around one table.</h1><p>Plan the month, share the spending, and move toward family goals without turning finances into a spreadsheet meeting.</p><form onSubmit={signIn}><label htmlFor="email">Email address</label><input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /><button>Send my sign-in link</button></form><p role="status">{notice}</p></section></main>
}

function HouseholdSetup({ onReady, setNotice }: { onReady: () => Promise<void>; setNotice: (value: string) => void }) {
  const [name, setName] = useState(''); const [code, setCode] = useState('')
  async function call(method: 'create_household' | 'join_household', value: string) {
    if (!supabase || !value.trim()) return
    const args = method === 'create_household' ? { household_name: value } : { code: value }
    const { error } = await supabase.rpc(method, args)
    if (error) setNotice(error.message); else await onReady()
  }
  return <main className="setup-shell"><section><p className="eyebrow">Your household</p><h1>Who shares this money story?</h1><div className="setup-grid"><form onSubmit={(e) => { e.preventDefault(); void call('create_household', name) }}><h2>Start a household</h2><label htmlFor="household-name">Family or household name</label><input id="household-name" value={name} onChange={(e) => setName(e.target.value)} /><button>Create our space</button></form><form onSubmit={(e) => { e.preventDefault(); void call('join_household', code) }}><h2>Join your family</h2><label htmlFor="invite-code">Invite code</label><input id="invite-code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} /><button>Join household</button></form></div></section></main>
}

type DashboardProps = { household: Household; categories: Category[]; transactions: Transaction[]; goals: Goal[]; members: Member[]; notice: string; currentUser: string; setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>; setGoals: React.Dispatch<React.SetStateAction<Goal[]>>; setNotice: (value: string) => void }
function Dashboard({ household, categories, transactions, goals, members, notice, currentUser, setTransactions, setGoals, setNotice }: DashboardProps) {
  const [panel, setPanel] = useState<'transaction' | 'goal' | null>(null)
  const expenses = transactions.filter((item) => item.kind === 'expense').reduce((sum, item) => sum + Number(item.amount), 0)
  const income = transactions.filter((item) => item.kind === 'income').reduce((sum, item) => sum + Number(item.amount), 0)
  const categoryProgress = useMemo(() => categories.map((category) => ({ ...category, spent: transactions.filter((item) => item.kind === 'expense' && item.category_id === category.id).reduce((sum, item) => sum + Number(item.amount), 0) })), [categories, transactions])

  async function addTransaction(input: Omit<Transaction, 'id' | 'created_by'>) {
    const optimistic = { ...input, id: crypto.randomUUID(), created_by: currentUser }
    if (!supabase) return setTransactions((rows) => [optimistic, ...rows])
    const { data, error } = await supabase.from('transactions').insert({ ...input, household_id: household.id, created_by: currentUser }).select().single()
    if (error) setNotice(error.message); else setTransactions((rows) => [data as Transaction, ...rows])
  }
  async function removeTransaction(id: string) {
    if (supabase) { const { error } = await supabase.from('transactions').delete().eq('id', id); if (error) return setNotice(error.message) }
    setTransactions((rows) => rows.filter((item) => item.id !== id))
  }
  async function addGoal(input: Omit<Goal, 'id'>) {
    const optimistic = { ...input, id: crypto.randomUUID() }
    if (!supabase) return setGoals((rows) => [...rows, optimistic])
    const { data, error } = await supabase.from('goals').insert({ ...input, household_id: household.id }).select().single()
    if (error) setNotice(error.message); else setGoals((rows) => [...rows, data as Goal])
  }

  return <main className="app-shell">
    <header className="topbar"><div><p className="eyebrow">Common Ground</p><h1>{household.name}</h1></div><div className="family-stack" aria-label={`${members.length} household members`}>{members.map((member) => <span title={member.profiles?.display_name ?? member.role} key={member.user_id}>{(member.profiles?.display_name ?? '?').slice(0, 1)}</span>)}</div></header>
    {notice && <p className="notice" role="status">{notice}</p>}
    <section className="month-hero"><div><p>August’s breathing room</p><strong>{money.format(income - expenses)}</strong><small>{money.format(income)} in · {money.format(expenses)} out</small></div><blockquote>“A plan everyone can understand is a plan everyone can help keep.”</blockquote></section>
    <nav className="actions" aria-label="Quick actions"><button onClick={() => setPanel('transaction')}>＋ Add money move</button><button onClick={() => setPanel('goal')}>◎ New family goal</button><button onClick={() => navigator.clipboard?.writeText(household.invite_code)}>⌁ Copy invite {household.invite_code}</button></nav>
    <section className="content-grid"><div><div className="section-heading"><div><p className="eyebrow">The monthly plan</p><h2>Room in every envelope</h2></div><span>{money.format(categories.reduce((sum, item) => sum + Number(item.monthly_limit), 0))} planned</span></div><div className="envelopes">{categoryProgress.map((item) => { const percent = item.monthly_limit ? Math.min(100, item.spent / item.monthly_limit * 100) : 0; return <article className="envelope" key={item.id} style={{ '--accent': item.color } as React.CSSProperties}><div><h3>{item.name}</h3><strong>{money.format(item.monthly_limit - item.spent)}</strong><small>left of {money.format(item.monthly_limit)}</small></div><div className="meter"><i style={{ width: `${percent}%` }} /></div></article> })}</div></div>
      <aside className="goals"><p className="eyebrow">What we’re building toward</p><h2>Family goals</h2>{goals.map((goal) => { const percent = Math.min(100, Number(goal.saved_amount) / Number(goal.target_amount) * 100); return <article key={goal.id}><span>{Math.round(percent)}%</span><h3>{goal.name}</h3><p>{money.format(goal.saved_amount)} of {money.format(goal.target_amount)}</p><div className="goal-meter"><i style={{ width: `${percent}%` }} /></div></article> })}</aside></section>
    <section className="ledger"><div className="section-heading"><div><p className="eyebrow">Shared activity</p><h2>The kitchen-table ledger</h2></div></div><div className="ledger-list">{transactions.map((item) => <article key={item.id}><i style={{ background: categories.find((category) => category.id === item.category_id)?.color ?? '#2f5542' }} /><div><strong>{item.description}</strong><small>{item.occurred_on} · {members.find((member) => member.user_id === item.created_by)?.profiles?.display_name ?? 'Household'}</small></div><b className={item.kind}>{item.kind === 'income' ? '+' : '−'}{money.format(item.amount)}</b><button aria-label={`Delete ${item.description}`} onClick={() => void removeTransaction(item.id)}>×</button></article>)}</div></section>
    {panel === 'transaction' && <TransactionDialog categories={categories} close={() => setPanel(null)} save={addTransaction} />}
    {panel === 'goal' && <GoalDialog close={() => setPanel(null)} save={addGoal} />}
  </main>
}

function TransactionDialog({ categories, close, save }: { categories: Category[]; close: () => void; save: (input: Omit<Transaction, 'id' | 'created_by'>) => Promise<void> }) {
  const [description, setDescription] = useState(''); const [amount, setAmount] = useState(''); const [kind, setKind] = useState<'expense' | 'income'>('expense'); const [category, setCategory] = useState(categories[0]?.id ?? '')
  return <div className="scrim"><form className="dialog" onSubmit={(e) => { e.preventDefault(); void save({ description: description.trim(), amount: Number(amount), kind, category_id: kind === 'income' ? null : category, occurred_on: new Date().toISOString().slice(0, 10) }).then(close) }}><button type="button" className="close" onClick={close}>×</button><p className="eyebrow">Money move</p><h2>Add to the family ledger</h2><label htmlFor="move-description">What was it?</label><input id="move-description" required value={description} onChange={(e) => setDescription(e.target.value)} /><div className="split"><label>Type<select value={kind} onChange={(e) => setKind(e.target.value as 'expense' | 'income')}><option value="expense">Expense</option><option value="income">Income</option></select></label><label>Amount<input aria-label="Amount" type="number" min="0.01" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} /></label></div>{kind === 'expense' && <label>Envelope<select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}<button className="primary">Add to ledger</button></form></div>
}

function GoalDialog({ close, save }: { close: () => void; save: (input: Omit<Goal, 'id'>) => Promise<void> }) {
  const [name, setName] = useState(''); const [target, setTarget] = useState('')
  return <div className="scrim"><form className="dialog" onSubmit={(e) => { e.preventDefault(); void save({ name, target_amount: Number(target), saved_amount: 0, target_date: null }).then(close) }}><button type="button" className="close" onClick={close}>×</button><p className="eyebrow">Shared ambition</p><h2>What are we saving for?</h2><label>Goal name<input required value={name} onChange={(e) => setName(e.target.value)} /></label><label>Target amount<input type="number" min="1" required value={target} onChange={(e) => setTarget(e.target.value)} /></label><button className="primary">Create family goal</button></form></div>
}

export default App
