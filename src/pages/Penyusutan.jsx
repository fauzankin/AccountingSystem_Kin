import { useState } from 'react'
import { dummyPenyusutan } from '../data/dummyData'

const formatRp = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID')
const formatPersen = (val) => Number(val || 0) + '%'
const formatTanggal = (val) => {
  if (!val) return '-'
  return new Date(val).toLocaleDateString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

const kategoriMap = {
  1: 'Kendaraan Project',
  2: 'Kendaraan Operasional',
  3: 'Inventaris dan Furniture',
  4: 'Bangunan'
}
const kategoriList = [1, 2, 3, 4]

const formKosong = {
  uraian: '',
  tanggal_perolehan: '',
  jumlah: '',
  tarif_penyusutan: '',
  jenis: '1',
}

export default function Penyusutan() {
  const today = new Date().toISOString().slice(0, 10)
  const [tglHitung, setTglHitung] = useState(today)
  const [data, setData] = useState(dummyPenyusutan)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('tambah')
  const [form, setForm] = useState(formKosong)
  const [editNo, setEditNo] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Demo: refresh hanya reset ke data awal
  const fetchData = () => setData(dummyPenyusutan)

  const getByKategori = (kat) => data.filter(d => Number(d.jenis) === kat)

  const totalByKategori = (kat) => {
    const items = getByKategori(kat)
    return {
      jumlah: items.reduce((s, d) => s + Number(d.jumlah || 0), 0),
      penyusutan_per_tahun: items.reduce((s, d) => s + Number(d.penyusutan_per_tahun || 0), 0),
      penyusutan_per_bulan: items.reduce((s, d) => s + Number(d.penyusutan_per_bulan || 0), 0),
      akumulasi_penyusutan: items.reduce((s, d) => s + Number(d.akumulasi_penyusutan || 0), 0),
      nilai_buku: items.reduce((s, d) => s + Number(d.nilai_buku || 0), 0),
    }
  }

  const grandTotal = {
    jumlah: data.reduce((s, d) => s + Number(d.jumlah || 0), 0),
    penyusutan_per_tahun: data.reduce((s, d) => s + Number(d.penyusutan_per_tahun || 0), 0),
    penyusutan_per_bulan: data.reduce((s, d) => s + Number(d.penyusutan_per_bulan || 0), 0),
    akumulasi_penyusutan: data.reduce((s, d) => s + Number(d.akumulasi_penyusutan || 0), 0),
    nilai_buku: data.reduce((s, d) => s + Number(d.nilai_buku || 0), 0),
  }

  const bukaTambah = () => {
    setModalMode('tambah')
    setForm(formKosong)
    setEditNo(null)
    setSaveError('')
    setShowModal(true)
  }

  const bukaEdit = (row) => {
    setModalMode('edit')
    setForm({
      uraian: row.uraian || '',
      tanggal_perolehan: row.tanggal_perolehan
        ? new Date(row.tanggal_perolehan).toISOString().slice(0, 10)
        : '',
      jumlah: row.jumlah || '',
      tarif_penyusutan: row.tarif_penyusutan || '',
      jenis: String(row.jenis || '1'),
    })
    setEditNo(row.No)
    setSaveError('')
    setShowModal(true)
  }

  const tutupModal = () => { setShowModal(false); setSaveError('') }

  // Demo: simpan hanya tutup modal tanpa benar-benar mengubah data
  const handleSimpan = () => {
    if (!form.uraian || !form.tanggal_perolehan || !form.jumlah || !form.tarif_penyusutan) {
      setSaveError('Semua field wajib diisi')
      return
    }
    tutupModal()
  }

  return (
    <div style={s.container}>

      {/* Header */}
      <div style={s.headerRow}>
        <div>
          <h2 style={s.title}>Daftar Aktiva Tetap & Penyusutan</h2>
          <p style={s.subtitle}>PT Nusantara Logistik Trans</p>
        </div>
        <div style={s.filterRow}>
          <label style={s.filterLabel}>Tanggal</label>
          <input
            type="date"
            value={tglHitung}
            max={today}
            onChange={e => setTglHitung(e.target.value)}
            style={s.inputDate}
          />
          <button onClick={fetchData} style={s.btnRefresh}>🔄 Refresh</button>
          <button onClick={bukaTambah} style={s.btnTambah}>+ Tambah</button>
        </div>
      </div>

      {error && <div style={s.errorBox}>⚠️ {error}</div>}

      <div style={s.reportCard}>
          <div style={s.reportHeader}>
            <div style={s.reportCompany}>PT NUSANTARA LOGISTIK TRANS</div>
            <div style={s.reportTitle}>DAFTAR AKTIVA TETAP</div>
            <div style={s.reportPeriod}>Per {formatTanggal(tglHitung)}</div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <div style={s.tableScroll}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={{...s.th, width: '40px'}}>No</th>
                  <th style={s.th}>Uraian</th>
                  <th style={{...s.th, textAlign: 'center'}}>Tgl Perolehan</th>
                  <th style={{...s.th, textAlign: 'right'}}>Harga Perolehan</th>
                  <th style={{...s.th, textAlign: 'center'}}>Tarif</th>
                  <th style={{...s.th, textAlign: 'right'}}>Penyusutan/Tahun</th>
                  <th style={{...s.th, textAlign: 'right'}}>Penyusutan/Bulan</th>
                  <th style={{...s.th, textAlign: 'center'}}>Umur (Bln)</th>
                  <th style={{...s.th, textAlign: 'center'}}>Umur (Thn)</th>
                  <th style={{...s.th, textAlign: 'center'}}>Tgl Nilai Buku 0</th>
                  <th style={{...s.th, textAlign: 'right'}}>Akm. Penyusutan</th>
                  <th style={{...s.th, textAlign: 'right'}}>Nilai Buku</th>
                  <th style={{...s.th, textAlign: 'center'}}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={13} style={s.emptyRow}>Belum ada data</td>
                  </tr>
                ) : (
                  kategoriList.map((kat, ki) => {
                    const items = getByKategori(kat)
                    const sub = totalByKategori(kat)
                    return (
                      <>
                        <tr key={`kat-${ki}`}>
                          <td colSpan={13} style={s.sectionRow}>
                            {String.fromCharCode(65 + ki)}. {kategoriMap[kat].toUpperCase()}
                          </td>
                        </tr>

                        {items.length === 0 ? (
                          <tr key={`empty-${ki}`}>
                            <td colSpan={13} style={s.emptyRow}>Belum ada data</td>
                          </tr>
                        ) : (
                          items.map((d, i) => (
                            <tr key={`${ki}-${i}`} style={i % 2 === 0 ? s.trEven : {}}>
                              <td style={s.tdNo}>{i + 1}</td>
                              <td style={s.td}>{d.uraian}</td>
                              <td style={{...s.td, textAlign: 'center'}}>{formatTanggal(d.tanggal_perolehan)}</td>
                              <td style={{...s.td, textAlign: 'right'}}>{formatRp(d.jumlah)}</td>
                              <td style={{...s.td, textAlign: 'center'}}>{formatPersen(d.tarif_penyusutan)}</td>
                              <td style={{...s.td, textAlign: 'right', color: '#c62828'}}>{formatRp(d.penyusutan_per_tahun)}</td>
                              <td style={{...s.td, textAlign: 'right', color: '#e65100'}}>{formatRp(d.penyusutan_per_bulan)}</td>
                              <td style={{...s.td, textAlign: 'center'}}>{d.umur_bulan}</td>
                              <td style={{...s.td, textAlign: 'center'}}>{d.umur_tahun}</td>
                              <td style={{...s.td, textAlign: 'center'}}>{formatTanggal(d.tanggal_nilai_buku_0)}</td>
                              <td style={{...s.td, textAlign: 'right', color: '#6a1b9a'}}>{formatRp(d.akumulasi_penyusutan)}</td>
                              <td style={{...s.td, textAlign: 'right', color: '#2e7d32'}}>{formatRp(d.nilai_buku)}</td>
                              <td style={{...s.td, textAlign: 'center'}}>
                                <button
                                  onClick={() => bukaEdit(d)}
                                  style={s.btnEdit}
                                >
                                  ✏️
                                </button>
                              </td>
                            </tr>
                          ))
                        )}

                        <tr key={`sub-${ki}`}>
                          <td colSpan={3} style={s.subtotalCell}>Jumlah {kategoriMap[kat]}</td>
                          <td style={{...s.subtotalCell, textAlign: 'right'}}>{formatRp(sub.jumlah)}</td>
                          <td style={s.subtotalCell}></td>
                          <td style={{...s.subtotalCell, textAlign: 'right', color: '#c62828'}}>{formatRp(sub.penyusutan_per_tahun)}</td>
                          <td style={{...s.subtotalCell, textAlign: 'right', color: '#e65100'}}>{formatRp(sub.penyusutan_per_bulan)}</td>
                          <td style={s.subtotalCell}></td>
                          <td style={s.subtotalCell}></td>
                          <td style={s.subtotalCell}></td>
                          <td style={{...s.subtotalCell, textAlign: 'right', color: '#6a1b9a'}}>{formatRp(sub.akumulasi_penyusutan)}</td>
                          <td style={{...s.subtotalCell, textAlign: 'right', color: '#2e7d32'}}>{formatRp(sub.nilai_buku)}</td>
                          <td style={s.subtotalCell}></td>
                        </tr>
                      </>
                    )
                  })
                )}

                <tr>
                  <td colSpan={3} style={s.grandTotalCell}>TOTAL</td>
                  <td style={{...s.grandTotalCell, textAlign: 'right'}}>{formatRp(grandTotal.jumlah)}</td>
                  <td style={s.grandTotalCell}></td>
                  <td style={{...s.grandTotalCell, textAlign: 'right'}}>{formatRp(grandTotal.penyusutan_per_tahun)}</td>
                  <td style={{...s.grandTotalCell, textAlign: 'right'}}>{formatRp(grandTotal.penyusutan_per_bulan)}</td>
                  <td style={s.grandTotalCell}></td>
                  <td style={s.grandTotalCell}></td>
                  <td style={s.grandTotalCell}></td>
                  <td style={{...s.grandTotalCell, textAlign: 'right'}}>{formatRp(grandTotal.akumulasi_penyusutan)}</td>
                  <td style={{...s.grandTotalCell, textAlign: 'right'}}>{formatRp(grandTotal.nilai_buku)}</td>
                  <td style={s.grandTotalCell}></td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>

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

      {/* ── MODAL ── */}
      {showModal && (
        <div style={s.overlay} onClick={tutupModal}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <h3 style={s.modalTitle}>
                {modalMode === 'tambah' ? '+ Tambah Aktiva' : '✏️ Edit Aktiva'}
              </h3>
              <button onClick={tutupModal} style={s.modalClose}>✕</button>
            </div>

            <div style={s.modalBody}>
              {/* Kategori */}
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Kategori</label>
                <select
                  value={form.jenis}
                  onChange={e => setForm({...form, jenis: e.target.value})}
                  style={s.fieldInput}
                >
                  {kategoriList.map(k => (
                    <option key={k} value={k}>{kategoriMap[k]}</option>
                  ))}
                </select>
              </div>

              {/* Uraian */}
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Uraian / Nama Aset</label>
                <input
                  type="text"
                  value={form.uraian}
                  onChange={e => setForm({...form, uraian: e.target.value})}
                  placeholder="contoh: Trailer, Laptop, Meja"
                  style={s.fieldInput}
                />
              </div>

              {/* Tanggal Perolehan */}
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Tanggal Perolehan</label>
                <input
                  type="date"
                  value={form.tanggal_perolehan}
                  onChange={e => setForm({...form, tanggal_perolehan: e.target.value})}
                  style={s.fieldInput}
                />
              </div>

              {/* Harga Perolehan */}
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Harga Perolehan (Rp)</label>
                <input
                  type="number"
                  value={form.jumlah}
                  onChange={e => setForm({...form, jumlah: e.target.value})}
                  placeholder="contoh: 430000000"
                  style={s.fieldInput}
                />
              </div>

              {/* Tarif Penyusutan */}
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Tarif Penyusutan (%/tahun)</label>
                <input
                  type="number"
                  value={form.tarif_penyusutan}
                  onChange={e => setForm({...form, tarif_penyusutan: e.target.value})}
                  placeholder="contoh: 12.5"
                  step="0.1"
                  style={s.fieldInput}
                />
              </div>

              {saveError && <div style={s.saveError}>⚠️ {saveError}</div>}
            </div>

            <div style={s.modalFooter}>
              <button onClick={tutupModal} style={s.btnBatal}>Batal</button>
              <button onClick={handleSimpan} disabled={saving} style={s.btnSimpan}>
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
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
  btnTambah: { padding: '8px 16px', border: 'none', borderRadius: '8px', fontSize: '13px', color: '#fff', background: '#1a73e8', cursor: 'pointer', fontWeight: '600' },
  btnEdit: { background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', padding: '2px 6px', borderRadius: '4px' },
  errorBox: { backgroundColor: '#fff0f0', border: '1px solid #f5c6c6', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', color: '#c0392b', marginBottom: '16px' },
  loading: { textAlign: 'center', padding: '48px', color: '#aaa', fontSize: '14px' },
  reportCard: { backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden' },
  reportHeader: { padding: '24px', textAlign: 'center', borderBottom: '2px solid #e0e0e0' },
  reportCompany: { fontSize: '16px', fontWeight: '800', color: '#222', marginBottom: '4px' },
  reportTitle: { fontSize: '14px', fontWeight: '700', color: '#444', marginBottom: '4px' },
  reportPeriod: { fontSize: '13px', color: '#888' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '1300px' },
  th: { padding: '12px 16px', backgroundColor: '#1a73e8', fontSize: '11px', fontWeight: '700', color: '#fff', textAlign: 'left', borderBottom: '2px solid #1558b0', textTransform: 'uppercase', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1 },
  td: { padding: '10px 16px', fontSize: '13px', color: '#333', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' },
  tdNo: { padding: '10px 16px', fontSize: '13px', color: '#888', borderBottom: '1px solid #f0f0f0', textAlign: 'center' },
  trEven: { backgroundColor: '#fafafa' },
  sectionRow: { padding: '10px 16px', backgroundColor: '#e8f0fe', color: '#1a73e8', fontWeight: '700', fontSize: '13px', borderTop: '2px solid #1a73e8', borderBottom: '1px solid #c5d8f8' },
  emptyRow: { textAlign: 'center', padding: '20px', color: '#aaa', fontSize: '13px', fontStyle: 'italic', borderBottom: '1px solid #f0f0f0' },
  subtotalCell: { padding: '10px 16px', backgroundColor: '#f5f5f5', fontWeight: '700', fontSize: '13px', color: '#333', borderTop: '2px solid #e0e0e0', borderBottom: '2px solid #e0e0e0', whiteSpace: 'nowrap' },
  grandTotalCell: { padding: '14px 16px', backgroundColor: '#1a73e8', fontWeight: '800', fontSize: '13px', color: '#fff', borderTop: '3px solid #1558b0', whiteSpace: 'nowrap' },
  footer: { padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #e0e0e0' },
  footerDate: { fontSize: '13px', color: '#555' },
  footerSign: { textAlign: 'center' },
  footerName: { fontSize: '13px', fontWeight: '700', color: '#222', marginTop: '40px' },
  footerTitle: { fontSize: '12px', color: '#888' },
  // Modal
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' },
  modal: { backgroundColor: '#fff', borderRadius: '16px', width: '460px', maxWidth: '90vw', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', overflow: 'hidden' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #f0f0f0' },
  modalTitle: { fontSize: '16px', fontWeight: '700', color: '#222' },
  modalClose: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#999', lineHeight: 1 },
  modalBody: { padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '16px 24px', borderTop: '1px solid #f0f0f0' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  fieldLabel: { fontSize: '13px', fontWeight: '600', color: '#555' },
  fieldInput: { padding: '9px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', outline: 'none' },
  saveError: { backgroundColor: '#fff0f0', border: '1px solid #f5c6c6', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#c0392b' },
  btnBatal: { padding: '9px 20px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', background: '#fff', color: '#555' },
  btnSimpan: { padding: '9px 24px', border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', background: '#1a73e8', color: '#fff', fontWeight: '600' },
}