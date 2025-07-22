function renderHasil() {
  const hasilContainer = document.getElementById("hasil");
  const nama = localStorage.getItem("nama") || "Siswa";
  const kelas = localStorage.getItem("kelas") || "4";
  const mapel = localStorage.getItem("mapel") || "ASWAJA";
  const jawaban = JSON.parse(localStorage.getItem("jawaban") || "[]");
  const kunci = JSON.parse(localStorage.getItem("kunci") || "[]");

  let benar = 0;
  let rekap = "<h2>Rekapan Hasil</h2>";
  rekap += `<p><strong>Nama:</strong> ${nama}<br><strong>Kelas:</strong> ${kelas}<br><strong>Mapel:</strong> ${mapel}</p><ol>`;

  for (let i = 0; i < kunci.length; i++) {
    const jwb = jawaban[i] || "-";
    const knc = kunci[i] || "-";
    const isBenar = jwb === knc;
    if (isBenar) benar++;
    rekap += `<li>Jawaban Anda: <strong>${jwb}</strong> ${isBenar ? "✅" : `❌ (Benar: <strong>${knc}</strong>)`}</li>`;
  }

  const skor = Math.round((benar / kunci.length) * 100);
  let predikat = "D", status = "Remidi";
  if (skor >= 85) predikat = "A", status = "Lulus";
  else if (skor >= 70) predikat = "B", status = "Lulus";
  else if (skor >= 60) predikat = "C";

  rekap += `</ol><p><strong>Nilai:</strong> ${skor}</p><p><strong>Predikat:</strong> ${predikat}</p><p><strong>Status:</strong> ${status}</p>`;

  hasilContainer.innerHTML = rekap;
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
    }).from(document.body).save();
  }, 1000);
}
