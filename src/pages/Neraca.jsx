import { useState } from 'react'
import { dummyNeraca } from '../data/dummyData'

const formatRp = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID')

export default function Neraca() {
  const tahunSekarang = new Date().getFullYear()
  const [tahun, setTahun] = useState(String(tahunSekarang))
  const listTahun = Array.from({ length: 5 }, (_, i) => String(tahunSekarang - i))

  // Dummy data — tidak ada fetch ke backend
  const data = dummyNeraca

  const totalHartaLancar = data.harta_lancar.reduce((s, d) => s + Number(d.nilai || 0), 0)
  const totalHartaTetap = data.harta_tetap.reduce((s, d) => d.negatif ? s - Number(d.nilai || 0) : s + Number(d.nilai || 0), 0)
  const totalHarta = totalHartaLancar + totalHartaTetap
  const totalKewajiban = data.kewajiban.reduce((s, d) => s + Number(d.nilai || 0), 0)
  const totalModal = data.modal.reduce((s, d) => s + Number(d.nilai || 0), 0)
  const totalKewajibanModal = totalKewajiban + totalModal

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.headerRow}>
        <div>
          <h2 style={s.title}>Neraca</h2>
          <p style={s.subtitle}>PT Nusantara Logistik Trans</p>
        </div>
        <div style={s.filterRow}>
          <select value={tahun} onChange={e => setTahun(e.target.value)} style={s.select}>
            {listTahun.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div style={s.reportCard}>
        {/* Judul */}
        <div style={s.reportHeader}>
          <div style={s.reportCompany}>PT NUSANTARA LOGISTIK TRANS</div>
          <div style={s.reportTitle}>NERACA</div>
          <div style={s.reportPeriod}>Per 31 Desember {tahun}</div>
        </div>

        <div style={s.layout}>
          {/* Kolom Kiri - HARTA */}
          <div style={s.col}>
            <div style={s.colHeader}>HARTA</div>

            {/* Harta Lancar */}
            <div style={s.sectionHeader}>Harta Lancar</div>
            {data.harta_lancar.map((d, i) => (
              <div key={i} style={s.row}>
                <span style={s.rowLabel}>{d.label}</span>
                <span style={s.rowValue}>{formatRp(d.nilai)}</span>
              </div>
            ))}
            <div style={s.totalRow}>
              <span style={s.totalLabel}>Total Aktiva Lancar</span>
              <span style={{...s.totalValue, color: '#2e7d32'}}>{formatRp(totalHartaLancar)}</span>
            </div>

            <div style={s.spacer} />

            {/* Harta Tetap */}
            <div style={s.sectionHeader}>Harta Tetap</div>
            {data.harta_tetap.map((d, i) => (
              <div key={i} style={s.row}>
                <span style={s.rowLabel}>{d.label}</span>
                <span style={{...s.rowValue, color: d.negatif ? '#c62828' : '#333'}}>
                  {d.negatif ? `(${formatRp(d.nilai)})` : formatRp(d.nilai)}
                </span>
              </div>
            ))}
            <div style={s.totalRow}>
              <span style={s.totalLabel}>Total Aktiva Tetap</span>
              <span style={{...s.totalValue, color: '#2e7d32'}}>{formatRp(totalHartaTetap)}</span>
            </div>

            <div style={s.grandTotalRow}>
              <span style={s.grandTotalLabel}>TOTAL HARTA</span>
              <span style={s.grandTotalValue}>{formatRp(totalHarta)}</span>
            </div>
          </div>

          {/* Divider */}
          <div style={s.divider} />

          {/* Kolom Kanan - KEWAJIBAN & MODAL */}
          <div style={s.col}>
            <div style={s.colHeader}>KEWAJIBAN DAN MODAL</div>

            {/* Kewajiban */}
            <div style={s.sectionHeader}>Kewajiban</div>
            {data.kewajiban.map((d, i) => (
              <div key={i} style={s.row}>
                <span style={s.rowLabel}>{d.label}</span>
                <span style={s.rowValue}>{formatRp(d.nilai)}</span>
              </div>
            ))}
            <div style={s.totalRow}>
              <span style={s.totalLabel}>Jumlah Hutang Lancar</span>
              <span style={{...s.totalValue, color: '#c62828'}}>{formatRp(totalKewajiban)}</span>
            </div>

            <div style={s.spacer} />

            {/* Modal */}
            <div style={s.sectionHeader}>Modal</div>
            {data.modal.map((d, i) => (
              <div key={i} style={s.row}>
                <span style={s.rowLabel}>{d.label}</span>
                <span style={s.rowValue}>{formatRp(d.nilai)}</span>
              </div>
            ))}
            <div style={s.totalRow}>
              <span style={s.totalLabel}>Total Modal</span>
              <span style={{...s.totalValue, color: '#2e7d32'}}>{formatRp(totalModal)}</span>
            </div>

            <div style={s.grandTotalRow}>
              <span style={s.grandTotalLabel}>TOTAL HUTANG DAN MODAL</span>
              <span style={s.grandTotalValue}>{formatRp(totalKewajibanModal)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={s.footer}>
          <div style={s.footerDate}>
            Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <div style={s.footerSign}>
            <div style={s.footerName}>Budi Santoso S.Kom</div>
            <div style={s.footerTitle}>Direktur</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  container: { padding: '4px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: '700', color: '#222', marginBottom: '4px' },
  subtitle: { fontSize: '12px', color: '#999' },
  filterRow: { display: 'flex', gap: '8px', alignItems: 'center' },
  select: { padding: '8px 10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', backgroundColor: '#fff' },
  reportCard: { backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden' },
  reportHeader: { padding: '24px', textAlign: 'center', borderBottom: '2px solid #e0e0e0' },
  reportCompany: { fontSize: '16px', fontWeight: '800', color: '#222', marginBottom: '4px' },
  reportTitle: { fontSize: '14px', fontWeight: '700', color: '#444', marginBottom: '4px' },
  reportPeriod: { fontSize: '13px', color: '#888' },
  layout: { display: 'flex', gap: '0', alignItems: 'flex-start' },
  col: { flex: 1, padding: '0' },
  colHeader: {
    padding: '12px 20px',
    backgroundColor: '#1a73e8',
    color: '#fff',
    fontWeight: '800',
    fontSize: '14px',
    letterSpacing: '0.5px'
  },
  divider: { width: '2px', backgroundColor: '#e0e0e0', alignSelf: 'stretch' },
  sectionHeader: {
    padding: '10px 20px',
    backgroundColor: '#f0f4ff',
    color: '#1a73e8',
    fontWeight: '700',
    fontSize: '13px',
    borderBottom: '1px solid #c5d8f8',
    borderTop: '1px solid #c5d8f8',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px 10px 32px',
    borderBottom: '1px solid #f5f5f5',
    fontSize: '13px',
  },
  rowLabel: { color: '#555' },
  rowValue: { color: '#333', fontWeight: '500' },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    borderTop: '2px solid #e0e0e0',
    borderBottom: '2px solid #e0e0e0',
  },
  totalLabel: { fontWeight: '700', fontSize: '13px', color: '#333' },
  totalValue: { fontWeight: '700', fontSize: '13px' },
  spacer: { height: '16px', backgroundColor: '#fafafa', borderBottom: '1px solid #f0f0f0' },
  grandTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px 20px',
    backgroundColor: '#1a73e8',
    marginTop: 'auto',
  },
  grandTotalLabel: { fontWeight: '800', fontSize: '14px', color: '#fff' },
  grandTotalValue: { fontWeight: '800', fontSize: '14px', color: '#fff' },
  footer: { padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #e0e0e0' },
  footerDate: { fontSize: '13px', color: '#555' },
  footerSign: { textAlign: 'center' },
  footerName: { fontSize: '13px', fontWeight: '700', color: '#222', marginTop: '40px' },
  footerTitle: { fontSize: '12px', color: '#888' },
}