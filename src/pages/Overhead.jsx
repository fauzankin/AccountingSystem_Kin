import { useState } from 'react'
import { dummyOverhead } from '../data/dummyData'

const formatRp = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID')
const formatTgl = (val) => {
  if (!val) return '-'
  return new Date(val).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

const statusColor = {
  Pending:  { bg: '#fff3e0', color: '#e65100' },
  Approved: { bg: '#e8f5e9', color: '#2e7d32' },
  Paid:     { bg: '#e8f0fe', color: '#1a73e8' },
  Cancel:   { bg: '#fce4ec', color: '#c62828' },
}

const formKosong = {
  coa_biaya: '', group_account: '', jenis: 'Beban',
  vendor: '', rek_tujuan: '', bank: '',
  expense: '', payment_method: 'Transfer',
  tgl_jatuhtempo: '', tgl_payment: '', status: 'Pending',
  no_invoice: '', nomor_bukti: '', description: '',
  approved_by: '', remarks: '',
}

export default function Overhead() {
  const now = new Date()
  const todayStr = now.toISOString().slice(0, 10)
  const awalBulan = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)

  const [dariTgl,     setDariTgl]     = useState(awalBulan)
  const [sampaiTgl,   setSampaiTgl]   = useState(todayStr)
  const [data,        setData]        = useState(dummyOverhead)
  const [loading]                     = useState(false)
  const [error]                       = useState('')
  const [search,      setSearch]      = useState('')
  const [showModal,   setShowModal]   = useState(false)
  const [modalMode,   setModalMode]   = useState('tambah')
  const [form,        setForm]        = useState(formKosong)
  const [editId,      setEditId]      = useState(null)
  const [saving]                      = useState(false)
  const [saveError,   setSaveError]   = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteId,    setDeleteId]    = useState(null)

  // Demo: refresh tidak melakukan fetch
  const fetchData = () => setData(dummyOverhead)

  const filtered = data.filter(d =>
    d.vendor?.toLowerCase().includes(search.toLowerCase()) ||
    d.coa_biaya?.toLowerCase().includes(search.toLowerCase()) ||
    d.group_account?.toLowerCase().includes(search.toLowerCase()) ||
    d.status?.toLowerCase().includes(search.toLowerCase())
  )

  const totalOverhead   = filtered.reduce((s, d) => s + Number(d.expense || 0), 0)
  const totalPaid       = filtered.filter(d => d.status === 'Paid').reduce((s, d) => s + Number(d.expense || 0), 0)
  const totalBelumBayar = filtered.filter(d => d.status !== 'Paid' && d.status !== 'Cancel').reduce((s, d) => s + Number(d.expense || 0), 0)

  const bukaTambah = () => {
    setModalMode('tambah')
    setForm(formKosong)
    setEditId(null)
    setSaveError('')
    setShowModal(true)
  }

  const bukaEdit = (row) => {
    setModalMode('edit')
    setForm({
      coa_biaya:      row.coa_biaya || '',
      group_account:  row.group_account || '',
      jenis:          row.Jenis || 'Beban',
      vendor:         row.vendor || '',
      rek_tujuan:     row.rek_tujuan || '',
      bank:           row.bank || '',
      expense:        row.expense || '',
      payment_method: row.payment_method || 'Transfer',
      tgl_jatuhtempo: row.tgl_jatuhtempo?.slice(0, 10) || '',
      tgl_payment:    row.tgl_payment?.slice(0, 10) || '',
      status:         row.status || 'Pending',
      no_invoice:     row.no_invoice || '',
      nomor_bukti:    row.nomor_bukti || '',
      description:    row.description || '',
      approved_by:    row.approved_by || '',
      remarks:        row.remarks || '',
    })
    setEditId(row.id)
    setSaveError('')
    setShowModal(true)
  }

  const tutupModal = () => { setShowModal(false); setSaveError('') }

  // Demo: simpan hanya tutup modal
  const handleSimpan = () => {
    if (!form.vendor || !form.expense || !form.tgl_jatuhtempo) {
      setSaveError('Vendor, expense, dan tanggal jatuh tempo wajib diisi')
      return
    }
    tutupModal()
  }

  // Demo: toggle cek di state lokal
  const handleToggleCek = (row) => {
    setData(prev => prev.map(d => d.id === row.id ? { ...d, cek: d.cek ? 0 : 1 } : d))
  }

  const konfirmasiHapus = (id) => { setDeleteId(id); setShowConfirm(true) }

  // Demo: hapus dari state lokal
  const handleHapus = () => {
    setData(prev => prev.filter(d => d.id !== deleteId))
    setShowConfirm(false)
  }

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.headerRow}>
        <div>
          <h2 style={s.title}>Overhead</h2>
          <p style={s.subtitle}>Manajemen biaya overhead perusahaan</p>
        </div>
        <div style={s.filterRow}>
          <label style={s.filterLabel}>Dari</label>
          <input type="date" value={dariTgl} max={sampaiTgl}
            onChange={e => setDariTgl(e.target.value)} style={s.inputDate} />
          <label style={s.filterLabel}>s/d</label>
          <input type="date" value={sampaiTgl} min={dariTgl} max={todayStr}
            onChange={e => setSampaiTgl(e.target.value)} style={s.inputDate} />
          <button onClick={fetchData} style={s.btnRefresh}>🔄 Refresh</button>
          <button onClick={bukaTambah} style={s.btnTambah}>+ Tambah</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={s.cards}>
        <div style={{ ...s.card, borderTop: '4px solid #1a73e8' }}>
          <p style={s.cardLabel}>Total Overhead</p>
          <p style={{ ...s.cardValue, color: '#1a73e8' }}>{formatRp(totalOverhead)}</p>
          <p style={s.cardSub}>{filtered.length} transaksi</p>
        </div>
        <div style={{ ...s.card, borderTop: '4px solid #2e7d32' }}>
          <p style={s.cardLabel}>Sudah Dibayar</p>
          <p style={{ ...s.cardValue, color: '#2e7d32' }}>{formatRp(totalPaid)}</p>
          <p style={s.cardSub}>{filtered.filter(d => d.status === 'Paid').length} transaksi</p>
        </div>
        <div style={{ ...s.card, borderTop: '4px solid #e65100' }}>
          <p style={s.cardLabel}>Belum Dibayar</p>
          <p style={{ ...s.cardValue, color: '#e65100' }}>{formatRp(totalBelumBayar)}</p>
          <p style={s.cardSub}>{filtered.filter(d => d.status !== 'Paid' && d.status !== 'Cancel').length} transaksi</p>
        </div>
      </div>

      {/* Search */}
      <div style={s.searchRow}>
        <input type="text" placeholder="🔍 Cari vendor, COA, group account, status..."
          value={search} onChange={e => setSearch(e.target.value)} style={s.searchInput} />
      </div>

      {error && <div style={s.errorBox}>⚠️ {error}</div>}

      {/* Tabel */}
      {loading ? (
        <div style={s.loading}>Memuat data...</div>
      ) : (
        <div style={s.tableWrap}>
          <div style={s.tableScroll}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={{ ...s.th, textAlign: 'center', width: '50px' }}>Cek</th>
                  <th style={s.th}>COA</th>
                  <th style={s.th}>Group Account</th>
                  <th style={s.th}>Jenis</th>
                  <th style={s.th}>Vendor</th>
                  <th style={s.th}>Rek. Tujuan</th>
                  <th style={s.th}>Bank</th>
                  <th style={{ ...s.th, textAlign: 'right' }}>Expense</th>
                  <th style={{ ...s.th, textAlign: 'center' }}>Jatuh Tempo</th>
                  <th style={{ ...s.th, textAlign: 'center' }}>Tgl Payment</th>
                  <th style={{ ...s.th, textAlign: 'center' }}>Status</th>
                  <th style={{ ...s.th, textAlign: 'center' }}>File Invoice</th>
                  <th style={{ ...s.th, textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={13} style={s.emptyRow}>Tidak ada data</td></tr>
                ) : (
                  filtered.map((d, i) => (
                    <tr key={d.id} style={i % 2 === 0 ? s.trEven : {}}>
                      <td style={{ ...s.td, textAlign: 'center' }}>
                        <input type="checkbox" checked={!!d.cek}
                          onChange={() => handleToggleCek(d)}
                          style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
                      </td>
                      <td style={s.td}>{d.coa_biaya || '-'}</td>
                      <td style={s.td}>{d.group_account || '-'}</td>
                      <td style={s.td}>{d.Jenis || '-'}</td>
                      <td style={s.td}>{d.vendor}</td>
                      <td style={s.td}>{d.rek_tujuan || '-'}</td>
                      <td style={s.td}>{d.bank || '-'}</td>
                      <td style={{ ...s.td, textAlign: 'right', fontWeight: '600', color: '#1a73e8' }}>{formatRp(d.expense)}</td>
                      <td style={{ ...s.td, textAlign: 'center' }}>{formatTgl(d.tgl_jatuhtempo)}</td>
                      <td style={{ ...s.td, textAlign: 'center' }}>{formatTgl(d.tgl_payment)}</td>
                      <td style={{ ...s.td, textAlign: 'center' }}>
                        <span style={{
                          ...s.badge,
                          backgroundColor: statusColor[d.status]?.bg || '#f5f5f5',
                          color: statusColor[d.status]?.color || '#555',
                        }}>{d.status}</span>
                      </td>
                      <td style={{ ...s.td, textAlign: 'center' }}>
                        {d.file_invoice
                          ? <a href={`${API}/uploads/${d.file_invoice}`} target="_blank" rel="noreferrer" style={s.linkInvoice}>📄 Lihat</a>
                          : <span style={{ color: '#ccc', fontSize: '12px' }}>-</span>
                        }
                      </td>
                      <td style={{ ...s.td, textAlign: 'center' }}>
                        <div style={s.aksiRow}>
                          <button onClick={() => bukaEdit(d)} style={s.btnEdit} title="Edit">✏️</button>
                          <button onClick={() => konfirmasiHapus(d.id)} style={s.btnHapus} title="Hapus">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div style={s.overlay} onClick={tutupModal}>
          <div style={{ ...s.modal, width: '580px' }} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <h3 style={s.modalTitle}>{modalMode === 'tambah' ? '+ Tambah Overhead' : '✏️ Edit Overhead'}</h3>
              <button onClick={tutupModal} style={s.modalClose}>✕</button>
            </div>
            <div style={{ ...s.modalBody, maxHeight: '70vh', overflowY: 'auto' }}>
              <div style={s.formGrid}>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>COA Biaya</label>
                  <input type="text" value={form.coa_biaya} onChange={f('coa_biaya')} placeholder="contoh: 61011" style={s.fieldInput} /></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Group Account</label>
                  <input type="text" value={form.group_account} onChange={f('group_account')} placeholder="contoh: TUNJANGAN JABATAN" style={s.fieldInput} /></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Jenis</label>
                  <input type="text" value={form.jenis} onChange={f('jenis')} placeholder="contoh: Beban" style={s.fieldInput} /></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Vendor *</label>
                  <input type="text" value={form.vendor} onChange={f('vendor')} placeholder="Nama vendor" style={s.fieldInput} /></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>No. Invoice</label>
                  <input type="text" value={form.no_invoice} onChange={f('no_invoice')} placeholder="contoh: Invoice 1234" style={s.fieldInput} /></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Nomor Bukti</label>
                  <input type="text" value={form.nomor_bukti} onChange={f('nomor_bukti')} placeholder="contoh: BKT-001" style={s.fieldInput} /></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Rekening Tujuan</label>
                  <input type="text" value={form.rek_tujuan} onChange={f('rek_tujuan')} placeholder="No. rekening" style={s.fieldInput} /></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Bank</label>
                  <input type="text" value={form.bank} onChange={f('bank')} placeholder="contoh: BCA, Mandiri" style={s.fieldInput} /></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Expense (Rp) *</label>
                  <input type="number" value={form.expense} onChange={f('expense')} placeholder="contoh: 5000000" style={s.fieldInput} /></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Payment Method</label>
                  <select value={form.payment_method} onChange={f('payment_method')} style={s.fieldInput}>
                    <option>Transfer</option><option>Cash</option><option>Giro</option>
                  </select></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Tgl Jatuh Tempo *</label>
                  <input type="date" value={form.tgl_jatuhtempo} onChange={f('tgl_jatuhtempo')} style={s.fieldInput} /></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Tgl Payment</label>
                  <input type="date" value={form.tgl_payment} onChange={f('tgl_payment')} style={s.fieldInput} /></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Status</label>
                  <select value={form.status} onChange={f('status')} style={s.fieldInput}>
                    <option>Pending</option><option>Approved</option><option>Paid</option><option>Cancel</option>
                  </select></div>
                <div style={s.fieldGroup}><label style={s.fieldLabel}>Approved By</label>
                  <input type="text" value={form.approved_by} onChange={f('approved_by')} placeholder="Nama approver" style={s.fieldInput} /></div>
                <div style={{ ...s.fieldGroup, gridColumn: '1 / -1' }}><label style={s.fieldLabel}>Description</label>
                  <textarea value={form.description} onChange={f('description')} placeholder="Keterangan..." rows={2}
                    style={{ ...s.fieldInput, resize: 'vertical' }} /></div>
                <div style={{ ...s.fieldGroup, gridColumn: '1 / -1' }}><label style={s.fieldLabel}>Remarks</label>
                  <textarea value={form.remarks} onChange={f('remarks')} placeholder="Catatan tambahan..." rows={2}
                    style={{ ...s.fieldInput, resize: 'vertical' }} /></div>
              </div>
              {saveError && <div style={{ ...s.errorBox, marginTop: '12px' }}>⚠️ {saveError}</div>}
            </div>
            <div style={s.modalFooter}>
              <button onClick={tutupModal} style={s.btnBatal}>Batal</button>
              <button onClick={handleSimpan} disabled={saving} style={s.btnSimpan}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Konfirmasi Hapus */}
      {showConfirm && (
        <div style={s.overlay} onClick={() => setShowConfirm(false)}>
          <div style={{ ...s.modal, width: '360px' }} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <h3 style={{ ...s.modalTitle, color: '#c62828' }}>🗑️ Hapus Data</h3>
              <button onClick={() => setShowConfirm(false)} style={s.modalClose}>✕</button>
            </div>
            <div style={{ padding: '20px 24px', fontSize: '14px', color: '#555' }}>
              Yakin ingin menghapus data overhead ini? Tindakan ini tidak bisa dibatalkan.
            </div>
            <div style={s.modalFooter}>
              <button onClick={() => setShowConfirm(false)} style={s.btnBatal}>Batal</button>
              <button onClick={handleHapus} style={{ ...s.btnSimpan, background: '#c62828' }}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  container:   { padding: '4px' },
  headerRow:   { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' },
  title:       { fontSize: '20px', fontWeight: '700', color: '#222', marginBottom: '4px' },
  subtitle:    { fontSize: '12px', color: '#999' },
  filterRow:   { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
  filterLabel: { fontSize: '13px', color: '#555', fontWeight: '600' },
  inputDate:   { padding: '8px 10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', backgroundColor: '#fff' },
  btnRefresh:  { padding: '8px 14px', border: '1px solid #1a73e8', borderRadius: '8px', fontSize: '13px', color: '#1a73e8', background: '#fff', cursor: 'pointer', fontWeight: '600' },
  btnTambah:   { padding: '8px 16px', border: 'none', borderRadius: '8px', fontSize: '13px', color: '#fff', background: '#1a73e8', cursor: 'pointer', fontWeight: '600' },
  cards:       { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' },
  card:        { backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' },
  cardLabel:   { fontSize: '12px', color: '#888', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' },
  cardValue:   { fontSize: '20px', fontWeight: '800', marginBottom: '4px' },
  cardSub:     { fontSize: '12px', color: '#aaa' },
  searchRow:   { marginBottom: '16px' },
  searchInput: { width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' },
  errorBox:    { backgroundColor: '#fff0f0', border: '1px solid #f5c6c6', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', color: '#c0392b', marginBottom: '16px' },
  loading:     { textAlign: 'center', padding: '48px', color: '#aaa', fontSize: '14px' },
  tableWrap:   { overflowX: 'auto', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' },
  tableScroll: { maxHeight: 'calc(100vh - 320px)', overflowY: 'auto' },
  table:       { width: '100%', borderCollapse: 'collapse', minWidth: '1100px' },
  th:          { padding: '12px 16px', backgroundColor: '#1a73e8', fontSize: '12px', fontWeight: '700', color: '#fff', textAlign: 'left', borderBottom: '1px solid #1558b0', textTransform: 'uppercase', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1 },
  td:          { padding: '11px 16px', fontSize: '13px', color: '#333', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' },
  trEven:      { backgroundColor: '#fafafa' },
  emptyRow:    { textAlign: 'center', padding: '32px', color: '#aaa', fontSize: '14px' },
  badge:       { padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  linkInvoice: { color: '#1a73e8', fontSize: '12px', fontWeight: '600', textDecoration: 'none' },
  aksiRow:     { display: 'flex', gap: '6px', justifyContent: 'center' },
  btnEdit:     { background: '#e8f0fe', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '14px' },
  btnHapus:    { background: '#fce4ec', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '14px' },
  overlay:     { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' },
  modal:       { backgroundColor: '#fff', borderRadius: '16px', maxWidth: '90vw', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', overflow: 'hidden' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #f0f0f0' },
  modalTitle:  { fontSize: '16px', fontWeight: '700', color: '#222' },
  modalClose:  { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#999' },
  modalBody:   { padding: '20px 24px' },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '16px 24px', borderTop: '1px solid #f0f0f0' },
  formGrid:    { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  fieldGroup:  { display: 'flex', flexDirection: 'column', gap: '6px' },
  fieldLabel:  { fontSize: '13px', fontWeight: '600', color: '#555' },
  fieldInput:  { padding: '9px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  btnBatal:    { padding: '9px 20px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', background: '#fff', color: '#555' },
  btnSimpan:   { padding: '9px 24px', border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', background: '#1a73e8', color: '#fff', fontWeight: '600' },
}
