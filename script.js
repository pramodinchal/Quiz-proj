const questions = [
  {
    question: "Which is the largest animal in the World",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Hippo", correct: false },
    ],
  },
  {
    question: "Which is the largest bird in the World",
    answers: [
      { text: "piegon", correct: false },
      { text: "hen", correct: false },
      { text: "sparrow", correct: false },
      { text: "ostrich", correct: true },
    ],
  },
  {
    question: "Which is the largest State in the India",
    answers: [
      { text: "UP", correct: true },
      { text: "Delhi", correct: false },
      { text: "KA", correct: false },
      { text: "Assam", correct: false },
    ],
  },
  {
    question: "Which is the largest River in the India",
    answers: [
      { text: "Ganga", correct: true },
      { text: "Indus", correct: false },
      { text: "Yamuna", correct: false },
      { text: "Krishna", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " ." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
}

function showScore() {
  resetState();
  if (score == 4) {
    questionElement.innerHTML = `Congrats!!!!! You scored ${score} out of ${questions.length}!`;
  } else {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  }
  nextButton.innerHTML = "Play Again";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
