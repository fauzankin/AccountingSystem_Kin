// ============================================================
// DEMO DUMMY DATA — dipakai saat VITE_DEMO_MODE=true
// Semua data di sini adalah fiktif untuk keperluan portofolio
// ============================================================

// ── Dashboard ──────────────────────────────────────────────
export const dummyDashboard = {
  penerimaan: 1_284_500_000,
  pengeluaran: 876_320_000,
}

// ── Rekap Penerimaan ───────────────────────────────────────
export const dummyRekaPenerimaan = [
  { code: '41010', name: 'Jasa Handling Impor',    nilai: 420_000_000 },
  { code: '41020', name: 'Jasa Handling Ekspor',   nilai: 310_500_000 },
  { code: '41030', name: 'Jasa Trucking Lokal',    nilai: 285_000_000 },
  { code: '41040', name: 'Jasa Customs Clearance', nilai: 185_000_000 },
  { code: '41050', name: 'Jasa Pergudangan',        nilai:  84_000_000 },
]

// ── Rekap Pengeluaran ──────────────────────────────────────
export const dummyRekapPengeluaran = [
  { code: '51010', name: 'Biaya BBM & Tol',         total_biaya: 145_000_000, total_submision: 120_000_000, total_po: 25_000_000, total_kasbesar: 80_000_000, total_hutangvendor: 40_000_000 },
  { code: '51020', name: 'Biaya Perawatan Armada',  total_biaya: 98_500_000,  total_submision:  85_000_000, total_po: 13_500_000, total_kasbesar: 55_000_000, total_hutangvendor: 28_000_000 },
  { code: '51030', name: 'Biaya Gaji Sopir',        total_biaya: 210_000_000, total_submision: 210_000_000, total_po:          0, total_kasbesar:          0, total_hutangvendor:          0 },
  { code: '61010', name: 'Biaya Gaji Kantor',       total_biaya: 185_000_000, total_submision: 185_000_000, total_po:          0, total_kasbesar:          0, total_hutangvendor:          0 },
  { code: '61020', name: 'Biaya Sewa Kantor',       total_biaya:  48_000_000, total_submision:           0, total_po:          0, total_kasbesar:          0, total_hutangvendor: 48_000_000 },
  { code: '61030', name: 'Biaya ATK & Perlengkapan',total_biaya:  12_400_000, total_submision:  10_000_000, total_po:  2_400_000, total_kasbesar: 12_400_000, total_hutangvendor:          0 },
]

// ── COA Pendapatan ─────────────────────────────────────────
export const dummyCoaPendapatan = [
  { id: 1, code: '41010', name: 'Jasa Handling Impor',    nilai: 420_000_000 },
  { id: 2, code: '41020', name: 'Jasa Handling Ekspor',   nilai: 310_500_000 },
  { id: 3, code: '41030', name: 'Jasa Trucking Lokal',    nilai: 285_000_000 },
  { id: 4, code: '41040', name: 'Jasa Customs Clearance', nilai: 185_000_000 },
  { id: 5, code: '41050', name: 'Jasa Pergudangan',        nilai:  84_000_000 },
]

