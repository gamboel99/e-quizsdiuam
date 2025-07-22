// Ambil data dari localStorage
const dataSiswa = JSON.parse(localStorage.getItem("dataSiswa"));
const hasilJawaban = JSON.parse(localStorage.getItem("jawabanSiswa"));

fetch("../soal.js")
  .then((res) => res.json())
  .then((dataSoal) => {
    const kontainer = document.getElementById("isi-hasil");
    if (!dataSiswa || !hasilJawaban) {
      kontainer.innerHTML = `<p style="color:red">Data belum lengkap untuk menampilkan hasil ujian.</p>`;
      return;
    }

    let benar = 0;
    let html = `<p><strong>Nama:</strong> ${dataSiswa.nama}<br>
                <strong>Kelas:</strong> ${dataSoal.kelas}<br>
                <strong>Mata Pelajaran:</strong> ${dataSoal.mapel}</p>`;

    html += `<div class="rekap">`;
    html += `<h3>Rekapan Jawaban Pilihan Ganda</h3>`;
    dataSoal.pg.forEach((item, index) => {
      const jawab = hasilJawaban.pg[index] || "(tidak dijawab)";
      const kunci = item.jawaban;
      const kelas = jawab === kunci ? "benar" : "salah";
      if (jawab === kunci) benar++;
      html += `
        <div class="jawaban-box">
          <p><strong>Soal ${index + 1}:</strong> ${item.soal}</p>
          <p>Jawaban Anda: <span class="${kelas}">${jawab}</span></p>
          ${
            jawab !== kunci
              ? `<p>Jawaban Benar: <span class="benar">${kunci}</span></p>`
              : ""
          }
        </div>`;
    });

    // Bagian isian
    html += `<h3>Jawaban Isian Singkat</h3>`;
    dataSoal.isian.forEach((item, i) => {
      const jawab = hasilJawaban.isian[i] || "";
      html += `
        <div class="jawaban-box">
          <p><strong>Soal:</strong> ${item.soal}</p>
          <p>Jawaban Anda: ${jawab}</p>
          <p>Jawaban Benar: <span class="benar">${item.jawaban}</span></p>
        </div>`;
    });

    // Bagian uraian
    html += `<h3>Jawaban Uraian</h3>`;
    dataSoal.uraian.forEach((item, i) => {
      const jawab = hasilJawaban.uraian[i] || "";
      html += `
        <div class="jawaban-box">
          <p><strong>Soal:</strong> ${item.soal}</p>
          <p>Jawaban Anda: ${jawab}</p>
          <p>Jawaban Kunci: <span class="benar">${item.jawaban}</span></p>
        </div>`;
    });

    // Perhitungan nilai akhir
    const totalPG = dataSoal.pg.length;
    const skor = Math.round((benar / totalPG) * 100);
    let predikat = "D";
    let status = "Remidi";

    if (skor >= 90) {
      predikat = "A";
      status = "Lulus";
    } else if (skor >= 80) {
      predikat = "B";
      status = "Lulus";
    } else if (skor >= 70) {
      predikat = "C";
      status = "Lulus";
    }

    html += `<div class="rekap">
      <h3>Hasil Akhir</h3>
      <p><strong>Skor:</strong> ${skor}</p>
      <p><strong>Predikat:</strong> ${predikat}</p>
      <p><strong>Status:</strong> ${status}</p>
    </div>`;

    html += `
      <div class="ttd">
        <div>
          <p>Guru Pengampu</p><br><br><br>
          <p><strong>____________________</strong></p>
        </div>
        <div>
          <p>Wali Murid</p><br><br><br>
          <p><strong>____________________</strong></p>
        </div>
      </div>`;

    kontainer.innerHTML = html;
  })
  .catch((err) => {
    document.getElementById("isi-hasil").innerHTML =
      "Gagal memuat soal.js. Pastikan file tersedia.";
    console.error("Gagal load soal.js", err);
  });
