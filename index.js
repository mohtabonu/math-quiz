const timerElm = document.querySelector("#timer");
const number1Elm = document.querySelector("#number1");
const number2Elm = document.querySelector("#number2");
const operationElm = document.querySelector("#operation");
const answerBtns = document.querySelectorAll("#variant");
const counterElm = document.querySelector("#quiz-count");

// ! Davlatbek
let time = 15;
let timer;
let count = 1
function startTimer() {
  clearInterval(timer);
  time = 15;
  timerElm.innerText = time;

  timer = setInterval(() => {
    if (time >= 0) {
      timerElm.innerText = time;
      time--;
    } else {
      clearInterval(timer);
      alert("Vaqt tugadi, keyingi savol.");
      init();
    }
  }, 1000);
}

// ! Mohatabonu
function generateQuestion() {
  let number1 = Math.floor(Math.random() * 100);
  let number2 = Math.floor(Math.random() * 100);
  let operations = ["+", "-", "*"];
  let operation = operations[Math.floor(Math.random() * operations.length)];

  let correctAnswer = eval(`${number1} ${operation} ${number2}`);
  let answers = [correctAnswer];

  while (answers.length < 4) {
    let randomAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
    if (!answers.includes(randomAnswer)) answers.push(randomAnswer);
  }
  answers.sort(() => Math.random() - 0.5);
  return { number1, number2, operation, correctAnswer, answers };
}

function renderQuiz(question) {
  number1Elm.innerText = question.number1;
  number2Elm.innerText = question.number2;
  operationElm.innerText = question.operation;

  answerBtns.forEach((btn, i) => {
    btn.innerText = question.answers[i];
    btn.onclick = () =>
      checkAnswer(btn, question.answers[i], question.correctAnswer);
  });
}

function checkAnswer(btn, selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) btn.classList.add("green");
  else btn.classList.add("red");

  setTimeout(() => {
    if (btn.classList.contains("green")) btn.classList.remove("green");
    else btn.classList.remove("red");
    init();
  }, 1000);
}

const questions = [];
function init() {
  let question = generateQuestion();
  questions.push(question);
  renderQuiz(question);
  startTimer();
  counterElm.innerText = `Quiz: ${count}`;
  count++;
}

init();