export const dummyCoaPendapatanDetail = {
  '41010': [
    { no_regis: 'REG-001', tanggal: '2026-06-02', job_complete: 85_000_000, piutang: 20_000_000, revenue: 65_000_000, no_transaksi: 'TRX-2026-001', group_name: 'Pendapatan Jasa' },
    { no_regis: 'REG-002', tanggal: '2026-06-05', job_complete: 92_000_000, piutang: 15_000_000, revenue: 77_000_000, no_transaksi: 'TRX-2026-002', group_name: 'Pendapatan Jasa' },
    { no_regis: 'REG-003', tanggal: '2026-06-12', job_complete: 120_000_000, piutang: 30_000_000, revenue: 90_000_000, no_transaksi: 'TRX-2026-003', group_name: 'Pendapatan Jasa' },
    { no_regis: 'REG-004', tanggal: '2026-06-20', job_complete: 105_000_000, piutang: 17_000_000, revenue: 88_000_000, no_transaksi: 'TRX-2026-004', group_name: 'Pendapatan Jasa' },
  ],
  '41020': [
    { no_regis: 'REG-011', tanggal: '2026-06-03', job_complete: 75_000_000, piutang: 10_000_000, revenue: 65_000_000, no_transaksi: 'TRX-2026-011', group_name: 'Pendapatan Jasa' },
    { no_regis: 'REG-012', tanggal: '2026-06-14', job_complete: 130_000_000, piutang: 25_000_000, revenue: 105_000_000, no_transaksi: 'TRX-2026-012', group_name: 'Pendapatan Jasa' },
    { no_regis: 'REG-013', tanggal: '2026-06-22', job_complete: 145_000_000, piutang: 4_500_000, revenue: 140_500_000, no_transaksi: 'TRX-2026-013', group_name: 'Pendapatan Jasa' },
  ],
  '41030': [
    { no_regis: 'REG-021', tanggal: '2026-06-01', job_complete: 95_000_000, piutang:  5_000_000, revenue: 90_000_000, no_transaksi: 'TRX-2026-021', group_name: 'Pendapatan Jasa' },
    { no_regis: 'REG-022', tanggal: '2026-06-10', job_complete: 110_000_000, piutang: 15_000_000, revenue: 95_000_000, no_transaksi: 'TRX-2026-022', group_name: 'Pendapatan Jasa' },
    { no_regis: 'REG-023', tanggal: '2026-06-25', job_complete: 100_000_000, piutang:  0,         revenue: 100_000_000, no_transaksi: 'TRX-2026-023', group_name: 'Pendapatan Jasa' },
  ],
}

// ── COA Beban ──────────────────────────────────────────────
export const dummyCoaBeban = [
  { id: 1, code: '51010', name: 'Biaya BBM & Tol',          nilai: 145_000_000 },
  { id: 2, code: '51020', name: 'Biaya Perawatan Armada',   nilai:  98_500_000 },
  { id: 3, code: '51030', name: 'Biaya Gaji Sopir',         nilai: 210_000_000 },
  { id: 4, code: '61010', name: 'Biaya Gaji Kantor',        nilai: 185_000_000 },
  { id: 5, code: '61020', name: 'Biaya Sewa Kantor',        nilai:  48_000_000 },
  { id: 6, code: '61030', name: 'Biaya ATK & Perlengkapan', nilai:  12_400_000 },
]

export const dummyCoaBebanDetail = {
  '51010': [
    { noregis: 'REG-001', tanggal: '2026-06-03', submision: 25_000_000, po: 'PO-101', kasbesar: 18_000_000, hutangvendor: 10_000_000, biaya: 35_000_000, group_name: 'Biaya Operasional' },
    { noregis: 'REG-002', tanggal: '2026-06-10', submision: 30_000_000, po: 'PO-102', kasbesar: 22_000_000, hutangvendor:  8_000_000, biaya: 38_000_000, group_name: 'Biaya Operasional' },
    { noregis: 'REG-003', tanggal: '2026-06-18', submision: 28_000_000, po: 'PO-103', kasbesar: 20_000_000, hutangvendor: 12_000_000, biaya: 40_000_000, group_name: 'Biaya Operasional' },
    { noregis: 'REG-004', tanggal: '2026-06-25', submision: 37_000_000, po: 'PO-104', kasbesar: 20_000_000, hutangvendor: 10_000_000, biaya: 32_000_000, group_name: 'Biaya Operasional' },
  ],
  '51020': [
    { noregis: 'REG-011', tanggal: '2026-06-05', submision: 20_000_000, po: 'PO-201', kasbesar: 15_000_000, hutangvendor: 12_000_000, biaya: 28_000_000, group_name: 'Biaya Operasional' },
    { noregis: 'REG-012', tanggal: '2026-06-15', submision: 35_000_000, po: 'PO-202', kasbesar: 20_000_000, hutangvendor: 16_000_000, biaya: 40_500_000, group_name: 'Biaya Operasional' },
    { noregis: 'REG-013', tanggal: '2026-06-24', submision: 30_000_000, po: 'PO-203', kasbesar: 20_000_000, hutangvendor:          0, biaya: 30_000_000, group_name: 'Biaya Operasional' },
  ],
}

