import { useState } from 'react'
import { dummyRekaPenerimaan } from '../data/dummyData'

const formatRp = (nilai) => 'Rp ' + Number(nilai).toLocaleString('id-ID')
const formatTglLabel = (str) => {
  if (!str) return ''
  const [y, m, d] = str.split('-')
  return `${d}/${m}/${y}`
}

export default function RekapPenerimaan() {
  const now = new Date()
  const todayStr  = now.toISOString().slice(0, 10)
  const awalBulan = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)

  const [dariTgl,   setDariTgl]   = useState(awalBulan)
  const [sampaiTgl, setSampaiTgl] = useState(todayStr)

  // Dummy data — tidak bergantung pada filter tanggal
  const data  = dummyRekaPenerimaan
  const total = data.reduce((sum, row) => sum + Number(row.nilai || 0), 0)

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.title}>Rekap Penerimaan</h2>
          <p style={styles.subtitle}>Data demo — fiktif untuk portofolio</p>
        </div>
        <div style={styles.filterRow}>
          <label style={styles.filterLabel}>Dari</label>
          <input type="date" value={dariTgl} max={sampaiTgl}
            onChange={e => setDariTgl(e.target.value)} style={styles.inputDate} />
          <label style={styles.filterLabel}>s/d</label>
          <input type="date" value={sampaiTgl} min={dariTgl} max={todayStr}
            onChange={e => setSampaiTgl(e.target.value)} style={styles.inputDate} />
          <button style={styles.btnRefresh}>🔄 Refresh</button>
        </div>
      </div>

      <div style={styles.cardTotal}>
        <p style={styles.cardLabel}>Total Penerimaan</p>
        <p style={styles.cardValue}>{formatRp(total)}</p>
        <p style={styles.cardSub}>
          {data.length} akun · {formatTglLabel(dariTgl)} – {formatTglLabel(sampaiTgl)}
        </p>
      </div>

      <div style={styles.tableWrap}>
        <div style={styles.tableScroll}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Kode Akun</th>
                <th style={styles.th}>Nama Akun</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Nilai (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                  <td style={styles.td}>{row.code}</td>
                  <td style={styles.td}>{row.name}</td>
                  <td style={{ ...styles.td, textAlign: 'right', fontWeight: '600', color: '#2e7d32' }}>
                    {formatRp(row.nilai)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} style={{ ...styles.td, fontWeight: '700', borderTop: '2px solid #e0e0e0' }}>TOTAL</td>
                <td style={{ ...styles.td, textAlign: 'right', fontWeight: '700', color: '#1a73e8', borderTop: '2px solid #e0e0e0' }}>
                  {formatRp(total)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container:   { padding: '4px' },
  headerRow:   { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' },
  title:       { fontSize: '20px', fontWeight: '700', color: '#222', marginBottom: '4px' },
  subtitle:    { fontSize: '12px', color: '#999' },
  filterRow:   { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
  filterLabel: { fontSize: '13px', color: '#555', fontWeight: '600' },
  inputDate:   { padding: '8px 10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', backgroundColor: '#fff' },
  btnRefresh:  { padding: '8px 14px', border: '1px solid #1a73e8', borderRadius: '8px', fontSize: '13px', color: '#1a73e8', background: '#fff', cursor: 'pointer', fontWeight: '600' },
  cardTotal:   { backgroundColor: '#e8f5e9', borderRadius: '12px', padding: '20px 24px', marginBottom: '20px', borderLeft: '4px solid #2e7d32' },
  cardLabel:   { fontSize: '12px', color: '#555', marginBottom: '6px' },
  cardValue:   { fontSize: '28px', fontWeight: '800', color: '#2e7d32', marginBottom: '4px' },
  cardSub:     { fontSize: '12px', color: '#888' },
  tableWrap:   { backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  tableScroll: { maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' },
  table:       { width: '100%', borderCollapse: 'collapse' },
  th:          { padding: '12px 16px', backgroundColor: '#1a73e8', fontSize: '12px', fontWeight: '700', color: '#fff', textAlign: 'left', borderBottom: '1px solid #1558b0', textTransform: 'uppercase', letterSpacing: '0.5px', position: 'sticky', top: 0, zIndex: 1 },
  td:          { padding: '11px 16px', fontSize: '14px', color: '#333', borderBottom: '1px solid #f0f0f0' },
  trEven:      { backgroundColor: '#fafafa' },
}
