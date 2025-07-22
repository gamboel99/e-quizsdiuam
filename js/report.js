window.onload = function () {
  const soal = JSON.parse(localStorage.getItem("soal"));
  const jawaban = JSON.parse(localStorage.getItem("jawaban"));

  // Identitas siswa
  const nama = localStorage.getItem("siswa_nama") || "-";
  const kelas = localStorage.getItem("siswa_kelas") || "-";
  const mapel = localStorage.getItem("siswa_mapel") || "-";

  document.getElementById("namaSiswa").textContent = nama;
  document.getElementById("kelasSiswa").textContent = kelas;
  document.getElementById("mapelSiswa").textContent = mapel;

  const container = document.getElementById("hasilUjian");

  if (!soal || !jawaban) {
    container.innerHTML += "<p>Data belum lengkap untuk menampilkan hasil ujian.</p>";
    return;
  }

  let totalBenar = 0;
  let html = `<h2>Jawaban Pilihan Ganda</h2><table class="rekap"><tr><th>No</th><th>Soal</th><th>Jawaban Siswa</th><th>Jawaban Benar</th></tr>`;
  soal.pg.forEach((item, i) => {
    const jwb = jawaban.pg?.[i] || "";
    const benar = item.jawaban;
    const isBenar = jwb === benar;
    if (isBenar) totalBenar++;
    html += `<tr>
      <td>${i + 1}</td>
      <td>${item.soal}</td>
      <td class="${isBenar ? 'benar' : 'salah'}">${jwb || '-'}</td>
      <td class="benar">${benar}</td>
    </tr>`;
  });
  html += `</table>`;

  html += `<h2>Jawaban Isian</h2><table class="rekap"><tr><th>No</th><th>Soal</th><th>Jawaban Siswa</th><th>Jawaban Benar</th></tr>`;
  soal.isian.forEach((item, i) => {
    const jwb = jawaban.isian?.[i] || "";
    html += `<tr>
      <td>${i + 1}</td>
      <td>${item.soal}</td>
      <td>${jwb || '-'}</td>
      <td class="benar">${item.jawaban}</td>
    </tr>`;
  });
  html += `</table>`;

  html += `<h2>Jawaban Uraian</h2><table class="rekap"><tr><th>No</th><th>Soal</th><th>Jawaban Siswa</th><th>Jawaban Ideal</th></tr>`;
  soal.uraian.forEach((item, i) => {
    const jwb = jawaban.uraian?.[i] || "";
    html += `<tr>
      <td>${i + 1}</td>
      <td>${item.soal}</td>
      <td>${jwb || '-'}</td>
      <td class="benar">${item.jawaban}</td>
    </tr>`;
  });
  html += `</table>`;

  // Skor dan predikat
  const skor = Math.round((totalBenar / soal.pg.length) * 100);
  const predikat =
    skor >= 90 ? "A (Sangat Baik)" :
    skor >= 75 ? "B (Baik)" :
    skor >= 60 ? "C (Cukup)" :
    "D (Perlu Bimbingan)";
  const status = skor >= 75 ? "Lulus" : "Remidi";

  html += `
    <h2>Rekap Nilai</h2>
    <p><strong>Skor:</strong> ${skor}</p>
    <p><strong>Predikat:</strong> ${predikat}</p>
    <p><strong>Status:</strong> ${status}</p>
    <div class="ttd">
      <div><p>Guru Pengampu</p><br><br><br><p>__________________</p></div>
      <div><p>Wali Murid</p><br><br><br><p>__________________</p></div>
    </div>
  `;

  container.innerHTML += html;
};
