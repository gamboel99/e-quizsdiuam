document.addEventListener("DOMContentLoaded", () => {
  renderHasil();
});

function renderHasil() {
  const hasilContainer = document.getElementById("hasil");
  const nama = localStorage.getItem("nama") || "Siswa";
  const kelas = localStorage.getItem("kelas") || "4";
  const mapel = localStorage.getItem("mapel") || "ASWAJA Kelas 4";
  const jawaban = JSON.parse(localStorage.getItem("jawaban") || "[]");
  const kunci = JSON.parse(localStorage.getItem("kunci") || "[]");

  let benar = 0;
  let output = `
    <h2>Rekapan Hasil Ujian</h2>
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
        Jawaban Anda: <strong>${j || '-'}</strong> ${betul ? "✅" : `❌<br>Jawaban Benar: <strong>${kunci[i]}</strong>`}
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
    <div class="rekap">
      <p><strong>Skor:</strong> ${skor}</p>
      <p><strong>Predikat:</strong> ${predikat}</p>
      <p><strong>Status:</strong> ${status}</p>
    </div>
  `;

  hasilContainer.innerHTML = output;
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
  }, 500); // jeda agar isi benar-benar render sebelum cetak
}
