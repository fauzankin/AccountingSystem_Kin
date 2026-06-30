import { useState } from 'react'
import { dummyRekapPengeluaran } from '../data/dummyData'

const formatRp = (nilai) => 'Rp ' + Number(nilai).toLocaleString('id-ID')
const formatTglLabel = (str) => {
  if (!str) return ''
  const [y, m, d] = str.split('-')
  return `${d}/${m}/${y}`
}

export default function RekapPengeluaran() {
  const now = new Date()
  const todayStr  = now.toISOString().slice(0, 10)
  const awalBulan = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)

  const [dariTgl,   setDariTgl]   = useState(awalBulan)
  const [sampaiTgl, setSampaiTgl] = useState(todayStr)

  const data   = dummyRekapPengeluaran
  const totals = {
    biaya:        data.reduce((s, r) => s + Number(r.total_biaya        || 0), 0),
    submision:    data.reduce((s, r) => s + Number(r.total_submision    || 0), 0),
    po:           data.reduce((s, r) => s + Number(r.total_po           || 0), 0),
    kasbesar:     data.reduce((s, r) => s + Number(r.total_kasbesar     || 0), 0),
    hutangvendor: data.reduce((s, r) => s + Number(r.total_hutangvendor || 0), 0),
  }

  const summaryCards = [
    { label: 'Total Biaya',         value: totals.biaya,        color: '#1565c0' },
    { label: 'Total Submisi',       value: totals.submision,    color: '#6a1b9a' },
    { label: 'Total PO',            value: totals.po,           color: '#e65100' },
    { label: 'Total Kas Besar',     value: totals.kasbesar,     color: '#2e7d32' },
    { label: 'Total Hutang Vendor', value: totals.hutangvendor, color: '#c62828' },
  ]

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.title}>Rekap Pengeluaran</h2>
          <p style={styles.subtitle}>{formatTglLabel(dariTgl)} – {formatTglLabel(sampaiTgl)}</p>
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

      <div style={styles.summaryBox}>
        <p style={styles.summaryTitle}>Ringkasan {formatTglLabel(dariTgl)} – {formatTglLabel(sampaiTgl)}</p>
        {summaryCards.map((c) => (
          <div key={c.label} style={styles.summaryRow}>
            <span style={{ ...styles.summaryLabel, color: c.color }}>{c.label}</span>
            <span style={{ ...styles.summaryValue, color: c.color }}>{formatRp(c.value)}</span>
          </div>
        ))}
      </div>

      <div style={styles.tableWrap}>
        <div style={styles.tableScroll}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Kode Akun</th>
                <th style={styles.th}>Nama Akun</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Biaya</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Submisi</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>PO</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Kas Besar</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Hutang Vendor</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                  <td style={styles.td}>{row.code}</td>
                  <td style={styles.td}>{row.name}</td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>{formatRp(row.total_biaya)}</td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>{formatRp(row.total_submision)}</td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>{formatRp(row.total_po)}</td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>{formatRp(row.total_kasbesar)}</td>
                  <td style={{ ...styles.td, textAlign: 'right', color: '#c62828', fontWeight: '600' }}>{formatRp(row.total_hutangvendor)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#fafafa' }}>
                <td colSpan={2} style={{ ...styles.td, fontWeight: '700', borderTop: '2px solid #e0e0e0' }}>TOTAL</td>
                <td style={{ ...styles.td, textAlign: 'right', fontWeight: '700', color: '#1565c0', borderTop: '2px solid #e0e0e0' }}>{formatRp(totals.biaya)}</td>
                <td style={{ ...styles.td, textAlign: 'right', fontWeight: '700', color: '#6a1b9a', borderTop: '2px solid #e0e0e0' }}>{formatRp(totals.submision)}</td>
                <td style={{ ...styles.td, textAlign: 'right', fontWeight: '700', color: '#e65100', borderTop: '2px solid #e0e0e0' }}>{formatRp(totals.po)}</td>
                <td style={{ ...styles.td, textAlign: 'right', fontWeight: '700', color: '#2e7d32', borderTop: '2px solid #e0e0e0' }}>{formatRp(totals.kasbesar)}</td>
                <td style={{ ...styles.td, textAlign: 'right', fontWeight: '700', color: '#c62828', borderTop: '2px solid #e0e0e0' }}>{formatRp(totals.hutangvendor)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container:    { padding: '4px' },
  headerRow:    { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' },
  title:        { fontSize: '20px', fontWeight: '700', color: '#222', marginBottom: '4px' },
  subtitle:     { fontSize: '12px', color: '#999' },
  filterRow:    { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
  filterLabel:  { fontSize: '13px', color: '#555', fontWeight: '600' },
  inputDate:    { padding: '8px 10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', backgroundColor: '#fff' },
  btnRefresh:   { padding: '8px 14px', border: '1px solid #c62828', borderRadius: '8px', fontSize: '13px', color: '#c62828', background: '#fff', cursor: 'pointer', fontWeight: '600' },
  summaryBox:   { backgroundColor: '#fff', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  summaryTitle: { fontSize: '11px', color: '#999', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  summaryRow:   { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', marginBottom: '10px', borderBottom: '1px solid #f0f0f0' },
  summaryLabel: { fontSize: '14px', fontWeight: '600' },
  summaryValue: { fontSize: '14px', fontWeight: '700' },
  tableWrap:    { backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  tableScroll:  { maxHeight: 'calc(100vh - 320px)', overflowY: 'auto' },
  table:        { width: '100%', borderCollapse: 'collapse' },
  th:           { padding: '12px 16px', backgroundColor: '#1a73e8', fontSize: '12px', fontWeight: '700', color: '#fff', textAlign: 'left', borderBottom: '1px solid #1558b0', textTransform: 'uppercase', letterSpacing: '0.5px', position: 'sticky', top: 0, zIndex: 1 },
  td:           { padding: '11px 16px', fontSize: '14px', color: '#333', borderBottom: '1px solid #f0f0f0' },
  trEven:       { backgroundColor: '#fafafa' },
}
