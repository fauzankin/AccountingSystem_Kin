import { useState } from 'react'
import { dummyCoaPendapatan, dummyCoaPendapatanDetail } from '../../data/dummyData'

const formatRp = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID')
const formatTanggal = (val) => {
  if (!val) return '-'
  return new Date(val).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}
const formatTglLabel = (str) => {
  if (!str) return ''
  const [y, m, d] = str.split('-')
  return `${d}/${m}/${y}`
}

export default function CoaPendapatan() {
  const now = new Date()
  const todayStr  = now.toISOString().slice(0, 10)
  const awalBulan = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)

  const [dariTgl,     setDariTgl]     = useState(awalBulan)
  const [sampaiTgl,   setSampaiTgl]   = useState(todayStr)
  const [listCoa]                     = useState(dummyCoaPendapatan)
  const [selectedCoa, setSelectedCoa] = useState(null)
  const [detail,      setDetail]      = useState([])
  const [searchCode,  setSearchCode]  = useState('')

  const fetchDetail = (coa) => {
    setSelectedCoa(coa)
    setDetail(dummyCoaPendapatanDetail[coa.code] || [])
  }

  const filteredCoa     = listCoa.filter(c =>
    c.code.toLowerCase().includes(searchCode.toLowerCase()) ||
    c.name.toLowerCase().includes(searchCode.toLowerCase())
  )
  const totalCoa         = listCoa.reduce((sum, c) => sum + Number(c.nilai || 0), 0)
  const totalRevenue     = detail.reduce((sum, d) => sum + Number(d.revenue || 0), 0)
  const totalPiutang     = detail.reduce((sum, d) => sum + Number(d.piutang || 0), 0)
  const totalJobComplete = detail.reduce((sum, d) => sum + Number(d.job_complete || 0), 0)
  const groupName        = detail[0]?.group_name || '-'

  return (
    <div style={s.container}>
      <div style={s.headerRow}>
        <div>
          <h2 style={s.title}>COA Pendapatan / Revenue</h2>
          <p style={s.subtitle}>Klik kode COA untuk melihat detail transaksi</p>
        </div>
        <div style={s.filterRow}>
          <label style={s.filterLabel}>Dari</label>
          <input type="date" value={dariTgl} max={sampaiTgl} onChange={e => setDariTgl(e.target.value)} style={s.inputDate} />
          <label style={s.filterLabel}>s/d</label>
          <input type="date" value={sampaiTgl} min={dariTgl} max={todayStr} onChange={e => setSampaiTgl(e.target.value)} style={s.inputDate} />
          <button style={s.btnRefresh}>🔄 Refresh</button>
        </div>
      </div>

      <div style={s.layout}>
        {/* Kiri: List COA */}
        <div style={s.leftPanel}>
          <div style={s.panelHeader}>
            <span style={s.panelTitle}>Daftar COA</span>
            <span style={s.totalBadge}>{formatRp(totalCoa)}</span>
          </div>
          <div style={s.searchBox}>
            <input type="text" placeholder="Cari kode / nama COA..." value={searchCode}
              onChange={e => setSearchCode(e.target.value)} style={s.searchInput} />
          </div>
          {filteredCoa.map(coa => (
            <div key={coa.id} style={{
              ...s.coaItem,
              backgroundColor: selectedCoa?.id === coa.id ? '#e8f0fe' : '#fff',
              borderLeft: selectedCoa?.id === coa.id ? '4px solid #1a73e8' : '4px solid transparent',
            }} onClick={() => fetchDetail(coa)}>
              <div style={s.coaCode}>{coa.code}</div>
              <div style={s.coaName}>{coa.name}</div>
              <div style={s.coaNilai}>{formatRp(coa.nilai)}</div>
            </div>
          ))}
        </div>

        {/* Kanan: Detail */}
        <div style={s.rightPanel}>
          {!selectedCoa ? (
            <div style={s.emptyDetail}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>👈</div>
              <div>Pilih COA di sebelah kiri untuk melihat detail transaksi</div>
            </div>
          ) : (
            <>
              <div style={s.coaInfoBox}>
                <div style={s.infoLeft}>
                  <table style={s.infoTable}><tbody>
                    <tr><td style={s.infoLabel}>Code</td><td style={s.infoSep}>:</td><td style={s.infoVal}>{selectedCoa.code}</td></tr>
                    <tr><td style={s.infoLabel}>COA</td><td style={s.infoSep}>:</td><td style={s.infoVal}>{selectedCoa.name}</td></tr>
                    <tr><td style={s.infoLabel}>Group</td><td style={s.infoSep}>:</td><td style={s.infoVal}>{groupName}</td></tr>
                    <tr><td style={s.infoLabel}>Periode</td><td style={s.infoSep}>:</td><td style={s.infoVal}>{formatTglLabel(dariTgl)} – {formatTglLabel(sampaiTgl)}</td></tr>
                  </tbody></table>
                </div>
                <div style={s.infoRight}>
                  <table style={s.infoTable}><tbody>
                    <tr><td style={s.infoLabel}>Total Job Complete</td><td style={s.infoSep}>:</td><td style={{...s.infoVal, fontWeight:'700', color:'#1565c0'}}>{formatRp(totalJobComplete)}</td></tr>
                    <tr><td style={s.infoLabel}>Total Piutang</td><td style={s.infoSep}>:</td><td style={{...s.infoVal, fontWeight:'700', color:'#6a1b9a'}}>{formatRp(totalPiutang)}</td></tr>
                    <tr><td style={s.infoLabel}>Total Revenue</td><td style={s.infoSep}>:</td><td style={{...s.infoVal, fontWeight:'700', color:'#2e7d32'}}>{formatRp(totalRevenue)}</td></tr>
                  </tbody></table>
                </div>
              </div>
              <div style={s.tableScroll}>
                <table style={s.table}>
                  <thead><tr>
                    <th style={s.th}>No. Regis</th>
                    <th style={s.th}>Tanggal</th>
                    <th style={{...s.th, textAlign:'right'}}>Job Complete</th>
                    <th style={{...s.th, textAlign:'right'}}>Piutang</th>
                    <th style={{...s.th, textAlign:'right'}}>Revenue</th>
                    <th style={s.th}>No. Transaksi</th>
                  </tr></thead>
                  <tbody>
                    {detail.length === 0 ? (
                      <tr><td colSpan={6} style={{textAlign:'center', padding:'24px', color:'#aaa'}}>Tidak ada transaksi</td></tr>
                    ) : detail.map((d, i) => (
                      <tr key={i} style={i % 2 === 0 ? s.trEven : {}}>
                        <td style={s.td}>{d.no_regis || '-'}</td>
                        <td style={s.td}>{formatTanggal(d.tanggal)}</td>
                        <td style={{...s.td, textAlign:'right', color:'#1565c0'}}>{d.job_complete ? formatRp(d.job_complete) : '-'}</td>
                        <td style={{...s.td, textAlign:'right', color:'#6a1b9a'}}>{d.piutang ? formatRp(d.piutang) : '-'}</td>
                        <td style={{...s.td, textAlign:'right', color:'#2e7d32', fontWeight:'600'}}>{d.revenue ? formatRp(d.revenue) : '-'}</td>
                        <td style={s.td}>{d.no_transaksi || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                  {detail.length > 0 && (
                    <tfoot><tr>
                      <td colSpan={2} style={{...s.td, fontWeight:'700', borderTop:'2px solid #e0e0e0'}}>TOTAL</td>
                      <td style={{...s.td, textAlign:'right', fontWeight:'700', color:'#1565c0', borderTop:'2px solid #e0e0e0'}}>{formatRp(totalJobComplete)}</td>
                      <td style={{...s.td, textAlign:'right', fontWeight:'700', color:'#6a1b9a', borderTop:'2px solid #e0e0e0'}}>{formatRp(totalPiutang)}</td>
                      <td style={{...s.td, textAlign:'right', fontWeight:'700', color:'#2e7d32', borderTop:'2px solid #e0e0e0'}}>{formatRp(totalRevenue)}</td>
                      <td style={{...s.td, borderTop:'2px solid #e0e0e0'}}></td>
                    </tr></tfoot>
                  )}
                </table>
              </div>
            </>
          )}
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
  filterRow: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
  filterLabel: { fontSize: '13px', color: '#555', fontWeight: '600' },
  inputDate: { padding: '8px 10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', backgroundColor: '#fff' },
  btnRefresh: { padding: '8px 14px', border: '1px solid #1a73e8', borderRadius: '8px', fontSize: '13px', color: '#1a73e8', background: '#fff', cursor: 'pointer', fontWeight: '600' },
  layout: { display: 'flex', gap: '16px', alignItems: 'flex-start' },
  leftPanel: { width: '280px', flexShrink: 0, backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden' },
  panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' },
  panelTitle: { fontSize: '13px', fontWeight: '700', color: '#444' },
  totalBadge: { fontSize: '12px', fontWeight: '700', color: '#2e7d32' },
  searchBox: { padding: '10px 12px', borderBottom: '1px solid #f0f0f0' },
  searchInput: { width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' },
  coaItem: { padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f5f5f5', transition: '0.15s' },
  coaCode: { fontSize: '13px', fontWeight: '700', color: '#1a73e8', marginBottom: '2px' },
  coaName: { fontSize: '12px', color: '#555', marginBottom: '4px' },
  coaNilai: { fontSize: '13px', fontWeight: '600', color: '#2e7d32' },
  rightPanel: { flex: 1, backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden', minHeight: '400px' },
  emptyDetail: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', color: '#aaa', fontSize: '14px' },
  coaInfoBox: { display: 'flex', justifyContent: 'space-between', padding: '16px 20px', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0', gap: '20px', flexWrap: 'wrap' },
  infoLeft: { flex: 1 }, infoRight: { flex: 1 },
  infoTable: { borderCollapse: 'collapse', width: '100%' },
  infoLabel: { fontSize: '13px', color: '#555', paddingBottom: '6px', paddingRight: '8px', whiteSpace: 'nowrap' },
  infoSep: { fontSize: '13px', color: '#555', paddingBottom: '6px', paddingRight: '8px' },
  infoVal: { fontSize: '13px', color: '#222', paddingBottom: '6px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableScroll: { maxHeight: 'calc(100vh - 280px)', overflowY: 'auto' },
  th: { padding: '12px 16px', backgroundColor: '#1a73e8', fontSize: '12px', fontWeight: '700', color: '#fff', textAlign: 'left', borderBottom: '1px solid #1558b0', textTransform: 'uppercase', position: 'sticky', top: 0, zIndex: 1 },
  td: { padding: '11px 16px', fontSize: '13px', color: '#333', borderBottom: '1px solid #f0f0f0' },
  trEven: { backgroundColor: '#fafafa' },
}
