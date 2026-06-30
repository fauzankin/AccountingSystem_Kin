import { useState } from 'react';
import { dummyAccountCode } from '../../data/dummyData';

export default function AccountCode() {
  const [data, setData] = useState(dummyAccountCode);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', name: '', id_group: '', tax: 0 });

  const handleSubmit = () => {
    if (!form.code || !form.name) { alert('Kode dan nama wajib diisi!'); return; }
    // Demo: tambah ke state lokal
    setData(prev => [...prev, { id: Date.now(), ...form, group_name: 'Demo Group', tax: Number(form.tax) }]);
    setShowForm(false);
    setForm({ code: '', name: '', id_group: '', tax: 0 });
  };

  const handleDelete = (id) => {
    if (!confirm('Yakin hapus akun ini?')) return;
    // Demo: hapus dari state lokal
    setData(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Master Account Code</h2>
        <button style={styles.btnAdd} onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Batal' : '+ Tambah Akun'}
        </button>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Kode Akun</label>
              <input style={styles.input} value={form.code}
                onChange={e => setForm({ ...form, code: e.target.value })} placeholder="Contoh: 41010" />
            </div>
            <div>
              <label style={styles.label}>Nama Akun</label>
              <input style={styles.input} value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Handling Impor" />
            </div>
            <div>
              <label style={styles.label}>Pajak</label>
              <select style={styles.input} value={form.tax}
                onChange={e => setForm({ ...form, tax: e.target.value })}>
                <option value={0}>Tidak</option>
                <option value={1}>Ya</option>
              </select>
            </div>
          </div>
          <button style={styles.btnSave} onClick={handleSubmit}>💾 Simpan</button>
        </div>
      )}

      <div style={styles.tableWrapper}>
        <div style={styles.tableScroll}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Kode</th>
                <th style={styles.th}>Nama Akun</th>
                <th style={styles.th}>Grup Akun</th>
                <th style={styles.th}>Pajak</th>
                <th style={styles.th}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}><strong>{item.code}</strong></td>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.group_name || '-'}</td>
                  <td style={styles.td}>{item.tax ? '✅' : '❌'}</td>
                  <td style={styles.td}>
                    <button style={styles.btnDelete} onClick={() => handleDelete(item.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
  title: { fontSize: '20px', fontWeight: 'bold', color: '#333' },
  btnAdd: { padding: '10px 16px', backgroundColor: '#1a73e8', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  formCard: { backgroundColor: '#f8f9fa', borderRadius: '12px', padding: '20px', marginBottom: '20px', border: '1px solid #e0e0e0' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  btnSave: { padding: '10px 20px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  tableWrapper: { backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' },
  tableScroll: { maxHeight: 'calc(100vh - 240px)', overflowY: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  thead: { backgroundColor: '#1a73e8', borderBottom: '2px solid #1558b0' },
  th: { padding: '14px', fontSize: '13px', color: '#fff', fontWeight: '600', position: 'sticky', top: 0, backgroundColor: '#1a73e8', zIndex: 1 },
  tr: { borderBottom: '1px solid #eee' },
  td: { padding: '14px', fontSize: '14px', color: '#444' },
  loading: { textAlign: 'center', padding: '40px', color: '#aaa' },
  btnDelete: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' },
};
