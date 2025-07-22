document.addEventListener("DOMContentLoaded", () => {
  renderHasil();
});

function renderHasil() {
  const hasilContainer = document.getElementById("hasil");
  const nama = localStorage.getItem("nama") || "Siswa";
  const kelas = localStorage.getItem("kelas") || "4";
  const mapel = localStorage.getItem("mapel") || "ASWAJA";
  let jawaban = [];
  let kunci = [];

  try {
    jawaban = JSON.parse(localStorage.getItem("jawaban") || "[]");
    kunci = JSON.parse(localStorage.getItem("kunci") || "[]");
  } catch (e) {
    hasilContainer.innerHTML = "<p>Gagal memuat data jawaban atau kunci.</p>";
    return;
  }

  if (!Array.isArray(jawaban) || !Array.isArray(kunci) || kunci.length === 0) {
    hasilContainer.innerHTML = "<p>Data belum lengkap untuk menampilkan hasil ujian.</p>";
    return;
  }

  let benar = 0;
  let isi = `<h2>Rekapan Hasil Ujian</h2>
    <p><strong>Nama:</strong> ${nama}<br><strong>Kelas:</strong> ${kelas}<br><strong>Mapel:</strong> ${mapel}</p>
    <ol>`;

  for (let i = 0; i < kunci.length; i++) {
    const jwb = jawaban[i] || "-";
    const knc = kunci[i] || "-";
    const cocok = jwb === knc;
    if (cocok) benar++;
    isi += `<li>Jawaban Anda: <strong>${jwb}</strong> ${cocok ? "✅" : `❌ (Benar: <strong>${knc}</strong>)`}</li>`;
  }

  isi += "</ol>";

  const skor = Math.round((benar / kunci.length) * 100);
  let predikat = "D", status = "Remidi";
  if (skor >= 85) predikat = "A", status = "Lulus";
  else if (skor >= 70) predikat = "B", status = "Lulus";
  else if (skor >= 60) predikat = "C";

  isi += `
    <div style="margin-top: 20px; background: #f2f2f2; padding: 15px;">
      <p><strong>Skor:</strong> ${skor}</p>
      <p><strong>Predikat:</strong> ${predikat}</p>
      <p><strong>Status:</strong> ${status}</p>
    </div>
  `;

  hasilContainer.innerHTML = isi;
}

function cetakPDF() {
  const hasil = document.getElementById("hasil");
  setTimeout(() => {
    html2pdf().set({
      margin: 10,
      filename: 'hasil-ujian.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(hasil).save();
  }, 1000);
}
