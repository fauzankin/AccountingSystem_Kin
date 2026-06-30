import { useState } from 'react'
import { dummyLabaRugi } from '../data/dummyData'

const formatRp = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID')

export default function LabaRugi() {
  const tahunSekarang = new Date().getFullYear()
  const bulanSekarang = String(new Date().getMonth() + 1).padStart(2, '0')

  const [bulan, setBulan] = useState(bulanSekarang)
  const [tahun, setTahun] = useState(String(tahunSekarang))

  const listBulan = [
    ['', 'Semua Bulan'],
    ['01','Januari'],['02','Februari'],['03','Maret'],['04','April'],
    ['05','Mei'],['06','Juni'],['07','Juli'],['08','Agustus'],
    ['09','September'],['10','Oktober'],['11','November'],['12','Desember']
  ]
  const listTahun = Array.from({ length: 5 }, (_, i) => String(tahunSekarang - i))

  // Selalu pakai dummy data — tidak ada fetch ke backend
  const data = dummyLabaRugi
  const loading = false
  const error = ''
  const fetchData = () => {} // no-op untuk tombol refresh

  const periodLabel = bulan
    ? `${listBulan.find(b => b[0] === bulan)?.[1]} ${tahun}`
    : `Tahun ${tahun}`

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.headerRow}>
        <div>
          <h2 style={s.title}>Laporan Laba Rugi</h2>
          <p style={s.subtitle}>PT Nusantara Logistik Trans</p>
        </div>
        <div style={s.filterRow}>
          <select value={bulan} onChange={e => setBulan(e.target.value)} style={s.select}>
            {listBulan.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select value={tahun} onChange={e => setTahun(e.target.value)} style={s.select}>
            {listTahun.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button onClick={fetchData} style={s.btnRefresh}>🔄 Refresh</button>
        </div>
      </div>

      {error && <div style={s.errorBox}>⚠️ {error}</div>}

      {loading ? (
        <div style={s.loading}>Memuat data...</div>
      ) : data && (
        <div style={s.reportCard}>
          {/* Judul Laporan */}
          <div style={s.reportHeader}>
            <div style={s.reportCompany}>PT NUSANTARA LOGISTIK TRANS</div>
            <div style={s.reportTitle}>LAPORAN LABA RUGI</div>
            <div style={s.reportPeriod}>Per {periodLabel}</div>
          </div>

          <div style={s.tableScroll}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={{...s.th, width: '40px'}} rowSpan={2}>No</th>
                <th style={{...s.th, width: '80px'}} rowSpan={2}>COA</th>
                <th style={s.th} rowSpan={2}>Keterangan</th>
                <th style={{...s.th, textAlign: 'right'}} rowSpan={2}>Komersial</th>
                <th style={{...s.th, textAlign: 'center'}} colSpan={2}>Koreksi Fiskal</th>
                <th style={{...s.th, textAlign: 'right'}} rowSpan={2}>Fiskal</th>
              </tr>
              <tr>
                <th style={{...s.thSub, textAlign: 'right'}}>Positif</th>
                <th style={{...s.thSub, textAlign: 'right'}}>Negatif</th>
              </tr>
            </thead>
            <tbody>

              {/* === PENDAPATAN === */}
              <SectionRow title="PENDAPATAN" />
              <SubSectionRow title="Pendapatan Jasa" />
              {data.pendapatan.map((r, i) => (
                <tr key={i} style={i % 2 === 0 ? s.trEven : {}}>
                  <td style={s.tdNo}>{i + 1}</td>
                  <td style={s.tdCoa}>{r.code}</td>
                  <td style={s.td}>{r.coa_name}</td>
                  <td style={{...s.td, textAlign: 'right', color: '#2e7d32'}}>{formatRp(r.total)}</td>
                  <td style={{...s.td, textAlign: 'right', color: '#888'}}>-</td>
                  <td style={{...s.td, textAlign: 'right', color: '#888'}}>-</td>
                  <td style={{...s.td, textAlign: 'right', color: '#2e7d32'}}>{formatRp(r.total)}</td>
                </tr>
              ))}
              <TotalRow label="TOTAL PENDAPATAN" value={data.totalPendapatan} color="#2e7d32" />

              {/* === BIAYA OPERASIONAL === */}
              <SectionRow title="BIAYA OPERASIONAL" />
              {data.bebanOperasional.map((r, i) => (
                <tr key={i} style={i % 2 === 0 ? s.trEven : {}}>
                  <td style={s.tdNo}>{i + 1}</td>
                  <td style={s.tdCoa}>{r.code}</td>
                  <td style={s.td}>{r.coa_name}</td>
                  <td style={{...s.td, textAlign: 'right', color: '#c62828'}}>{formatRp(r.total)}</td>
                  <td style={{...s.td, textAlign: 'right', color: '#888'}}>-</td>
                  <td style={{...s.td, textAlign: 'right', color: '#888'}}>-</td>
                  <td style={{...s.td, textAlign: 'right', color: '#c62828'}}>{formatRp(r.total)}</td>
                </tr>
              ))}
              <TotalRow label="TOTAL BIAYA OPERASIONAL" value={data.totalBebanOps} color="#c62828" />

              {/* === LABA KOTOR === */}
              <LabaRow
                label="LABA KOTOR"
                value={data.labaKotor}
                color={data.labaKotor >= 0 ? '#1a73e8' : '#c62828'}
              />

              {/* === BEBAN OPERASI === */}
              <SectionRow title="BEBAN OPERASI" />
              <SubSectionRow title="Biaya Kantor" />
              {data.bebanKantor.map((r, i) => (
                <tr key={i} style={i % 2 === 0 ? s.trEven : {}}>
                  <td style={s.tdNo}>{i + 1}</td>
                  <td style={s.tdCoa}>{r.code}</td>
                  <td style={s.td}>{r.coa_name}</td>
                  <td style={{...s.td, textAlign: 'right', color: '#c62828'}}>{formatRp(r.total)}</td>
                  <td style={{...s.td, textAlign: 'right', color: '#888'}}>-</td>
                  <td style={{...s.td, textAlign: 'right', color: '#888'}}>-</td>
                  <td style={{...s.td, textAlign: 'right', color: '#c62828'}}>{formatRp(r.total)}</td>
                </tr>
              ))}
              <TotalRow label="TOTAL BEBAN OPERASI" value={data.totalBebanKantor} color="#c62828" />

              {/* === LABA BERSIH === */}
              <LabaRow
                label="LABA BERSIH (SEBELUM PAJAK)"
                value={data.labaBersih}
                color={data.labaBersih >= 0 ? '#1a73e8' : '#c62828'}
              />

            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  )
}

function SectionRow({ title }) {
  return (
    <tr>
      <td colSpan={7} style={{
        padding: '10px 16px',
        backgroundColor: '#1a73e8',
        color: '#fff',
        fontWeight: '700',
        fontSize: '13px',
        letterSpacing: '0.5px'
      }}>
        {title}
      </td>
    </tr>
  )
}

function SubSectionRow({ title }) {
  return (
    <tr>
      <td colSpan={7} style={{
        padding: '8px 16px 8px 28px',
        backgroundColor: '#f0f4ff',
        color: '#1a73e8',
        fontWeight: '600',
        fontSize: '13px',
        fontStyle: 'italic'
      }}>
        {title}
      </td>
    </tr>
  )
}

function TotalRow({ label, value, color }) {
  return (
    <tr>
      <td colSpan={3} style={{...ts.total, color: '#333'}}>{label}</td>
      <td style={{...ts.total, textAlign: 'right', color}}>{formatRp(value)}</td>
      <td style={{...ts.total, textAlign: 'right', color: '#888'}}>-</td>
      <td style={{...ts.total, textAlign: 'right', color: '#888'}}>-</td>
      <td style={{...ts.total, textAlign: 'right', color}}>{formatRp(value)}</td>
    </tr>
  )
}

function LabaRow({ label, value, color }) {
  return (
    <tr>
      <td colSpan={3} style={{...ts.laba, color: '#333'}}>{label}</td>
      <td style={{...ts.laba, textAlign: 'right', color}}>{formatRp(value)}</td>
      <td style={{...ts.laba, textAlign: 'right', color: '#888'}}>-</td>
      <td style={{...ts.laba, textAlign: 'right', color: '#888'}}>-</td>
      <td style={{...ts.laba, textAlign: 'right', color}}>{formatRp(value)}</td>
    </tr>
  )
}

const ts = {
  total: {
    padding: '10px 16px',
    backgroundColor: '#f5f5f5',
    fontWeight: '700',
    fontSize: '13px',
    borderTop: '2px solid #e0e0e0',
    borderBottom: '2px solid #e0e0e0',
  },
  laba: {
    padding: '14px 16px',
    backgroundColor: '#e8f0fe',
    fontWeight: '800',
    fontSize: '14px',
    borderTop: '3px solid #1a73e8',
    borderBottom: '3px solid #1a73e8',
  }
}

const s = {
  container: { padding: '4px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: '700', color: '#222', marginBottom: '4px' },
  subtitle: { fontSize: '12px', color: '#999' },
  filterRow: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
  select: { padding: '8px 10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', backgroundColor: '#fff' },
  btnRefresh: { padding: '8px 14px', border: '1px solid #1a73e8', borderRadius: '8px', fontSize: '13px', color: '#1a73e8', background: '#fff', cursor: 'pointer', fontWeight: '600' },
  errorBox: { backgroundColor: '#fff0f0', border: '1px solid #f5c6c6', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', color: '#c0392b', marginBottom: '16px' },
  loading: { textAlign: 'center', padding: '48px', color: '#aaa', fontSize: '14px' },
  reportCard: { backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden' },
  tableScroll: { maxHeight: 'calc(100vh - 280px)', overflowY: 'auto' },
  reportHeader: { padding: '24px', textAlign: 'center', borderBottom: '2px solid #e0e0e0' },
  reportCompany: { fontSize: '16px', fontWeight: '800', color: '#222', marginBottom: '4px' },
  reportTitle: { fontSize: '14px', fontWeight: '700', color: '#444', marginBottom: '4px' },
  reportPeriod: { fontSize: '13px', color: '#888' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 16px', backgroundColor: '#1a73e8', fontSize: '12px', fontWeight: '700', color: '#fff', textAlign: 'left', borderBottom: '2px solid #1558b0', textTransform: 'uppercase', position: 'sticky', top: 0, zIndex: 1 },
  thSub: { padding: '8px 16px', backgroundColor: '#1558b0', fontSize: '11px', fontWeight: '700', color: '#fff', textAlign: 'left', borderBottom: '2px solid #1044a0', textTransform: 'uppercase', position: 'sticky', top: '41px', zIndex: 1 },
  td: { padding: '10px 16px', fontSize: '13px', color: '#333', borderBottom: '1px solid #f0f0f0' },
  tdNo: { padding: '10px 16px', fontSize: '13px', color: '#888', borderBottom: '1px solid #f0f0f0', textAlign: 'center' },
  tdCoa: { padding: '10px 16px', fontSize: '13px', color: '#1a73e8', fontWeight: '600', borderBottom: '1px solid #f0f0f0' },
  trEven: { backgroundColor: '#fafafa' },
}