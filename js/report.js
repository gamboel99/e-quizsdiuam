document.addEventListener("DOMContentLoaded", () => {
  renderHasil();
});

// Fungsi utama untuk menampilkan hasil ujian
function renderHasil() {
  const hasil = document.getElementById("hasil");

  // Ambil data dari localStorage
  const nama = localStorage.getItem("nama") || "Tidak diisi";
  const kelas = localStorage.getItem("kelas") || "Tidak diisi";
  const mapel = localStorage.getItem("mapel") || "Tidak diisi";
  const jawaban = JSON.parse(localStorage.getItem("jawaban") || "[]");
  const kunci = JSON.parse(localStorage.getItem("kunci") || "[]");

  // Kalau tidak ada kunci atau jawaban, tetap tampilkan kosong
  if (kunci.length === 0) {
    hasil.innerHTML = "<p>Tidak ada data soal atau kunci jawaban yang ditemukan.</p>";
    return;
  }

  // Hitung skor dan buat tabel jawaban
  let benar = 0;
  let tabelJawaban = `
    <h2>Rekapitulasi Hasil Ujian</h2>
    <p><strong>Nama:</strong> ${nama}<br>
    <strong>Kelas:</strong> ${kelas}<br>
    <strong>Mata Pelajaran:</strong> ${mapel}</p>

    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Jawaban Siswa</th>
          <th>Jawaban Benar</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let i = 0; i < kunci.length; i++) {
    const jwb = jawaban[i] || "-";
    const knc = kunci[i] || "-";
    const isBenar = jwb === knc;

    if (isBenar) benar++;

    tabelJawaban += `
      <tr>
        <td>${i + 1}</td>
        <td style="color: ${isBenar ? 'green' : 'red'};"><strong>${jwb}</strong></td>
        <td style="color: green;"><strong>${knc}</strong></td>
        <td>${isBenar ? '✅ Benar' : '❌ Salah'}</td>
      </tr>
    `;
  }

  // Skor dan status
  const skor = Math.round((benar / kunci.length) * 100);
  let predikat = "D", status = "Remidi";

  if (skor >= 85) {
    predikat = "A";
    status = "Lulus";
  } else if (skor >= 70) {
    predikat = "B";
    status = "Lulus";
  } else if (skor >= 60) {
    predikat = "C";
    status = "Remidi";
  }

  tabelJawaban += `
      </tbody>
    </table>
    <br>
    <p><strong>Skor Akhir:</strong> ${skor}</p>
    <p><strong>Predikat:</strong> ${predikat}</p>
    <p><strong>Status:</strong> ${status}</p>
  `;

  hasil.innerHTML = tabelJawaban;
}

// Fungsi cetak PDF
function cetakPDF() {
  window.scrollTo(0, 0);
  setTimeout(() => {
    html2pdf().set({
      margin: 10,
      filename: 'hasil-ujian.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(document.body).save();
  }, 1000);
}
