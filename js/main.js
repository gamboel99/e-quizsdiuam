const nama = localStorage.getItem('nama');
const kelas = localStorage.getItem('kelas');
const mapel = localStorage.getItem('mapel');

document.getElementById('judulUjian').innerText = `Ujian: ${mapel.toUpperCase()} | Nama: ${nama} | Kelas: ${kelas}`;

fetch(`soal/${mapel}.json`)
  .then(res => res.json())
  .then(data => {
    const form = document.getElementById('quizForm');
    let index = 1;
    data.pg.forEach((item, i) => {
      const q = document.createElement('div');
      q.innerHTML = `<p>${index++}. ${item.soal}</p>` +
        item.pilihan.map((p, j) =>
          `<label><input type="radio" name="pg${i}" value="${p}"> ${p}</label><br>`
        ).join('');
      form.appendChild(q);
    });
    data.isian.forEach((item, i) => {
      const q = document.createElement('div');
      q.innerHTML = `<p>${index++}. ${item.soal}</p><input type="text" name="isian${i}"><br>`;
      form.appendChild(q);
    });
    localStorage.setItem('jawabanBenarPG', JSON.stringify(data.pg.map(d => d.jawaban)));
    localStorage.setItem('jawabanBenarIsian', JSON.stringify(data.isian.map(d => d.jawaban.toLowerCase())));
  });

function submitQuiz() {
  const jawabanPG = JSON.parse(localStorage.getItem('jawabanBenarPG'));
  const jawabanIsian = JSON.parse(localStorage.getItem('jawabanBenarIsian'));
  let userJawabanPG = [];
  let userJawabanIsian = [];

  jawabanPG.forEach((_, i) => {
    const val = document.querySelector(`input[name='pg${i}']:checked`);
    userJawabanPG.push(val ? val.value : "-");
  });

  jawabanIsian.forEach((_, i) => {
    const val = document.querySelector(`input[name='isian${i}']`);
    userJawabanIsian.push(val ? val.value : "-");
  });

  localStorage.setItem('jawabanUserPG', JSON.stringify(userJawabanPG));
  localStorage.setItem('jawabanUserIsian', JSON.stringify(userJawabanIsian));

  window.location.href = "result.html";
}