// ── Overhead ───────────────────────────────────────────────
export const dummyOverhead = [
  { id: 1, coa_biaya: '61010', group_account: 'GAJI & TUNJANGAN', Jenis: 'Beban', vendor: 'Karyawan Tetap', rek_tujuan: '1230004567', bank: 'BCA', expense: 85_000_000, payment_method: 'Transfer', tgl_jatuhtempo: '2026-06-05', tgl_payment: '2026-06-05', status: 'Paid',     no_invoice: 'INV-JUNI-001', nomor_bukti: 'BKT-001', description: 'Gaji bulan Juni 2026', approved_by: 'Direktur', remarks: '', cek: 1 },
  { id: 2, coa_biaya: '61020', group_account: 'SEWA KANTOR',      Jenis: 'Beban', vendor: 'PT Graha Properti', rek_tujuan: '0987001234', bank: 'Mandiri', expense: 12_000_000, payment_method: 'Transfer', tgl_jatuhtempo: '2026-06-10', tgl_payment: '2026-06-10', status: 'Paid',     no_invoice: 'INV-SEWA-06', nomor_bukti: 'BKT-002', description: 'Sewa kantor Juni', approved_by: 'Direktur', remarks: '', cek: 1 },
  { id: 3, coa_biaya: '61030', group_account: 'ATK & PERLENGKAPAN',Jenis: 'Beban', vendor: 'Toko Sumber ATK',  rek_tujuan: '',           bank: 'Cash',    expense:  3_400_000, payment_method: 'Cash',     tgl_jatuhtempo: '2026-06-12', tgl_payment: '2026-06-12', status: 'Paid',     no_invoice: 'INV-ATK-012', nomor_bukti: 'BKT-003', description: 'Pembelian ATK kantor', approved_by: 'Admin', remarks: '', cek: 1 },
  { id: 4, coa_biaya: '61040', group_account: 'LISTRIK & TELEPON', Jenis: 'Beban', vendor: 'PLN & Telkom',     rek_tujuan: '',           bank: 'Cash',    expense:  4_200_000, payment_method: 'Transfer', tgl_jatuhtempo: '2026-06-20', tgl_payment: null,           status: 'Approved', no_invoice: 'INV-PLN-06', nomor_bukti: 'BKT-004', description: 'Tagihan listrik & telepon Juni', approved_by: 'Direktur', remarks: '', cek: 0 },
  { id: 5, coa_biaya: '61050', group_account: 'TUNJANGAN JABATAN', Jenis: 'Beban', vendor: 'Manajemen',        rek_tujuan: '3340009876', bank: 'BNI',     expense: 15_000_000, payment_method: 'Transfer', tgl_jatuhtempo: '2026-06-05', tgl_payment: '2026-06-05', status: 'Paid',     no_invoice: 'INV-TJB-06',  nomor_bukti: 'BKT-005', description: 'Tunjangan jabatan Juni', approved_by: 'Direktur', remarks: '', cek: 1 },
  { id: 6, coa_biaya: '61060', group_account: 'ASURANSI',          Jenis: 'Beban', vendor: 'PT Asuransi Maju', rek_tujuan: '5560012345', bank: 'BCA',     expense:  8_500_000, payment_method: 'Transfer', tgl_jatuhtempo: '2026-07-01', tgl_payment: null,           status: 'Pending',  no_invoice: 'INV-ASR-06',  nomor_bukti: 'BKT-006', description: 'Premi asuransi kendaraan', approved_by: '', remarks: 'Menunggu persetujuan', cek: 0 },
]

