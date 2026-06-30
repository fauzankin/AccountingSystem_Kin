# Finance & Accounting Information System

A web-based financial management system built for a transportation & logistics company. This app handles day-to-day finance operations including income, expenses, overhead, fixed assets, and financial reporting.

> **Portfolio project** — all data shown in the live demo is fictional and for demonstration purposes only. Built as a real internal tool, showcased here as a full-stack accounting system.

🔗 **Repository:** [github.com/fauzankin/AccountingSystem_Kin](https://github.com/fauzankin/AccountingSystem_Kin)

---

## Features

| Module | Description |
|---|---|
| **Dashboard** | Monthly income vs. expense summary with surplus/deficit indicator |
| **Account Code (COA)** | Chart of Accounts management |
| **Master Data** | Customer and vendor master data |
| **COA Pendapatan** | Revenue entry by account code with transaction drill-down |
| **Rekap Penerimaan** | Income recap with date range filter |
| **Overhead** | Overhead expense management with status tracking (Pending / Approved / Paid / Cancel) |
| **COA Beban** | Expense entry by account code with transaction drill-down |
| **Rekap Pengeluaran** | Expense recap broken down by Biaya, Submisi, PO, Kas Besar, Hutang Vendor |
| **Rekap Angsuran Aktiva** | Fixed asset installment tracker with payment history |
| **Laporan Laba Rugi** | Income statement with commercial and fiscal correction columns |
| **Neraca** | Balance sheet (assets, liabilities, equity) |
| **Aktiva & Penyusutan** | Fixed asset register with auto-calculated depreciation across 4 categories |

**Authentication** uses a two-step flow: username/password → OTP via email, with JWT token management.

> The live demo runs in **Demo Mode** — login is bypassed and all data is pre-filled with realistic fictional values.

---

## Tech Stack

- **Frontend** — React 19, Vite 8
- **Styling** — Inline styles (zero CSS framework dependency)
- **Auth** — JWT + OTP via email (production backend)
- **Backend** — REST API (separate, private repository)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/fauzankin/AccountingSystem_Kin.git
cd AccountingSystem_Kin

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env and set your API URL (not needed for demo mode)
```

### Running the App

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── assets/             # Static images
├── components/
│   └── layout/         # Navbar, Sidebar, Layout wrapper
├── data/
│   └── dummyData.js    # All demo data (fictional)
└── pages/
    ├── Dashboard.jsx
    ├── Login.jsx
    ├── LabaRugi.jsx
    ├── Neraca.jsx
    ├── Overhead.jsx
    ├── Penyusutan.jsx
    ├── Rekappenerimaan.jsx
    ├── Rekappengeluaran.jsx
    ├── master/
    │   ├── AccountCode.jsx
    │   └── MasterData.jsx
    ├── penerimaan/
    │   └── CoaPendapatan.jsx
    └── pengeluaran/
        ├── CoaBeban.jsx
        └── RekapAngsuranAktiva.jsx
```

---

## Notes

- This project was originally built as a real internal system for a transportation company.
- For portfolio purposes, the company name has been anonymized and all financial data replaced with fictional values.
- The backend API is private and not included in this repository.

---

## Author

**Fauzan Kin**
[github.com/fauzankin](https://github.com/fauzankin)

---

## License

This project is for portfolio purposes. All rights reserved.
