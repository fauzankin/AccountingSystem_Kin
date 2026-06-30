import { useState } from 'react'
import logoNLT from '../../assets/LogoNLT.svg'

const menuItems = [
  {
    label: 'Dashboard',
    icon: '🏠',
    path: 'dashboard',
  },
  {
    label: 'Master Code',
    icon: '🗂️',
    path: 'master-code',
    children: [
      { label: 'Account Code', path: 'master-account-code' },
      { label: 'Customer',     path: 'master-customer' },
      { label: 'Vendor',       path: 'master-vendor' },
    ]
  },
  {
    label: 'Penerimaan',
    icon: '💰',
    path: 'penerimaan',
    children: [
      { label: 'COA Pendapatan',   path: 'coa-pendapatan' },
      { label: 'Rekap Penerimaan', path: 'penerimaan-rekap' },
    ]
  },
  {
    label: 'Pengeluaran',
    icon: '💸',
    path: 'pengeluaran',
    children: [
      { label: 'Overhead',           path: 'overhead' },
      { label: 'COA Beban',          path: 'coa-beban' },
      { label: 'Rekap Pengeluaran',  path: 'pengeluaran-rekap' },
      { label: 'Rekap Angsuran Aktiva', path: 'angsuran-aktiva'}
    ]
  },
  {
    label: 'Laporan',
    icon: '📊',
    path: 'laporan',
    children: [
      { label: 'Neraca', path: 'neraca' },
      { label: 'Laba Rugi', path: 'laba-rugi' },
      { label: 'Aktiva & Penyusutan', path: 'penyusutan' },
    ]
  }
]

export default function Sidebar({ activePage, onNavigate, isOpen, onClose, darkMode }) {
  const [openMenus, setOpenMenus] = useState(['master-code'])

  const toggleMenu = (path) => {
    setOpenMenus(prev =>
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    )
  }

  // Warna berdasarkan dark mode
  const c = {
    bg:          darkMode ? '#1e1e2e' : '#ffffff',
    border:      darkMode ? '#2e2e3e' : '#e0e0e0',
    logoBorder:  darkMode ? '#2e2e3e' : '#f0f0f0',
    text:        darkMode ? '#cdd6f4' : '#444',
    textActive:  darkMode ? '#89b4fa' : '#1a73e8',
    bgActive:    darkMode ? '#313244' : '#f0f7ff',
    subText:     darkMode ? '#a6adc8' : '#666',
    subBorder:   darkMode ? '#313244' : '#eee',
    closeBtn:    darkMode ? '#a6adc8' : '#999',
    logoColor:   darkMode ? '#89b4fa' : '#1a73e8',
  }

  return (
    <aside className={`sidebar${isOpen ? ' sidebar-open' : ''}`} style={{ backgroundColor: c.bg, borderRight: `1px solid ${c.border}` }}>
      {/* ── HEADER: Logo + tombol tutup (mobile) ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 20px', borderBottom: `1px solid ${c.logoBorder}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={logoNLT} alt="Logo NLT Logistik" style={{ width: '35px', height: 'auto' }} />
          <span style={{ fontSize: '16px', fontWeight: '800', color: c.logoColor, whiteSpace: 'nowrap' }}>
            NLT Logistik
          </span>
        </div>
        {/* Tombol tutup — hanya tampil di mobile */}
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: c.closeBtn,
            lineHeight: 1,
            padding: '4px',
          }}
          title="Tutup sidebar"
        >
          ✕
        </button>
      </div>

      {/* ── NAVIGASI ── */}
      <nav style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', flex: 1 }}>
        {menuItems.map((item) => {
          const hasChildren = item.children?.length > 0
          const isOpen      = openMenus.includes(item.path)
          const isActive    = activePage === item.path

          return (
            <div key={item.path}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background 0.2s, color 0.2s',
                  backgroundColor: isActive ? c.bgActive : 'transparent',
                  color: isActive ? c.textActive : c.text,
                }}
                onClick={() => hasChildren ? toggleMenu(item.path) : onNavigate(item.path)}
              >
                <span style={{ marginRight: '12px', fontSize: '18px' }}>{item.icon}</span>
                <span style={{ flex: 1, fontWeight: isActive ? '600' : '400' }}>{item.label}</span>
                {hasChildren && (
                  <span style={{ fontSize: '10px', opacity: 0.6 }}>{isOpen ? '▲' : '▼'}</span>
                )}
              </div>

              {hasChildren && isOpen && (
                <div style={{ marginLeft: '35px', borderLeft: `1px solid ${c.subBorder}`, marginTop: '4px', marginBottom: '8px' }}>
                  {item.children.map(child => {
                    const childActive = activePage === child.path
                    return (
                      <div
                        key={child.path}
                        style={{
                          padding: '8px 20px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          borderRadius: '0 8px 8px 0',
                          transition: 'color 0.2s',
                          color: childActive ? c.textActive : c.subText,
                          fontWeight: childActive ? '600' : '400',
                          backgroundColor: childActive ? c.bgActive : 'transparent',
                        }}
                        onClick={() => onNavigate(child.path)}
                      >
                        {child.label}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
