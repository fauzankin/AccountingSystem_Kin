import { useState } from 'react';
import logoNLT from '../assets/LogoNLT.svg';

const API = import.meta.env.VITE_API_URL;

export default function Login({ onLogin }) {
  const [step, setStep]         = useState('login'); // 'login' | 'otp'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp]           = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  // Step 1 — kirim username & password
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uname: username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login gagal');
        return;
      }

      // Berhasil → pindah ke step OTP
      setStep('otp');

    } catch (err) {
      setError('Tidak bisa terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — verifikasi OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uname: username, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'OTP salah');
        return;
      }

      // Simpan token & masuk dashboard
      localStorage.setItem('token', data.token);
      onLogin({ name: data.username, role: data.role });

    } catch (err) {
      setError('Tidak bisa terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.header}>
          <img src={logoNLT} alt="Logo NLT Logistik" style={styles.logo} />
          <h1 style={styles.brandName}>NLT Logistik</h1>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        {/* ── STEP LOGIN ── */}
        {step === 'login' && (
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                style={styles.input}
                required
              />
            </div>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        )}

        {/* ── STEP OTP ── */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} style={styles.form}>
            <p style={styles.otpInfo}>
              Kode OTP telah dikirim ke email kamu. Masukkan kode di bawah.
            </p>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Kode OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Masukkan 6 digit OTP"
                style={styles.input}
                maxLength={6}
                required
              />
            </div>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Memverifikasi...' : 'Verifikasi OTP'}
            </button>
            <button
              type="button"
              onClick={() => { setStep('login'); setError(''); }}
              style={styles.backButton}
            >
              Kembali
            </button>
          </form>
        )}

        <p style={styles.footer}>&copy; 2026 NLT Logistik. All Rights Reserved.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f7fe',
    fontFamily: "'Inter', sans-serif",
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  header: { marginBottom: '30px' },
  logo: { width: '80px', height: 'auto', marginBottom: '15px' },
  brandName: { fontSize: '22px', fontWeight: '800', color: '#1a73e8', margin: '0' },
  form: { textAlign: 'left' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' },
  input: {
    width: '100%', padding: '12px 15px', borderRadius: '10px',
    border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box',
  },
  button: {
    width: '100%', padding: '12px', backgroundColor: '#1a73e8',
    color: '#fff', border: 'none', borderRadius: '10px',
    fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '10px',
  },
  backButton: {
    width: '100%', padding: '12px', backgroundColor: 'transparent',
    color: '#1a73e8', border: '1px solid #1a73e8', borderRadius: '10px',
    fontSize: '14px', cursor: 'pointer', marginTop: '10px',
  },
  otpInfo: { fontSize: '13px', color: '#666', marginBottom: '20px', textAlign: 'center' },
  errorBox: {
    padding: '10px', backgroundColor: '#fff0f0', color: '#c0392b',
    borderRadius: '8px', fontSize: '13px', marginBottom: '20px',
  },
  footer: { marginTop: '30px', fontSize: '12px', color: '#aaa' },
};
