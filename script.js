
const words = "the quick brown fox jumps over the lazy dog this is a fast typing test to check how quickly you can type words accurately speed and accuracy matter here so focus and type well".split(" ");
let currentIndex = 0;
let timer = 60;
let interval;
let typed = 0, correct = 0;

const input = document.getElementById("input");
const wordArea = document.getElementById("word-area");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("start-btn");
const resultBox = document.getElementById("result");
const finalWPM = document.getElementById("final-wpm");
const finalAccuracy = document.getElementById("final-accuracy");

function generateWords() {
  wordArea.innerHTML = "";
  for (let i = 0; i < 50; i++) {
    const span = document.createElement("span");
    span.innerText = words[Math.floor(Math.random() * words.length)];
    span.classList.add("word");
    wordArea.appendChild(span);
    wordArea.appendChild(document.createTextNode(" "));
  }
  highlightWord();
}

function highlightWord() {
  document.querySelectorAll(".word").forEach((el, index) => {
    el.style.background = index === currentIndex ? "#00ffae" : "transparent";
    el.style.color = index === currentIndex ? "#000" : "#fff";
  });
}

function startGame() {
  input.disabled = false;
  input.focus();
  startBtn.style.display = "none";
  generateWords();
  interval = setInterval(() => {
    timer--;
    timerEl.innerText = timer;
    if (timer <= 0) finishGame();
  }, 1000);
}

function finishGame() {
  clearInterval(interval);
  input.disabled = true;
  resultBox.classList.remove("hidden");
  finalWPM.innerText = Math.round((correct / (60 - timer)) * 60);
  finalAccuracy.innerText = typed > 0 ? Math.round((correct / typed) * 100) : 0;
}

input.addEventListener("input", () => {
  const currentWord = document.querySelectorAll(".word")[currentIndex].innerText;
  if (input.value.endsWith(" ")) {
    typed++;
    if (input.value.trim() === currentWord) correct++;
    currentIndex++;
    input.value = "";
    highlightWord();
    wpmEl.innerText = Math.round((correct / (60 - timer)) * 60);
    accuracyEl.innerText = typed > 0 ? Math.round((correct / typed) * 100) : 0;
  }
});

startBtn.addEventListener("click", startGame);
console.log("%c🔐 Developed by SauravRizal Aka CyberXriz", "color: #00ffae; font-size: 16px");
