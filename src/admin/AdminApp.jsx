import { useState } from 'react'
import AdminLogin from './AdminLogin'
import StatsPanel from './StatsPanel'
import FeedbackPanel from './FeedbackPanel'
import FinancialsPanel from './FinancialsPanel'
import GalleryPanel from './GalleryPanel'
import ChatPanel from './ChatPanel'
import BillingPanel from './BillingPanel'

const TABS = [
  { key: 'stats', label: 'Overview', Component: StatsPanel },
  { key: 'chat', label: 'Chat', Component: ChatPanel },
  { key: 'feedback', label: 'Feedback', Component: FeedbackPanel },
  { key: 'financials', label: 'Financials', Component: FinancialsPanel },
  { key: 'billing', label: 'Billing', Component: BillingPanel },
  { key: 'gallery', label: 'Gallery', Component: GalleryPanel },
]

export default function AdminApp() {
  const [token, setToken] = useState(() => sessionStorage.getItem('gn-tech-admin-token'))
  const [activeTab, setActiveTab] = useState('stats')

  function handleLogout() {
    sessionStorage.removeItem('gn-tech-admin-token')
    setToken(null)
  }

  if (!token) {
    return <AdminLogin onLogin={setToken} />
  }

  const ActiveComponent = TABS.find((t) => t.key === activeTab).Component

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <strong>GN Tech Solutions — Admin</strong>
        <button className="admin-logout-btn" onClick={handleLogout}>Log Out</button>
      </header>
      <nav className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`admin-tab${activeTab === t.key ? ' active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="admin-content">
        <ActiveComponent token={token} />
      </main>
    </div>
  )
}
