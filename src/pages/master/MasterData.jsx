import { useState } from 'react';
import { dummyVendors, dummyCustomers } from '../../data/dummyData';

export default function MasterData({ type }) {
  const [searchTerm, setSearchTerm] = useState('');

  const config = {
    vendors: {
      title: 'Daftar Vendor',
      cols: ['Nama Vendor', 'Kota', 'Kode'],
      placeholder: 'Cari nama vendor...',
      data: dummyVendors,
    },
    customers: {
      title: 'Daftar Customer',
      cols: ['Nama Customer', 'Alamat', 'Kontak'],
      placeholder: 'Cari nama customer...',
      data: dummyCustomers,
    },
  };

  const current = config[type];
  if (!current) return <div style={{ padding: '20px' }}>Pilih menu di samping.</div>;

  const filteredData = current.data.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location_city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '10px' }}>
      <div style={styles.header}>
        <h2 style={styles.title}>{current.title}</h2>
        
        {/* ── SEARCH BAR ── */}
        <div style={styles.searchContainer}>
          <span style={{ marginRight: '10px' }}>🔍</span>
          <input 
            type="text" 
            placeholder={current.placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.tableCard}>
        <div style={styles.tableScroll}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              {current.cols.map((col) => (
                <th key={col} style={styles.th}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr><td colSpan={3} style={styles.tdCenter}>Data "{searchTerm}" tidak ditemukan.</td></tr>
            ) : (
                filteredData.map((item) => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}><strong>{item.name}</strong></td>
                    <td style={styles.td}>
                      {type === 'vendors' ? (item.location_city || '-') : (item.address || '-')}
                    </td>
                    <td style={styles.td}>
                      {type === 'vendors' ? (item.code || '-') : (item.phone || item.email || '-')}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        </div>
      </div>
      
      <p style={styles.footer}>Menampilkan {filteredData.length} data</p>
    </div>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { fontSize: '22px', fontWeight: '700', color: '#333', margin: 0 },
  searchContainer: { 
    display: 'flex', alignItems: 'center', backgroundColor: '#fff', 
    padding: '8px 15px', borderRadius: '10px', border: '1px solid #ddd', width: '300px' 
  },
  searchInput: { border: 'none', outline: 'none', width: '100%', fontSize: '14px' },
  tableCard: { backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' },
  tableScroll: { maxHeight: 'calc(100vh - 240px)', overflowY: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { backgroundColor: '#1a73e8' },
  th: { padding: '15px', textAlign: 'left', fontSize: '13px', color: '#fff', borderBottom: '2px solid #1558b0', position: 'sticky', top: 0, backgroundColor: '#1a73e8', zIndex: 1 },
  tr: { borderBottom: '1px solid #f1f1f1' },
  td: { padding: '15px', fontSize: '14px', color: '#444' },
  tdCenter: { padding: '40px', textAlign: 'center', color: '#999' },
  footer: { marginTop: '15px', fontSize: '12px', color: '#888' }
};
