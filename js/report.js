window.onload = function () {
  const soal = JSON.parse(localStorage.getItem("soal"));
  const jawaban = JSON.parse(localStorage.getItem("jawaban"));
  const container = document.getElementById("hasilUjian");
  const nama = localStorage.getItem("siswa_nama") || "-";
  const kelas = localStorage.getItem("siswa_kelas") || "-";
  const mapel = localStorage.getItem("siswa_mapel") || "-";
  document.getElementById("namaSiswa").textContent = nama;
  document.getElementById("kelasSiswa").textContent = kelas;
  document.getElementById("mapelSiswa").textContent = mapel;

  // ... lanjutkan dengan bagian yang memproses soal dan jawaban
}


  if (!soal || !jawaban) {
    container.innerHTML = "<p>Data belum lengkap untuk menampilkan hasil ujian.</p>";
    return;
  }

  let totalBenar = 0;
  let totalPG = soal.pg.length;

  const wrap = document.createElement("div");
  wrap.className = "container";

  // Judul
  wrap.innerHTML += `<h2>Hasil Ujian - ${soal.mapel} Kelas ${soal.kelas}</h2><hr>`;

  // Soal PG
  wrap.innerHTML += `<h3>Jawaban Pilihan Ganda</h3>`;
  soal.pg.forEach((item, index) => {
    const jwb = jawaban.pg[index] || "(kosong)";
    const benar = item.jawaban;
    const isBenar = jwb === benar;
    if (isBenar) totalBenar++;

    wrap.innerHTML += `
      <div class="rekap">
        <p><strong>${index + 1}. ${item.soal}</strong></p>
        <p>Jawaban Anda: <span style="color:${isBenar ? 'green' : 'red'}">${jwb}</span></p>
        ${
          !isBenar
            ? `<p>Jawaban Benar: <span style="color:green">${benar}</span></p>`
            : ""
        }
        <hr>
      </div>`;
  });

  // Soal Isian
  wrap.innerHTML += `<h3>Jawaban Isian Singkat</h3>`;
  soal.isian.forEach((item, index) => {
    const jwb = jawaban.isian[index] || "(kosong)";
    wrap.innerHTML += `
      <div class="rekap">
        <p><strong>${index + 1 + totalPG}. ${item.soal}</strong></p>
        <p>Jawaban Anda: <span>${jwb}</span></p>
        <p>Kunci Jawaban: <span>${item.jawaban}</span></p>
        <hr>
      </div>`;
  });

  // Soal Uraian
  wrap.innerHTML += `<h3>Jawaban Uraian</h3>`;
  soal.uraian.forEach((item, index) => {
    const jwb = jawaban.uraian[index] || "(kosong)";
    wrap.innerHTML += `
      <div class="rekap">
        <p><strong>${index + 1 + totalPG + soal.isian.length}. ${item.soal}</strong></p>
        <p>Jawaban Anda:</p>
        <div style="background:#f9f9f9;padding:10px;border-radius:5px;">${jwb}</div>
        <p>Kunci Jawaban: <span>${item.jawaban}</span></p>
        <hr>
      </div>`;
  });

  // Skor & Kesimpulan
  const skor = Math.round((totalBenar / totalPG) * 100);
  let predikat = "";
  let status = "";

  if (skor >= 90) {
    predikat = "A (Istimewa)";
    status = "Lulus";
  } else if (skor >= 75) {
    predikat = "B (Baik)";
    status = "Lulus";
  } else if (skor >= 60) {
    predikat = "C (Cukup)";
    status = "Remidi";
  } else {
    predikat = "D (Kurang)";
    status = "Remidi";
  }

  wrap.innerHTML += `
    <h3>Rekap Nilai</h3>
    <table style="width:100%;border-collapse:collapse">
      <tr><td>Jumlah Soal PG</td><td>: ${totalPG}</td></tr>
      <tr><td>Jawaban Benar</td><td>: ${totalBenar}</td></tr>
      <tr><td>Skor</td><td>: ${skor}</td></tr>
      <tr><td>Predikat</td><td>: ${predikat}</td></tr>
      <tr><td>Status</td><td>: <strong>${status}</strong></td></tr>
    </table><br>
  `;

  // Tanda tangan
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  wrap.innerHTML += `
    <div style="display:flex;justify-content:space-between;margin-top:40px;">
      <div style="text-align:center;">
        <p>Wali Murid</p><br><br>
        <p>(........................)</p>
      </div>
      <div style="text-align:center;">
        <p>Kediri, ${today}<br>Guru Pengampu</p><br><br>
        <p><strong>(........................)</strong></p>
      </div>
    </div>
    <br><br>
    <center><button onclick="window.print()">🖨️ Cetak / Simpan PDF</button></center>
  `;

  container.appendChild(wrap);
};