// ── Laba Rugi ──────────────────────────────────────────────
export const dummyLabaRugi = {
  pendapatan: [
    { code: '41010', coa_name: 'Jasa Handling Impor',    total: 420_000_000 },
    { code: '41020', coa_name: 'Jasa Handling Ekspor',   total: 310_500_000 },
    { code: '41030', coa_name: 'Jasa Trucking Lokal',    total: 285_000_000 },
    { code: '41040', coa_name: 'Jasa Customs Clearance', total: 185_000_000 },
    { code: '41050', coa_name: 'Jasa Pergudangan',        total:  84_000_000 },
  ],
  totalPendapatan: 1_284_500_000,
  bebanOperasional: [
    { code: '51010', coa_name: 'Biaya BBM & Tol',        total: 145_000_000 },
    { code: '51020', coa_name: 'Biaya Perawatan Armada', total:  98_500_000 },
    { code: '51030', coa_name: 'Biaya Gaji Sopir',       total: 210_000_000 },
  ],
  totalBebanOps: 453_500_000,
  labaKotor: 831_000_000,
  bebanKantor: [
    { code: '61010', coa_name: 'Biaya Gaji Kantor',        total: 185_000_000 },
    { code: '61020', coa_name: 'Biaya Sewa Kantor',        total:  48_000_000 },
    { code: '61030', coa_name: 'Biaya ATK & Perlengkapan', total:  12_400_000 },
    { code: '61040', coa_name: 'Biaya Listrik & Telepon',  total:   4_200_000 },
    { code: '61050', coa_name: 'Biaya Tunjangan Jabatan',  total:  15_000_000 },
    { code: '61060', coa_name: 'Biaya Asuransi Kendaraan', total:   8_500_000 },
  ],
  totalBebanKantor: 273_100_000,
  labaBersih: 557_900_000,
}

// ── Neraca ─────────────────────────────────────────────────
export const dummyNeraca = {
  harta_lancar: [
    { label: 'Kas dan Setara Kas',    nilai: 425_000_000 },
    { label: 'Piutang Usaha',         nilai: 310_000_000 },
    { label: 'Perlengkapan Kantor',   nilai:  18_500_000 },
    { label: 'Uang Muka Biaya',       nilai:  45_000_000 },
  ],
  harta_tetap: [
    { label: 'Harga Perolehan Aktiva Tetap', nilai: 3_850_000_000 },
    { label: 'Akumulasi Penyusutan',         nilai:  980_000_000, negatif: true },
  ],
  kewajiban: [
    { label: 'Hutang Pembelian Kendaraan', nilai: 1_240_000_000 },
    { label: 'Hutang Usaha',               nilai:   185_000_000 },
    { label: 'Hutang Pajak',               nilai:    62_000_000 },
    { label: 'Hutang Bank',                nilai:   450_000_000 },
  ],
  modal: [
    { label: 'Modal Disetor',      nilai: 1_500_000_000 },
    { label: 'Laba Ditahan',       nilai:   231_500_000 },
    { label: 'Laba Tahun Berjalan',nilai:   557_900_000 },  // sesuai laba bersih laba rugi
  ],
}

