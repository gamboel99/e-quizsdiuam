function renderHasil() {
  const hasilContainer = document.getElementById("hasil");
  const nama = localStorage.getItem("nama") || "Siswa";
  const kelas = localStorage.getItem("kelas") || "4";
  const mapel = localStorage.getItem("mapel") || "ASWAJA Kelas 4";
  const jawaban = JSON.parse(localStorage.getItem("jawaban") || "[]");
  const kunci = JSON.parse(localStorage.getItem("kunci") || "[]");

  let benar = 0;
  let output = `
    <h2 style="text-align:center;">Rekapan Hasil Ujian</h2>
    <p><strong>Nama:</strong> ${nama}<br>
    <strong>Kelas:</strong> ${kelas}<br>
    <strong>Mata Pelajaran:</strong> ${mapel}</p>
    <ol>
  `;

  jawaban.forEach((j, i) => {
    const betul = j === kunci[i];
    if (betul) benar++;
    output += `
      <li>
        Jawaban Anda: <strong>${j || '-'}</strong> ${betul ? "✅" : `❌<br><em>Jawaban Benar: <strong>${kunci[i]}</strong></em>`}
      </li>
    `;
  });

  output += "</ol>";

  const skor = Math.round((benar / kunci.length) * 100);
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

// CETAK PDF - Delay render DOM dan pastikan konten visible
function cetakPDF() {
  const hasil = document.getElementById("hasil");

  // Scroll dulu agar render selesai
  window.scrollTo(0, 0);

  setTimeout(() => {
    html2pdf().set({
      margin: 5,
      filename: 'hasil-ujian.pdf',
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    }).from(hasil).save();
  }, 800); // delay minimal 800ms agar isi ter-render penuh
}

// Jalankan saat halaman selesai dimuat
window.onload = () => {
  renderHasil();
};
