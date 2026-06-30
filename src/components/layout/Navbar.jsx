const pageTitles = {
  'dashboard':             'Dashboard',
  'pemasukan-tambah':      'Tambah Pemasukan',
  'pemasukan-riwayat':     'Riwayat Pemasukan',
  'pengeluaran-tambah':    'Tambah Pengeluaran',
  'pengeluaran-riwayat':   'Riwayat Pengeluaran',
  'laporan-bulanan':       'Laporan Bulanan',
  'pengaturan':            'Pengaturan',
  'penerimaan-rekap':      'Rekap Penerimaan',
  'pengeluaran-rekap':     'Rekap Pengeluaran',
  'master-account-code':   'Master Account Code',
  'master-group-account':  'Master Group Account',
  'master-customer':       'Master Customer',
  'master-vendor':         'Master Vendor',
  'coa-pendapatan':        'COA Pendapatan',
  'coa-beban':             'COA Beban',
  'laba-rugi':             'Laba Rugi',
  'penyusutan':            'Aktiva & Penyusutan',
  'neraca':                'Neraca',
}

export default function Navbar({ activePage, onLogout, user, darkMode, onToggleDark, onToggleSidebar }) {
  const pageTitle = pageTitles[activePage] || 'Halaman'
  const inisial   = user?.name ? user.name.charAt(0).toUpperCase() : 'U'

  const c = {
    bg:      darkMode ? '#181825' : '#ffffff',
    border:  darkMode ? '#2e2e3e' : '#e0e0e0',
    title:   darkMode ? '#cdd6f4' : '#222',
    date:    darkMode ? '#6c7086' : '#777',
    iconBtn: darkMode ? '#cdd6f4' : '#333',
    logout:  '#e53935',
  }

  return (
    <header style={{
      height: '60px',
      backgroundColor: c.bg,
      borderBottom: `1px solid ${c.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      transition: 'background 0.3s',
      gap: '12px',
    }}>

      {/* Kiri: hamburger + judul halaman */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        {/* Tombol hamburger — selalu tampil */}
        <button
          onClick={onToggleSidebar}
          title="Toggle sidebar"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '22px',
            color: c.iconBtn,
            lineHeight: 1,
            padding: '4px',
            flexShrink: 0,
          }}
        >
          ☰
        </button>
        <h1 style={{
          fontSize: '17px',
          fontWeight: '600',
          color: c.title,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {pageTitle}
        </h1>
      </div>

      {/* Kanan: tanggal, dark mode, notif, logout, avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>

        {/* Tanggal — sembunyikan di layar kecil lewat CSS */}
        <span className="navbar-date" style={{ fontSize: '13px', color: c.date }}>
          {new Date().toLocaleDateString('id-ID', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          })}
        </span>

        {/* Toggle Dark Mode */}
        <button
          onClick={onToggleDark}
          title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: c.iconBtn,
            lineHeight: 1,
            padding: '4px',
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Notifikasi */}
        <button
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: c.iconBtn, padding: '4px' }}
          title="Notifikasi"
        >
          🔔
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          style={{
            padding: '6px 14px',
            backgroundColor: 'transparent',
            border: `1px solid ${c.logout}`,
            borderRadius: '8px',
            color: c.logout,
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          title="Logout"
        >
          Keluar
        </button>

        {/* Avatar */}
        <div
          title={user?.name || 'Profil'}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: '#1a73e8',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {inisial}
        </div>
      </div>
    </header>
  )
}
