import Layout from './components/layout/Layout'
import './index.css'

// Demo mode: langsung masuk dashboard tanpa login
// Backend tidak dibutuhkan — semua data adalah dummy fiktif
const DEMO_USER = { name: 'Demo User', role: 'admin' }

export default function App() {
  // Tidak ada state login — selalu authenticated sebagai demo user
  const handleLogout = () => {
    // Pada demo mode, logout hanya reload halaman
    window.location.reload()
  }

  return (
    <Layout onLogout={handleLogout} user={DEMO_USER} />
  )
}
