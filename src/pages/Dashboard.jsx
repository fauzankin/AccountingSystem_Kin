import { dummyDashboard } from '../data/dummyData'

const formatRp = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID')

export default function Dashboard() {
  const now = new Date()
  const namaBulan = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
  const hariIni   = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  const { penerimaan, pengeluaran } = dummyDashboard
  const selisih = penerimaan - pengeluaran

  return (
    <div style={s.container}>
      {/* ── Hero ── */}
      <div style={s.hero}>
        <img src="/LogoLima.png" alt="Logo PT Nusantara Logistik Trans" style={s.heroLogo} />
        <h1 style={s.heroTitle}>PT Nusantara Logistik Trans</h1>
        <p style={s.heroSub}>Finance & Accounting System</p>
        <p style={s.heroDate}>{hariIni}</p>
      </div>

      {/* ── Demo Notice ── */}
      <div style={s.demoNotice}>
        🎯 <strong>Demo Mode</strong> — Semua data di bawah adalah contoh fiktif untuk keperluan portofolio.
      </div>

      {/* ── Kartu Ringkasan ── */}
      <p style={s.sectionLabel}>Ringkasan {namaBulan}</p>

      <div style={s.cards}>
        <div style={{...s.card, borderTop: '4px solid #2e7d32'}}>
          <div style={s.cardIcon}>💰</div>
          <p style={s.cardLabel}>Total Penerimaan</p>
          <p style={{...s.cardValue, color: '#2e7d32'}}>{formatRp(penerimaan)}</p>
          <p style={s.cardSub}>Bulan ini</p>
        </div>

        <div style={{...s.card, borderTop: '4px solid #c62828'}}>
          <div style={s.cardIcon}>💸</div>
          <p style={s.cardLabel}>Total Pengeluaran</p>
          <p style={{...s.cardValue, color: '#c62828'}}>{formatRp(pengeluaran)}</p>
          <p style={s.cardSub}>Bulan ini</p>
        </div>

        <div style={{...s.card, borderTop: `4px solid ${selisih >= 0 ? '#1a73e8' : '#e65100'}`}}>
          <div style={s.cardIcon}>{selisih >= 0 ? '📈' : '📉'}</div>
          <p style={s.cardLabel}>Selisih</p>
          <p style={{...s.cardValue, color: selisih >= 0 ? '#1a73e8' : '#e65100'}}>
            {selisih < 0 ? '- ' : ''}{formatRp(Math.abs(selisih))}
          </p>
          <p style={s.cardSub}>{selisih >= 0 ? 'Surplus' : 'Defisit'}</p>
        </div>
      </div>

      {/* ── Footer info ── */}
      <div style={s.footer}>
        <p>Gunakan menu di sidebar untuk melihat detail penerimaan dan pengeluaran.</p>
      </div>
    </div>
  )
}

const s = {
  container: { padding: '8px', maxWidth: '900px', margin: '0 auto' },
  hero: {
    textAlign: 'center',
    padding: '48px 24px 36px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    marginBottom: '16px',
  },
  heroLogo:  { width: '100px', height: 'auto', marginBottom: '16px' },
  heroTitle: { fontSize: '26px', fontWeight: '800', color: '#1a73e8', marginBottom: '6px' },
  heroSub:   { fontSize: '15px', color: '#555', marginBottom: '10px' },
  heroDate:  { fontSize: '13px', color: '#aaa' },
  demoNotice: {
    backgroundColor: '#fff8e1',
    border: '1px solid #ffe082',
    borderRadius: '10px',
    padding: '10px 16px',
    fontSize: '13px',
    color: '#795548',
    marginBottom: '20px',
    textAlign: 'center',
  },
  sectionLabel: { fontSize: '13px', fontWeight: '700', color: '#888', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '28px',
  },
  card:      { backgroundColor: '#fff', borderRadius: '12px', padding: '24px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' },
  cardIcon:  { fontSize: '28px', marginBottom: '12px' },
  cardLabel: { fontSize: '12px', color: '#888', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' },
  cardValue: { fontSize: '22px', fontWeight: '800', marginBottom: '4px' },
  cardSub:   { fontSize: '12px', color: '#aaa' },
  footer:    { textAlign: 'center', padding: '20px', fontSize: '13px', color: '#bbb', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' },
}