// ── Penyusutan ─────────────────────────────────────────────
export const dummyPenyusutan = [
  { No: 1, jenis: 1, uraian: 'Trailer Hino 500 - 01',       tanggal_perolehan: '2021-03-15', jumlah: 780_000_000, tarif_penyusutan: 12.5, penyusutan_per_tahun: 97_500_000,  penyusutan_per_bulan: 8_125_000,  umur_bulan: 63, umur_tahun: 5.25, tanggal_nilai_buku_0: '2029-03-15', akumulasi_penyusutan: 511_875_000, nilai_buku: 268_125_000 },
  { No: 2, jenis: 1, uraian: 'Trailer Hino 500 - 02',       tanggal_perolehan: '2021-08-20', jumlah: 780_000_000, tarif_penyusutan: 12.5, penyusutan_per_tahun: 97_500_000,  penyusutan_per_bulan: 8_125_000,  umur_bulan: 58, umur_tahun: 4.83, tanggal_nilai_buku_0: '2029-08-20', akumulasi_penyusutan: 471_250_000, nilai_buku: 308_750_000 },
  { No: 3, jenis: 2, uraian: 'Toyota Avanza Operasional',   tanggal_perolehan: '2022-01-10', jumlah: 220_000_000, tarif_penyusutan: 12.5, penyusutan_per_tahun: 27_500_000,  penyusutan_per_bulan: 2_291_667,  umur_bulan: 53, umur_tahun: 4.42, tanggal_nilai_buku_0: '2030-01-10', akumulasi_penyusutan: 121_458_333, nilai_buku:  98_541_667 },
  { No: 4, jenis: 2, uraian: 'Honda Brio Operasional',      tanggal_perolehan: '2023-05-01', jumlah: 175_000_000, tarif_penyusutan: 12.5, penyusutan_per_tahun: 21_875_000,  penyusutan_per_bulan: 1_822_917,  umur_bulan: 37, umur_tahun: 3.08, tanggal_nilai_buku_0: '2031-05-01', akumulasi_penyusutan:  67_447_917, nilai_buku: 107_552_083 },
  { No: 5, jenis: 3, uraian: 'Laptop Dell Latitude (5 unit)',tanggal_perolehan: '2023-01-15', jumlah:  45_000_000, tarif_penyusutan: 25,   penyusutan_per_tahun: 11_250_000,  penyusutan_per_bulan:   937_500,  umur_bulan: 41, umur_tahun: 3.42, tanggal_nilai_buku_0: '2027-01-15', akumulasi_penyusutan:  38_437_500, nilai_buku:   6_562_500 },
  { No: 6, jenis: 3, uraian: 'Meja & Kursi Kantor',         tanggal_perolehan: '2022-06-01', jumlah:  22_000_000, tarif_penyusutan: 25,   penyusutan_per_tahun:  5_500_000,  penyusutan_per_bulan:   458_333,  umur_bulan: 48, umur_tahun: 4.00, tanggal_nilai_buku_0: '2026-06-01', akumulasi_penyusutan:  22_000_000, nilai_buku:           0 },
  { No: 7, jenis: 4, uraian: 'Bangunan Gudang',             tanggal_perolehan: '2020-01-01', jumlah: 850_000_000, tarif_penyusutan:  5,   penyusutan_per_tahun: 42_500_000,  penyusutan_per_bulan: 3_541_667,  umur_bulan: 78, umur_tahun: 6.50, tanggal_nilai_buku_0: '2040-01-01', akumulasi_penyusutan: 275_833_333, nilai_buku: 574_166_667 },
]

// ── Rekap Angsuran Aktiva ──────────────────────────────────
export const dummyAngsuranAktiva = [
  { id_aktiva: 1, uraian: 'Trailer Hino 500 - 01', tanggal_perolehan: '2021-03-15', jumlah: 780_000_000, sisa_perolehan: 780_000_000, lama_angsuran: 60, angsuran_bln: 13_000_000, jlh_angsuran: 60, total_angsuran: 780_000_000, sisa_angsuran: 0 },
  { id_aktiva: 2, uraian: 'Trailer Hino 500 - 02', tanggal_perolehan: '2021-08-20', jumlah: 780_000_000, sisa_perolehan: 780_000_000, lama_angsuran: 60, angsuran_bln: 13_000_000, jlh_angsuran: 55, total_angsuran: 715_000_000, sisa_angsuran: 65_000_000 },
  { id_aktiva: 3, uraian: 'Toyota Avanza Operasional', tanggal_perolehan: '2022-01-10', jumlah: 220_000_000, sisa_perolehan: 220_000_000, lama_angsuran: 48, angsuran_bln: 4_583_333, jlh_angsuran: 48, total_angsuran: 220_000_000, sisa_angsuran: 0 },
]

