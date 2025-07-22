
const form = document.getElementById("quizForm");
const judul = document.getElementById("judulUjian");

judul.innerText = `Mata Pelajaran: ${soal.mapel} | Kelas ${soal.kelas}`;
localStorage.setItem("soal", JSON.stringify(soal));

const jawaban = { pg: [], isian: [], uraian: [] };

soal.pg.forEach((item, index) => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `<p>${index + 1}. ${item.soal}</p>`;
  item.pilihan.forEach(pil => {
    div.innerHTML += `<label><input type="radio" name="pg-${index}" value="${pil}"> ${pil}</label>`;
  });
  form.appendChild(div);
});

soal.isian.forEach((item, index) => {
  const nomor = index + soal.pg.length + 1;
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `<p>${nomor}. ${item.soal}</p><input type="text" name="isian-${index}">`;
  form.appendChild(div);
});

soal.uraian.forEach((item, index) => {
  const nomor = index + soal.pg.length + soal.isian.length + 1;
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `<p>${nomor}. ${item.soal}</p><textarea name="uraian-${index}" rows="3" style="width:100%"></textarea>`;
  form.appendChild(div);
});

function submitQuiz() {
  soal.pg.forEach((item, index) => {
    const el = document.querySelector(`input[name="pg-${index}"]:checked`);
    jawaban.pg.push(el ? el.value : "");
  });
  soal.isian.forEach((item, index) => {
    const el = document.querySelector(`input[name="isian-${index}"]`);
    jawaban.isian.push(el ? el.value.trim() : "");
  });
  soal.uraian.forEach((item, index) => {
    const el = document.querySelector(`textarea[name="uraian-${index}"]`);
    jawaban.uraian.push(el ? el.value.trim() : "");
  });
  localStorage.setItem("jawaban", JSON.stringify(jawaban));
  window.location.href = "result.html";
}
