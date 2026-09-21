import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Syarat dan Ketentuan Layanan (Terms of Service)',
  description: 'Syarat dan Ketentuan penggunaan layanan Google Drive direct link generator DriveDirect.',
};

export default function TermsPage() {
  const lastUpdated = '21 September 2026';

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
            <FileText className="h-3.5 w-3.5" />
            <span>Ketentuan Penggunaan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Syarat &amp; Ketentuan Layanan
          </h1>
          <p className="text-xs text-slate-500">Terakhir diperbarui: {lastUpdated}</p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">1. Penerimaan Syarat</h2>
            <p>
              Dengan mengakses atau menggunakan layanan <strong>DriveDirect</strong>, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan Layanan ini. Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, Anda tidak diperkenankan menggunakan layanan kami.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">2. Deskripsi Layanan</h2>
            <p>
              DriveDirect menyediakan antarmuka daring untuk membantu pengguna menyusun format tautan unduhan langsung resmi dari Google Drive publik. Layanan ini diberikan secara gratis sebagaimana adanya (&quot;as is&quot;) dan sebagaimana tersedia (&quot;as available&quot;).
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">3. Kebijakan Penggunaan yang Bertanggung Jawab (Fair Use)</h2>
            <p>
              Anda setuju untuk menggunakan DriveDirect hanya untuk tujuan yang sah menurut hukum. Anda dilarang menggunakan layanan kami untuk:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-slate-400">
              <li>Mengunduh atau mendistribusikan konten yang melanggar hak cipta, paten, merek dagang, atau hak kekayaan intelektual pihak lain.</li>
              <li>Menyebarkan malware, virus, trojan, ransomware, atau kode berbahaya lainnya.</li>
              <li>Melakukan serangan penolakan layanan (DDoS) atau upaya otomatis terprogram yang membebani infrastruktur server secara tidak wajar.</li>
              <li>Mengakses file privat tanpa izin sah dari pemilik file.</li>
            </ul>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">4. Hak Cipta &amp; Tanggung Jawab Konten</h2>
            <p>
              DriveDirect <strong>bukanlah penyedia hosting file</strong>. Kami tidak meng-hosting, mengunggah, atau menyimpan file apa pun di server kami. Semua file sepenuhnya berada di server Google Drive dan dikelola oleh pemilik akun Google masing-masing.
            </p>
            <p>
              Tanggung jawab penuh atas legalitas isi file berada pada pengguna yang mengunggah dan membagikan file tersebut. Jika Anda adalah pemilik hak cipta dan menemukan pelanggaran, silakan ajukan laporan DMCA langsung ke Google LLC melalui formulir penghapusan konten Google.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">5. Batasan Tanggung Jawab (Limitation of Liability)</h2>
            <p>
              Dalam batas maksimum yang diizinkan oleh hukum yang berlaku, DriveDirect dan pengembangnya tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan ini, termasuk kegagalan unduhan akibat kuota lalu lintas Google terlampaui atau perubahan kebijakan pihak ketiga.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-white">6. Perubahan Ketentuan</h2>
            <p>
              Kami berhak memperbarui atau mengubah Syarat &amp; Ketentuan Layanan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Penggunaan berkelanjutan atas situs setelah perubahan tersebut merupakan bentuk persetujuan Anda terhadap ketentuan yang diperbarui.
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