export const dummyAngsuranAktivaDetail = {
  1: [
    { tanggal: '2021-04-15', jumlah_angsuran: 13_000_000, keterangan: 'Angsuran ke-1' },
    { tanggal: '2021-05-15', jumlah_angsuran: 13_000_000, keterangan: 'Angsuran ke-2' },
    { tanggal: '2021-06-15', jumlah_angsuran: 13_000_000, keterangan: 'Angsuran ke-3' },
  ],
  2: [
    { tanggal: '2021-09-20', jumlah_angsuran: 13_000_000, keterangan: 'Angsuran ke-1' },
    { tanggal: '2021-10-20', jumlah_angsuran: 13_000_000, keterangan: 'Angsuran ke-2' },
  ],
  3: [
    { tanggal: '2022-02-10', jumlah_angsuran: 4_583_333, keterangan: 'Angsuran ke-1' },
    { tanggal: '2022-03-10', jumlah_angsuran: 4_583_333, keterangan: 'Angsuran ke-2' },
  ],
}

// ── Account Code ───────────────────────────────────────────
export const dummyAccountCode = [
  { id: 1,  code: '41010', name: 'Jasa Handling Impor',      group_name: 'Pendapatan Jasa',      tax: 0 },
  { id: 2,  code: '41020', name: 'Jasa Handling Ekspor',     group_name: 'Pendapatan Jasa',      tax: 0 },
  { id: 3,  code: '41030', name: 'Jasa Trucking Lokal',      group_name: 'Pendapatan Jasa',      tax: 0 },
  { id: 4,  code: '41040', name: 'Jasa Customs Clearance',   group_name: 'Pendapatan Jasa',      tax: 1 },
  { id: 5,  code: '41050', name: 'Jasa Pergudangan',          group_name: 'Pendapatan Jasa',      tax: 0 },
  { id: 6,  code: '51010', name: 'Biaya BBM & Tol',          group_name: 'Biaya Operasional',    tax: 0 },
  { id: 7,  code: '51020', name: 'Biaya Perawatan Armada',   group_name: 'Biaya Operasional',    tax: 1 },
  { id: 8,  code: '51030', name: 'Biaya Gaji Sopir',         group_name: 'Biaya Operasional',    tax: 0 },
  { id: 9,  code: '61010', name: 'Biaya Gaji Kantor',        group_name: 'Biaya Administrasi',   tax: 0 },
  { id: 10, code: '61020', name: 'Biaya Sewa Kantor',        group_name: 'Biaya Administrasi',   tax: 1 },
  { id: 11, code: '61030', name: 'Biaya ATK & Perlengkapan', group_name: 'Biaya Administrasi',   tax: 0 },
  { id: 12, code: '61040', name: 'Biaya Listrik & Telepon',  group_name: 'Biaya Administrasi',   tax: 0 },
]

// ── Master Vendor & Customer ───────────────────────────────
export const dummyVendors = [
  { id: 1, name: 'PT Bahan Bakar Nusantara', location_city: 'Jakarta',  code: 'VND-001' },
  { id: 2, name: 'CV Bengkel Armada Jaya',   location_city: 'Bekasi',   code: 'VND-002' },
  { id: 3, name: 'PT Graha Properti',        location_city: 'Jakarta',  code: 'VND-003' },
  { id: 4, name: 'Toko Sumber ATK',          location_city: 'Tangerang',code: 'VND-004' },
  { id: 5, name: 'PT Asuransi Maju',         location_city: 'Jakarta',  code: 'VND-005' },
]

export const dummyCustomers = [
  { id: 1, name: 'PT Pelindo Logistics',      address: 'Jl. Tanjung Priok No. 1, Jakarta Utara', phone: '021-4301234' },
  { id: 2, name: 'CV Maju Makmur Sejahtera', address: 'Jl. Raya Bekasi KM 25, Bekasi',           phone: '021-8891234' },
  { id: 3, name: 'PT Global Indo Trade',      address: 'Jl. Sudirman No. 88, Jakarta Pusat',     phone: '021-5701234' },
  { id: 4, name: 'PT Samudera Cargo',         address: 'Jl. Yos Sudarso No. 10, Jakarta Utara',  phone: '021-4351234' },
  { id: 5, name: 'CV Bintang Selatan',        address: 'Jl. Gatot Subroto No. 45, Jakarta',      phone: '021-5221234' },
]
