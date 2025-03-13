const timerElm = document.querySelector("#timer");
const number1Elm = document.querySelector("#number1");
const number2Elm = document.querySelector("#number2");
const operationElm = document.querySelector("#operation");
const answerBtns = document.querySelectorAll("#variant");
const counterElm = document.querySelector("#quiz-count");

// ! Davlatbek
let time = 15;
let timer;
let count = 1;
let answersStatus = [];
let currentQuiz = 1;
let data = {};
function startTimer() {
  clearInterval(timer);
  time = 15;
  timerElm.innerText = time;

  timer = setInterval(() => {
    if (time >= 0) {
      timerElm.innerText = time;
      time--;
    } else {
      answersStatus.push(0);
      currentQuiz++
      clearInterval(timer);
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
  data[currentQuiz] = {
    number1,
    number2,
    operation,
    answers: [...answers],
    correctAnswer
};
}

function renderQuiz(question) {
  console.log(question)
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
  if (selectedAnswer === correctAnswer) {
    btn.classList.add("green");
    answersStatus.push(1);
  } else {
    btn.classList.add("red");
    answersStatus.push(0);
  }
  
  setTimeout(() => {
    if (btn.classList.contains("green")) btn.classList.remove("green");
    else btn.classList.remove("red");
    init();
  }, 1000);
  currentQuiz++
}

// Jasurbek

function showResult() {
  let correctAnswers = 0;
  let inCorrectAnswers = 0;
  answersStatus.forEach((answer) => {
    if (answer) correctAnswers++;
    else inCorrectAnswers++;
  });
  alert(`Tog'ri javoblar: ${correctAnswers} ta,
Noto'g'ri javoblar: ${inCorrectAnswers} ta`);
}
// const questions = [];
function init() {
  generateQuestion();
  let question = data[currentQuiz]
  console.log(question)
  renderQuiz(question);
  startTimer();
  counterElm.innerText = `Quiz: ${currentQuiz}`;
  if (currentQuiz === 11) showResult();
}

init();
