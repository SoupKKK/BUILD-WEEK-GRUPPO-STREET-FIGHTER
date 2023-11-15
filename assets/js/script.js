//welcome

function checkCheckbox() {
    const promiseCheckbox = document.getElementById('promise')
    if (promiseCheckbox.checked) {
        let welcomePage = document.getElementById("welcomePage")
        welcomePage.style.display = 'none'
        let benchmarkPage = document.getElementById("benchmarkPage")
        benchmarkPage.style.display = 'block'
    } else {
        alert("Per procedere, spunta la casella")
        return true
    }
}

//benchmark
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
let countdown = 30;
let timerInterval

const timerDisplay = document.getElementById('timer')

const outerCircle = document.getElementById('outer-circle')
const circumference = 2 * Math.PI * parseFloat(outerCircle.getAttribute('r'))

//funzioni per il timer:
function updateCircle(offset) {
  outerCircle.style.strokeDashoffset = offset
}

function displayTime() {
  const minutes = Math.floor(countdown / 60)
  let seconds = countdown % 60

  document.getElementById('timer').textContent = `${seconds}`
}

function startTimer() {
  timerInterval = setInterval(() => {
    countdown--
    displayTime()
    const progress = countdown / 30
    const offset = circumference * progress
    updateCircle(offset)

    if (countdown <= 0) {
      clearInterval(timerInterval)
      avanzamentoDomanda()
    }
  }, 1000)
}

//funzioni per il quiz:

let risposteCorrette = 0

function gestisciRisposta(rispostaUtente, rispostaCorretta) {
  const buttons = document.querySelectorAll('li button')
  buttons.forEach((button) => {
    button.disabled = true
    if (button.textContent === rispostaCorretta) {
      if (rispostaUtente === rispostaCorretta) {
        button.style.backgroundColor = '#66cdaa';
        risposteCorrette++; 
      }
    } else if (button.textContent === rispostaUtente && rispostaUtente !== rispostaCorretta) {
      button.style.backgroundColor = '#dc143c'
    }
  
  });

  setTimeout(avanzamentoDomanda, 800)
}

function avanzamentoDomanda() {
  indiceDomandaCorrente++;

  if (indiceDomandaCorrente < questions.length) {
    clearInterval(timerInterval)
    countdown = 30
    caricaDomanda()
  } else {
    let benchmarkPage = document.getElementById("benchmarkPage")
    benchmarkPage.style.display = 'none'
    let resultsPage = document.getElementById("resultsPage")
    resultsPage.style.display = 'block'
  }
}

function caricaDomanda() {
  const domandaCorrente = questions[indiceDomandaCorrente]
  const h1 = document.getElementById('question')
  const ul = document.getElementById('answersList')
  const h4 = document.getElementById('contatore')

  h1.textContent = domandaCorrente.question
  ul.innerHTML = ''
  h4.innerHTML = `QUESTION ${indiceDomandaCorrente + 1}/<b>${questions.length}<b>`

  const risposte = [domandaCorrente.correct_answer, ...domandaCorrente.incorrect_answers]
  risposte.sort(() => Math.random() - 0.5)

  risposte.forEach((risposta) => {
    const li = document.createElement('li')
    const button = document.createElement('button')

    button.textContent = risposta
    button.addEventListener('click', () => gestisciRisposta(risposta, domandaCorrente.correct_answer))

    li.appendChild(button)
    ul.appendChild(li)
  });

  startTimer()
}

//funzioni per il selezionamento di difficoltà:
function startQuiz() {
  const radios = document.getElementsByName('difficulty')
  let selectedDifficulty = ''

  radios.forEach((radio) => {
    if (radio.checked) {
      selectedDifficulty = radio.value
    }
  });

  if (selectedDifficulty !== '') {
    const difficultySection = document.getElementById('difficulty')
    difficultySection.style.display = 'none'

    const filteredQuestions = questions.filter((question) => question.difficulty === selectedDifficulty);
    startGame(filteredQuestions)
  } else {
    alert('Seleziona una difficoltà!')
  }
}

function startGame(questions) {
  const mainSection = document.querySelector('main')
  mainSection.style.display = 'block'

  caricaDomanda()
}

//results
console.log(risposteCorrette)
let rispostesbagliate = 10 - risposteCorrette;
let xValues = ["RisposteSbagliate", "RisposteGiuste"];
let yValues = [rispostesbagliate, risposteCorrette];
let barColors = ["#D20094", "#00FFFF"];

function textCenter() {
  const centerText = document.getElementById("centerText");

  if (rispostegiuste >= 6) {
    centerText.innerHTML += "<h3>Congratulations! <br> <span>You passed the exam.</span> </h3> "
  } else {
    centerText.innerHTML += "<h3>I am sorry <br> <span>You didn't manage<br> to pass the examination.</span></h3>";
  }
  centerText.innerHTML += "<br><p>We'll send you the certificate<br>  in few minutes. <br> Check your email (including <br> promotions/spam folder)</p>"
}

textCenter();

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: ['Corrette', 'Errate'],
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      position: 'bottom', 
      fontSize: 20, 
      fontColor: 'white', 
      fontStyle: 'bold' 
    },
    cutoutPercentage: 75, 
    legend: {
      display: false 
    },
    tooltips: {
      enabled: false 
    }
  },
});