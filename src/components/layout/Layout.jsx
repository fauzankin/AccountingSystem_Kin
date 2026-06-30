// ============================================================
//  Layout.jsx — Routing Halaman
// ============================================================

import { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

import RekapPenerimaan   from '../../pages/Rekappenerimaan'
import RekapPengeluaran  from '../../pages/Rekappengeluaran'
import MasterAccountCode from '../../pages/master/AccountCode'
import MasterData        from '../../pages/master/MasterData'
import CoaPendapatan     from '../../pages/penerimaan/CoaPendapatan'
import CoaBeban          from '../../pages/pengeluaran/CoaBeban'
import LabaRugi          from '../../pages/LabaRugi'
import Penyusutan        from '../../pages/Penyusutan'
import Neraca            from '../../pages/Neraca'
import Dashboard         from '../../pages/Dashboard'
import Overhead from '../../pages/Overhead'
import RekapAngsuranAktiva from '../../pages/pengeluaran/RekapAngsuranAktiva'


const pages = {
  'dashboard': <Dashboard />,
  'penerimaan-rekap': <RekapPenerimaan />,
  'penerimaan-rekap':     <RekapPenerimaan />,
  'pengeluaran-rekap':    <RekapPengeluaran />,
  'master-account-code':  <MasterAccountCode />,
  'master-group-account': <MasterData type="groups" />,
  'master-customer':      <MasterData type="customers" />,
  'master-vendor':        <MasterData type="vendors" />,
  'coa-pendapatan':       <CoaPendapatan />,
  'coa-beban':            <CoaBeban />,
  'laba-rugi':            <LabaRugi />,
  'penyusutan':           <Penyusutan />,
  'neraca':               <Neraca />,
  'overhead':             <Overhead />,
  'angsuran-aktiva':      <RekapAngsuranAktiva />,

}

export default function Layout({ onLogout, user }) {
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const [darkMode, setDarkMode]         = useState(false)

  const currentPage = pages[activePage] || (
    <div style={{ padding: '32px' }}>
      <h2 style={{ fontSize: '18px', color: darkMode ? '#aaa' : '#555' }}>
        🚧 Halaman ini belum dibuat
      </h2>
      <p style={{ marginTop: '8px', fontSize: '14px', color: '#aaa' }}>
        Buat file komponen di <code>src/pages/</code>, lalu daftarkan di <code>Layout.jsx</code>
      </p>
    </div>
  )

  const handleNavigate = (path) => {
    setActivePage(path)
    setSidebarOpen(false) // tutup sidebar otomatis di mobile setelah navigasi
  }

  return (
    <div className={`app-container${darkMode ? ' dark' : ''}`}>
      {/* Overlay untuk mobile — klik di luar sidebar untuk tutup */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />

      <div className="main-content">
        <Navbar
          activePage={activePage}
          onLogout={onLogout}
          user={user}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(d => !d)}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
        />
        <main className="page-content">
          {currentPage}
        </main>
      </div>
    </div>
  )
}
