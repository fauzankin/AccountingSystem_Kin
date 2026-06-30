import { useState } from 'react'
import { dummyAngsuranAktiva, dummyAngsuranAktivaDetail } from '../../data/dummyData'

const formatRp  = (val) => val != null ? 'Rp ' + Number(val).toLocaleString('id-ID') : '-'
const formatTgl = (str) => {
  if (!str) return '-'
  return new Date(str).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

// Lebar kolom tabel utama — dipakai di thead & tbody supaya sinkron
const COL_WIDTHS = ['40px', '200px', '110px', '140px', '140px', '110px', '120px', '110px', '140px', '140px', '120px']

export default function RekapAngsuranAktiva() {
  const [data,          setData]          = useState(dummyAngsuranAktiva)
  const [loading]                         = useState(false)
  const [error]                           = useState('')
  const [modalView,     setModalView]     = useState(false)
  const [selectedRow,   setSelectedRow]   = useState(null)
  const [detail,        setDetail]        = useState([])
  const [loadingDetail] = useState(false)
  const [modalEdit,     setModalEdit]     = useState(false)
  const [editForm,      setEditForm]      = useState({})
  const [saving]        = useState(false)

  const fetchData = () => setData(dummyAngsuranAktiva)

  const openView = (row) => {
    setSelectedRow(row)
    setModalView(true)
    setDetail(dummyAngsuranAktivaDetail[row.id_aktiva] || [])
  }

  const openEdit = (row) => {
    setSelectedRow(row)
    setEditForm({
      uraian:              row.uraian,
      tanggal_perolehan:   row.tanggal_perolehan?.slice(0, 10),
      jumlah:              row.jumlah,
      sisa_perolehan:      row.sisa_perolehan,
      lama_angsuran:       row.lama_angsuran,
      biaya_angsuran:      row.angsuran_bln,
      biaya_keterlambatan: row.biaya_keterlambatan || 0,
    })
    setModalEdit(true)
  }

  // Demo: simpan hanya tutup modal
  const saveEdit = () => setModalEdit(false)

  // ─── kolom header tabel utama ───────────────────────────
  const headers = [
    { label: 'No',             align: 'center' },
    { label: 'Uraian',         align: 'left'   },
    { label: 'Tgl Perolehan',  align: 'center' },
    { label: 'Jumlah',         align: 'right'  },
    { label: 'Sisa Perolehan', align: 'right'  },
    { label: 'Lama Angsuran',  align: 'center' },
    { label: 'Angsuran/Bln',   align: 'right'  },
    { label: 'Jlh Angsuran',   align: 'center' },
    { label: 'Total Angsuran', align: 'right'  },
    { label: 'Sisa Angsuran',  align: 'right'  },
    { label: 'Aksi',           align: 'center' },
  ]

  return (
    <div style={s.container}>

      {/* Header */}
      <div style={s.headerRow}>
        <div>
          <h2 style={s.title}>Rekap Angsuran Aktiva</h2>
          <p style={s.subtitle}>Pembayaran angsuran aktiva tetap</p>
        </div>
        <button onClick={fetchData} style={s.btnRefresh}>🔄 Refresh</button>
      </div>

      {error && <div style={s.errorBox}>⚠️ {error}</div>}

      {loading ? (
        <div style={s.loading}>Memuat data...</div>
      ) : (
        /* ── wrapper dengan overflow kedua arah ── */
        <div style={s.tableCard}>
          {/* THEAD — di luar scroll, selalu tampil */}
          <div style={s.theadWrap}>
            <table style={s.tableFull}>
              <thead>
                <tr>
                  {headers.map((h, i) => (
                    <th key={h.label} style={{ ...s.th, textAlign: h.align, width: COL_WIDTHS[i], minWidth: COL_WIDTHS[i] }}>
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          {/* TBODY — scroll area */}
          <div style={s.tbodyWrap}>
            <table style={s.tableFull}>
              <colgroup>
                {COL_WIDTHS.map((w, i) => <col key={i} style={{ width: w, minWidth: w }} />)}
              </colgroup>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={11} style={s.empty}>Tidak ada data</td>
                  </tr>
                ) : data.map((row, i) => (
                  <tr key={row.id_aktiva} style={i % 2 === 0 ? s.trEven : {}}>
                    <td style={{ ...s.td, textAlign: 'center', color: '#999' }}>{i + 1}</td>
                    <td style={{ ...s.td, fontWeight: '600' }}>{row.uraian}</td>
                    <td style={{ ...s.td, textAlign: 'center' }}>{formatTgl(row.tanggal_perolehan)}</td>
                    <td style={{ ...s.td, textAlign: 'right' }}>{formatRp(row.jumlah)}</td>
                    <td style={{ ...s.td, textAlign: 'right' }}>{formatRp(row.sisa_perolehan)}</td>
                    <td style={{ ...s.td, textAlign: 'center' }}>{row.lama_angsuran ?? '-'} bln</td>
                    <td style={{ ...s.td, textAlign: 'right', color: '#1a73e8', fontWeight: '600' }}>{formatRp(row.angsuran_bln)}</td>
                    <td style={{ ...s.td, textAlign: 'center', color: '#1565c0', fontWeight: '600' }}>{row.jlh_angsuran}</td>
                    <td style={{ ...s.td, textAlign: 'right', color: '#2e7d32', fontWeight: '600' }}>{formatRp(row.total_angsuran)}</td>
                    <td style={{ ...s.td, textAlign: 'right', color: row.sisa_angsuran > 0 ? '#c62828' : '#2e7d32', fontWeight: '600' }}>{formatRp(row.sisa_angsuran)}</td>
                    <td style={{ ...s.td, textAlign: 'center' }}>
                      <div style={s.aksiWrap}>
                        <button onClick={() => openView(row)} style={s.btnView}>👁 View</button>
                        <button onClick={() => openEdit(row)} style={s.btnEditBtn}>✏️ Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Modal View Rincian ── */}
      {modalView && (
        <div style={s.overlay} onClick={() => setModalView(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <div>
                <p style={s.modalTitle}>Rincian Angsuran</p>
                <p style={s.modalSub}>{selectedRow?.uraian}</p>
              </div>
              <button onClick={() => setModalView(false)} style={s.btnClose}>✕</button>
            </div>
            {loadingDetail ? (
              <div style={s.loading}>Memuat detail...</div>
            ) : (
              <div style={s.modalBody}>
                {/* thead modal — fixed */}
                <table style={{ ...s.tableFull, tableLayout: 'fixed' }}>
                  <colgroup>
                    <col style={{ width: '50px'  }} />
                    <col style={{ width: '120px' }} />
                    <col style={{ width: '160px' }} />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th style={s.th}>No</th>
                      <th style={s.th}>Tanggal</th>
                      <th style={{ ...s.th, textAlign: 'right' }}>Jumlah Angsuran</th>
                      <th style={s.th}>Keterangan</th>
                    </tr>
                  </thead>
                </table>
                {/* tbody modal — scroll */}
                <div style={s.modalTableScroll}>
                  <table style={{ ...s.tableFull, tableLayout: 'fixed' }}>
                    <colgroup>
                      <col style={{ width: '50px'  }} />
                      <col style={{ width: '120px' }} />
                      <col style={{ width: '160px' }} />
                      <col />
                    </colgroup>
                    <tbody>
                      {detail.length === 0 ? (
                        <tr><td colSpan={4} style={s.empty}>Belum ada angsuran</td></tr>
                      ) : detail.map((d, i) => (
                        <tr key={i} style={i % 2 === 0 ? s.trEven : {}}>
                          <td style={{ ...s.td, color: '#999' }}>{i + 1}</td>
                          <td style={s.td}>{formatTgl(d.tanggal)}</td>
                          <td style={{ ...s.td, textAlign: 'right', color: '#2e7d32', fontWeight: '600' }}>{formatRp(d.jumlah_angsuran)}</td>
                          <td style={{ ...s.td, color: '#777' }}>{d.keterangan || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                    {detail.length > 0 && (
                      <tfoot>
                        <tr>
                          <td colSpan={2} style={{ ...s.td, fontWeight: '700', borderTop: '2px solid #e0e0e0' }}>TOTAL</td>
                          <td style={{ ...s.td, textAlign: 'right', fontWeight: '700', color: '#2e7d32', borderTop: '2px solid #e0e0e0' }}>
                            {formatRp(detail.reduce((sum, d) => sum + Number(d.jumlah_angsuran || 0), 0))}
                          </td>
                          <td style={{ ...s.td, borderTop: '2px solid #e0e0e0' }} />
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Modal Edit ── */}
      {modalEdit && (
        <div style={s.overlay} onClick={() => setModalEdit(false)}>
          <div style={{ ...s.modal, maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <div>
                <p style={s.modalTitle}>Edit Aktiva</p>
                <p style={s.modalSub}>{selectedRow?.uraian}</p>
              </div>
              <button onClick={() => setModalEdit(false)} style={s.btnClose}>✕</button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Uraian',                    key: 'uraian',              type: 'text'   },
                { label: 'Tanggal Perolehan',         key: 'tanggal_perolehan',   type: 'date'   },
                { label: 'Jumlah',                    key: 'jumlah',              type: 'number' },
                { label: 'Sisa Perolehan',            key: 'sisa_perolehan',      type: 'number' },
                { label: 'Lama Angsuran (bln)',       key: 'lama_angsuran',       type: 'number' },
                { label: 'Biaya Angsuran / Bulan (Rp)', key: 'biaya_angsuran',    type: 'number' },
                { label: 'Biaya Keterlambatan (Rp)',  key: 'biaya_keterlambatan', type: 'number' },
              ].map(f => (
                <div key={f.key}>
                  <label style={s.formLabel}>{f.label}</label>
                  <input
                    type={f.type}
                    value={editForm[f.key] ?? ''}
                    onChange={e => setEditForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    style={s.formInput}
                  />
                </div>
              ))}
              <button onClick={saveEdit} disabled={saving} style={s.btnSave}>
                {saving ? 'Menyimpan...' : '💾 Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  container:  { padding: '4px' },
  headerRow:  { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
  title:      { fontSize: '20px', fontWeight: '700', color: '#222', marginBottom: '4px' },
  subtitle:   { fontSize: '12px', color: '#999' },
  btnRefresh: { padding: '8px 14px', border: '1px solid #1a73e8', borderRadius: '8px', fontSize: '13px', color: '#1a73e8', background: '#fff', cursor: 'pointer', fontWeight: '600' },
  errorBox:   { backgroundColor: '#fff0f0', border: '1px solid #f5c6c6', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', color: '#c0392b', marginBottom: '16px' },
  loading:    { textAlign: 'center', padding: '48px', color: '#aaa', fontSize: '14px' },

  // Tabel utama — thead di atas, tbody scroll
  tableCard:  { backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' },
  theadWrap:  { overflowX: 'auto', overflowY: 'hidden' },
  tbodyWrap:  { overflowX: 'auto', overflowY: 'auto', maxHeight: 'calc(100vh - 240px)' },
  tableFull:  { width: '100%', borderCollapse: 'collapse', minWidth: '1100px' },

  th: {
    padding: '12px 14px',
    backgroundColor: '#1a73e8',
    fontSize: '11px', fontWeight: '700', color: '#fff',
    textAlign: 'left',
    borderBottom: '2px solid #1558b0',
    textTransform: 'uppercase', whiteSpace: 'nowrap',
  },
  td:     { padding: '11px 14px', fontSize: '13px', color: '#333', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' },
  trEven: { backgroundColor: '#fafafa' },
  empty:  { textAlign: 'center', padding: '32px', color: '#aaa', fontSize: '14px' },

  aksiWrap:   { display: 'flex', gap: '6px', justifyContent: 'center' },
  btnView:    { padding: '5px 10px', border: '1px solid #1565c0', borderRadius: '6px', fontSize: '12px', color: '#1565c0', background: '#fff', cursor: 'pointer', fontWeight: '600' },
  btnEditBtn: { padding: '5px 10px', border: '1px solid #e65100', borderRadius: '6px', fontSize: '12px', color: '#e65100', background: '#fff', cursor: 'pointer', fontWeight: '600' },

  // Modal
  overlay:    { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' },
  modal:      { backgroundColor: '#fff', borderRadius: '14px', width: '100%', maxWidth: '700px', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' },
  modalHeader:{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '18px 20px', borderBottom: '1px solid #e0e0e0' },
  modalTitle: { fontSize: '16px', fontWeight: '700', color: '#222', marginBottom: '2px' },
  modalSub:   { fontSize: '12px', color: '#999' },
  modalBody:  { display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' },
  modalTableScroll: { overflowY: 'auto', flex: 1 },

  btnClose:  { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#999', padding: '0 4px' },
  formLabel: { fontSize: '12px', color: '#555', fontWeight: '600', display: 'block', marginBottom: '6px' },
  formInput: { width: '100%', padding: '9px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' },
  btnSave:   { padding: '10px', backgroundColor: '#1a73e8', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' },
}
