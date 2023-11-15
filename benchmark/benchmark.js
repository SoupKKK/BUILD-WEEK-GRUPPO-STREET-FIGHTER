const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
  ];

  
let indiceDomandaCorrente = 0
let risposteCorrette = 0
let countdown = 30;
let timerInterval

const timerDisplay = document.getElementById('timer')

const outerCircle = document.getElementById('outer-circle')
const circumference = 2 * Math.PI * parseFloat(outerCircle.getAttribute('r'))

function updateCircle(offset) {
  outerCircle.style.strokeDashoffset = offset
}

function displayTime() {
  const minutes = Math.floor(countdown / 60)
  let seconds = countdown % 60

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  document.getElementById('timer').textContent = `${seconds}`
}

function startTimer() {
  timerInterval = setInterval(() => {
    countdown--;
    displayTime();
    const progress = countdown / 30;
    const offset = circumference * progress;
    updateCircle(offset);

    if (countdown <= 0) {
      clearInterval(timerInterval);
      avanzamentoDomanda();
    }
  }, 1000);
}

function gestisciRisposta(rispostaUtente, rispostaCorretta) {
  const buttons = document.querySelectorAll('li button');
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === rispostaCorretta) {
      button.style.backgroundColor = 'green';
    } else if (button.textContent === rispostaUtente && rispostaUtente !== rispostaCorretta) {
      button.style.backgroundColor = 'red';
    }
  });

  setTimeout(avanzamentoDomanda, 1000);
}

function avanzamentoDomanda() {
  indiceDomandaCorrente++;

  if (indiceDomandaCorrente < questions.length) {
    countdown = 30;
    caricaDomanda();
  } else {
    alert('Fine');
    document.body.style.display = 'none';
  }
}

function caricaDomanda() {
  const domandaCorrente = questions[indiceDomandaCorrente];
  const h1 = document.getElementById('question');
  const ul = document.querySelector('ul');
  const h4 = document.getElementById('contatore');

  h1.textContent = domandaCorrente.question;
  ul.innerHTML = '';
  h4.textContent = `Domanda ${indiceDomandaCorrente + 1}/${questions.length}`;

  const risposte = [domandaCorrente.correct_answer, ...domandaCorrente.incorrect_answers];
  risposte.sort(() => Math.random() - 0.5);

  risposte.forEach((risposta) => {
    const li = document.createElement('li');
    const button = document.createElement('button');

    button.textContent = risposta;
    button.addEventListener('click', () => gestisciRisposta(risposta, domandaCorrente.correct_answer));

    li.appendChild(button);
    ul.appendChild(li);
  });

  startTimer();
}

function startQuiz() {
  const radios = document.getElementsByName('difficulty');
  let selectedDifficulty = '';

  radios.forEach((radio) => {
    if (radio.checked) {
      selectedDifficulty = radio.value;
    }
  });

  if (selectedDifficulty !== '') {
    const difficultySection = document.getElementById('difficulty');
    difficultySection.style.display = 'none';

    const filteredQuestions = questions.filter((question) => question.difficulty === selectedDifficulty);
    startGame(filteredQuestions);
  } else {
    alert('Seleziona una difficoltà!');
  }
}

function startGame(questions) {
  const mainSection = document.querySelector('main');
  mainSection.style.display = 'block'; // Show the main section

  caricaDomanda();
}