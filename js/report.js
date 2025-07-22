
document.addEventListener("DOMContentLoaded", () => {
  renderHasil();
});

function renderHasil() {
  const hasilContainer = document.getElementById("hasil");
  const nama = localStorage.getItem("nama") || "Siswa";
  const kelas = localStorage.getItem("kelas") || "4";
  const mapel = localStorage.getItem("mapel") || "ASWAJA Kelas 4";
  let jawaban = [];
  let kunci = [];

  try {
    jawaban = JSON.parse(localStorage.getItem("jawaban") || "[]");
    kunci = JSON.parse(localStorage.getItem("kunci") || "[]");
  } catch (e) {
    console.error("Gagal memuat data jawaban atau kunci:", e);
  }

  let benar = 0;
  let output = `
    <h2 style="text-align:center;">Rekapan Hasil Ujian</h2>
    <p><strong>Nama:</strong> ${nama}<br>
    <strong>Kelas:</strong> ${kelas}<br>
    <strong>Mata Pelajaran:</strong> ${mapel}</p>
    <ol>
  `;

  for (let i = 0; i < kunci.length; i++) {
    const j = jawaban[i] || '-';
    const k = kunci[i] || '-';
    const betul = j === k;
    if (betul) benar++;
    output += `
      <li>
        Jawaban Anda: <strong>${j}</strong> ${betul ? "✅" : `❌<br><em>Jawaban Benar: <strong>${k}</strong></em>`}
      </li>
    `;
  }

  output += "</ol>";

  const skor = kunci.length > 0 ? Math.round((benar / kunci.length) * 100) : 0;
  let predikat = "D", status = "Remidi";
  if (skor >= 85) predikat = "A", status = "Lulus";
  else if (skor >= 70) predikat = "B", status = "Lulus";
  else if (skor >= 60) predikat = "C";

  output += `
    <div class="rekap" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; background: #f8f8f8;">
      <p><strong>Skor:</strong> ${skor}</p>
      <p><strong>Predikat:</strong> ${predikat}</p>
      <p><strong>Status:</strong> ${status}</p>
    </div>
  `;

  hasilContainer.innerHTML = output;
}

function cetakPDF() {
  const hasil = document.getElementById("hasil");
  window.scrollTo(0, 0);
  setTimeout(() => {
    html2pdf().set({
      margin: 10,
      filename: 'hasil-ujian.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(hasil).save();
  }, 800);
}
