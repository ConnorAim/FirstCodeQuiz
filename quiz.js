const questions = [
    {
        question: "What is the name of the angry ball that attacks players on the quidditch pitch?",
        answers: [
            { text: "Snitch", correct: false},
            { text: "Quaffle", correct: false},
            { text: "Bludger", correct: true},
            { text: "Seeker", correct: false},
            { text: "Stinger", correct: false},
        ]
    },
    {
        question: "What is the name of the pub at the entrance to Diagon Alley?",
        answers: [
            { text: "The Leaky Cauldron", correct: true},
            { text: "Honeydukes", correct: false},
            { text: "Gringotts", correct: false},
            { text: "The Three Broomsticks", correct: false},
            { text: "The apothecary", correct: false},
        ]
    },
    {
        question: "What do the students call the Gryffindor ghost?",
        answers: [
            { text: "Grey Lady", correct: false},
            { text: "Peeves", correct: false},
            { text: "Fat friar", correct: false},
            { text: "Nearly Headless Nick", correct: true},
            { text: "Bloody Baron", correct: false},
        ]
    },
    {
        question: "In Book 3, what is Neville Longbottoms greatest fear, revealed upon facing a boggart in Lupins class?",
        answers: [
            { text: "Spiders", correct: false},
            { text: "Rats", correct: false},
            { text: "Dementor", correct: false},
            { text: "Professor Snape", correct: true},
            { text: "Werewolf", correct: false},
        ]
    },
    {
        question: "The wizarding version of marbles is called what?",
        answers: [
            { text: "Wizballs", correct: false},
            { text: "Gobstones", correct: true},
            { text: "Magicballs", correct: false},
            { text: "Wizardbowling", correct: false},
            { text: "Hogstones", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
   
startQuiz();
