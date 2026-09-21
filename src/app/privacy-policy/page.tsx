import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi (Privacy Policy)',
  description: 'Kebijakan Privasi DriveDirect mengenai pengumpulan data, penggunaan cookie, periklanan pihak ketiga, dan keamanan informasi pengguna.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = '21 September 2026';

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
            <Shield className="h-3.5 w-3.5" />
            <span>Kerahasiaan Data Terjamin</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Kebijakan Privasi
          </h1>
          <p className="text-xs text-slate-500">Terakhir diperbarui: {lastUpdated}</p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">1. Pendahuluan</h2>
            <p>
              Selamat datang di <strong>DriveDirect</strong>. Kami menghargai privasi setiap pengunjung situs kami. Dokumen Kebijakan Privasi ini menjelaskan jenis informasi yang kami kumpulkan atau terima, bagaimana kami menggunakannya, serta langkah-langkah yang kami ambil untuk melindungi informasi Anda.
            </p>
            <p>
              Dengan mengakses dan menggunakan situs web DriveDirect, Anda menyetujui praktik yang dijelaskan dalam Kebijakan Privasi ini.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">2. Informasi File &amp; Unduhan</h2>
            <p>
              DriveDirect adalah alat generator tautan langsung publik. Kami <strong>tidak pernah menyimpan, mengunggah ulang, membaca, atau mendistribusikan isi file</strong> dari tautan Google Drive yang Anda masukkan.
            </p>
            <p>
              Sistem kami hanya membaca metadata publik dari file (seperti nama file dan ukuran) untuk menghasilkan tautan unduhan langsung resmi dari Content Delivery Network (CDN) Google. File diunduh langsung dari server Google ke peramban pengguna.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">3. Penyimpanan Lokal (Local Storage)</h2>
            <p>
              Situs ini menggunakan fitur <code>localStorage</code> peramban Anda semata-mata untuk menyimpan riwayat konversi tautan terakhir demi kenyamanan Anda sendiri. Data ini hanya tersimpan di perangkat Anda dan tidak pernah dikirimkan ke server kami atau pihak ketiga. Anda dapat menghapus data ini kapan saja melalui tombol &quot;Hapus Semua&quot; di halaman beranda atau melalui pengaturan browser Anda.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">4. Log Server &amp; Analitik</h2>
            <p>
              Seperti kebanyakan situs web, server kami dapat mencatat informasi standar internet tertentu secara otomatis saat Anda mengakses situs, termasuk alamat Protokol Internet (IP), jenis peramban, penyedia layanan internet (ISP), halaman rujukan, dan stempel tanggal/waktu. Informasi ini digunakan untuk keperluan diagnostik teknis, pemeliharaan stabilitas server, dan pencegahan penyalahgunaan.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">5. Cookie &amp; Kebijakan Iklan Pihak Ketiga (Google AdSense)</h2>
            <p>
              Situs kami dapat menampilkan iklan yang dikelola oleh mitra pihak ketiga, seperti <strong>Google AdSense</strong>. Mitra pihak ketiga ini dapat menggunakan cookie, web beacon, atau teknologi pelacakan serupa untuk menayangkan iklan yang relevan berdasarkan kunjungan Anda ke situs ini dan situs lain di internet:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-400">
              <li>
                Google menggunakan cookie seperti cookie DoubleClick / DART untuk menayangkan iklan kepada pengguna berdasarkan riwayat kunjungan mereka ke situs kami dan situs lain di internet.
              </li>
              <li>
                Pengguna dapat memilih untuk keluar dari penggunaan cookie DART dengan mengunjungi{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  Kebijakan Privasi Jaringan Iklan dan Konten Google
                </a>.
              </li>
            </ul>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">6. Tautan ke Situs Web Pihak Ketiga</h2>
            <p>
              Situs web kami dapat berisi tautan ke situs web eksternal (seperti Google Drive atau GitHub). Harap diperhatikan bahwa kami tidak memiliki kontrol atas praktik privasi situs web pihak ketiga tersebut. Kami menyarankan Anda membaca kebijakan privasi dari setiap situs web yang Anda kunjungi.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">7. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan, saran, atau kekhawatiran mengenai Kebijakan Privasi ini, silakan hubungi kami melalui halaman{' '}
              <Link href="/contact" className="text-cyan-400 hover:underline">
                Hubungi Kami
              </Link>.
            </p>
          </section>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition shadow-lg shadow-cyan-600/20"
          >
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
