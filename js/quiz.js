async function loadSoal() {
  try {
    const res = await fetch("../soal.json"); // atau "soal.js" jika ekstensi .js
    const data = await res.json();

    document.getElementById("judulUjian").innerText =
      `Ujian Mata Pelajaran: ${data.mapel} - Kelas ${data.kelas}`;

    const form = document.getElementById("quizForm");

    // Soal PG
    data.pg.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "question";
      div.innerHTML = `<p>${index + 1}. ${item.soal}</p>`;
      item.pilihan.forEach((pilihan, i) => {
        div.innerHTML += `
          <label>
            <input type="radio" name="pg${index}" value="${pilihan}"> ${pilihan}
          </label>`;
      });
      form.appendChild(div);
    });

    // Soal Isian
    data.isian.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "question";
      div.innerHTML = `
        <p>${index + 1 + data.pg.length}. ${item.soal}</p>
        <input type="text" name="isian${index}" />
      `;
      form.appendChild(div);
    });

    // Soal Uraian
    data.uraian.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "question";
      div.innerHTML = `
        <p>${index + 1 + data.pg.length + data.isian.length}. ${item.soal}</p>
        <textarea name="uraian${index}" rows="4" style="width:100%;padding:5px;"></textarea>
      `;
      form.appendChild(div);
    });

    // Simpan kunci ke localStorage
    localStorage.setItem("soal", JSON.stringify(data));
  } catch (error) {
    alert("Gagal memuat soal: " + error);
  }
}

function submitQuiz() {
  const soal = JSON.parse(localStorage.getItem("soal"));
  const jawaban = {
    pg: [],
    isian: [],
    uraian: [],
  };

  soal.pg.forEach((_, i) => {
    const selected = document.querySelector(`input[name="pg${i}"]:checked`);
    jawaban.pg.push(selected ? selected.value : "");
  });

  soal.isian.forEach((_, i) => {
    const input = document.querySelector(`input[name="isian${i}"]`);
    jawaban.isian.push(input ? input.value.trim() : "");
  });

  soal.uraian.forEach((_, i) => {
    const input = document.querySelector(`textarea[name="uraian${i}"]`);
    jawaban.uraian.push(input ? input.value.trim() : "");
  });

  localStorage.setItem("jawaban", JSON.stringify(jawaban));
  window.location.href = "result.html";
}

window.onload = loadSoal;
