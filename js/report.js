
function tampilkanHasil() {
  const nama = localStorage.getItem('nama');
  const kelas = localStorage.getItem('kelas');
  const mapel = localStorage.getItem('mapel');
  const jawabanPG = JSON.parse(localStorage.getItem('jawabanBenarPG'));
  const jawabanIsian = JSON.parse(localStorage.getItem('jawabanBenarIsian'));
  const userJawabanPG = JSON.parse(localStorage.getItem('jawabanUserPG'));
  const userJawabanIsian = JSON.parse(localStorage.getItem('jawabanUserIsian'));

  let benar = 0;
  let total = jawabanPG.length + jawabanIsian.length;

  let html = `<h2>Hasil Ujian</h2>`;
  html += `<p><strong>Nama:</strong> ${nama} | <strong>Kelas:</strong> ${kelas} | <strong>Mapel:</strong> ${mapel}</p>`;
  html += "<hr><h3>Jawaban Pilihan Ganda</h3>";

  jawabanPG.forEach((jawaban, i) => {
    const user = userJawabanPG[i] || "-";
    const isBenar = user === jawaban;
    if (isBenar) benar++;
    html += \`<p>${i+1}. Jawaban Anda: <b style="color:\${isBenar ? 'green' : 'red'}">\${user}</b>\`;
    if (!isBenar) {
      html += \` | Jawaban Benar: <b style="color:green">\${jawaban}</b>\`;
    }
    html += "</p>";
  });

  html += "<h3>Jawaban Isian</h3>";
  jawabanIsian.forEach((jawaban, i) => {
    const user = userJawabanIsian[i] || "-";
    const isBenar = user.toLowerCase().trim() === jawaban.toLowerCase().trim();
    if (isBenar) benar++;
    html += \`<p>${i+1}. Jawaban Anda: <b style="color:\${isBenar ? 'green' : 'red'}">\${user}</b>\`;
    if (!isBenar) {
      html += \` | Jawaban Benar: <b style="color:green">\${jawaban}</b>\`;
    }
    html += "</p>";
  });

  const skor = Math.round((benar / total) * 100);
  let predikat = "D", lulus = "Remidi";
  if (skor >= 86) { predikat = "A"; lulus = "Lulus"; }
  else if (skor >= 76) { predikat = "B"; lulus = "Lulus"; }
  else if (skor >= 61) { predikat = "C"; lulus = "Lulus"; }

  html += "<hr>";
  html += \`<h3>Nilai Akhir: \${skor}</h3>\`;
  html += \`<p>Predikat: <strong>\${predikat}</strong></p>\`;
  html += \`<p>Kesimpulan: <strong>\${lulus}</strong></p>\`;

  document.getElementById('hasil').innerHTML = html;
}

function cetakPDF() {
  const element = document.getElementById('hasil');
  const opt = {
    margin:       0.5,
    filename:     'hasil_ujian.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
}

window.onload = tampilkanHasil;
