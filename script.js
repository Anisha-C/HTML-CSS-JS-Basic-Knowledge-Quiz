const questions = [

    {
        question: "What does HTML stand for?",
        choices: ["a. gold", "b. Hypertrophic Management Language", "c. gallium", "d. Helium"],
        answer: "c. gallium"
    },

    {
        question: "What is the difference between a <[p]> and a <[br]>?",
        choices: ["a. gold", "b. gallium", "c. gadolinium", "d. germanium"],
        answer: "c. gallium"
    },
    {
        question: "The CSS property used to specify the transparency of an element is ?",
        choices: ["a. Hover", "b. opacity", "c. clearfix", "d. overlay"],
        answer: "b. opacity"
    },

    {
        question: "Which one of the following tags is used to insert graphics in the webpage?",
        choices: ["a. <image>", "b. <images>", "c. <graphics>", "d. <img>"],
        answer: "d. <img>"
    },

    {
        question: "CSS stands for?",
        choices: ["a. Cascading style sheets", "b. Color and style sheets", "c. Cascade styles sheet", "d. None of the above"],
        answer: "a. Cascading style sheets"
    },

    {
        question: "Which of the following is the correct syntax for referring the external style sheet?",
        choices: [`a. <stylesheet> example.css </stylesheet>`, `b. <style src = "example.css" >`, "c. <style src = example.css>", `d. <link rel="stylesheet" type="text/css" href="example.css">`],
        answer: `d. <link rel=x"stylesheet" type="text/css" href="example.css">`
    },

    {
        question: "Inside the HTML document, where do you place your JavaScript code?",
        choices: ["a. Pm", "b. K", "c. P", "d. Po"],
        answer: "d. K"
    },
    {
        question: "In Javascript, Which of the following type of variable takes precedence over other if names are same?",
        choices: ["a. global variable", "b. local variable", "c. All of the above", "d. Neither"],
        answer: "c. gallium"
    },
    {
        question: "In Javascript, Which of the following function of String object executes the search for a match between a regular expression and a specified string?",
        choices: ["a. match()", "b. concat()", "c. search()", "d. replace()"],
        answer: "c. search()"
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["a. document.write()", "b. console.log()", "c. window.alert()", "d. All of the above"],
        answer: "d. All of the above"
    },

    {
        question: "What does the Javascript “debugger” statement do?",
        choices: ["a. it will debug all errors in the program at runtime", "b. it acts as a break point in the program", "c. it will debug in current statement if there are any", "d. All of the above"],
        answer: "b. it acts as a break point in the porgram"
    },
]

var currentQuestionIndex = 0

var startScreenEl = document.getElementById("startScreen")

var questionsEl = document.getElementById("Questions")

var quizOverEl = document.getElementById("quizOver")

var startEl = document.getElementById("Start")

var questionText = document.getElementById("questionText")

var answerA = document.getElementById("A")
var answerB = document.getElementById("B")
var answerC = document.getElementById("C")
var answerD = document.getElementById("D")
var correctAnswer = document.getElementById("answer")

var score = document.getElementById("totalScore")
var initials = document.getElementById("submitInitials")

var timeLeft = 60
var Timer;
var timeEl = document.getElementById("Time")

timeEl.textContent = timeLeft + " seconds"

function startQuiz() {

    startScreenEl.setAttribute("class", "hide")

    questionsEl.setAttribute("class", "show")

    startTimer()
    displayQuestions()
}


function startTimer() {

    Timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(Timer)
            endQuiz()
        }
        else {
            timeLeft--
            timeEl.textContent = timeLeft + " seconds"
        }
    }, 1000)

}

function displayQuestions() {
    // need logic to check if there even is another question to display
    if (questions[currentQuestionIndex]) {
        questionText.textContent = questions[currentQuestionIndex].question
        answerA.textContent = questions[currentQuestionIndex].choices[0]
        answerB.textContent = questions[currentQuestionIndex].choices[1]
        answerC.textContent = questions[currentQuestionIndex].choices[2]
        answerD.textContent = questions[currentQuestionIndex].choices[3]
    }
    else {
        clearInterval(Timer)
        timeEl.textContent = timeLeft + " seconds"
        endQuiz()
    }

}

function checkAnswer(e) {
    console.log(e.target.textContent)
    if (e.target.textContent === questions[currentQuestionIndex].answer) {
        timeLeft += 10
        correctAnswer.style.display = "block"
        correctAnswer.textContent = questions[currentQuestionIndex].answer
        correctAnswer.style.border = "solid green 3px"
        setTimeout(function () {
            correctAnswer.style.display = "none"
            correctAnswer.textContent = ""
            correctAnswer.style.border = "none"
        }, 1500)
        //correct answer
        console.log("correct")
    } else {
        //wrong answer
        timeLeft -= 10
        correctAnswer.style.display = "block"
        correctAnswer.textContent = questions[currentQuestionIndex].answer
        correctAnswer.style.border = "solid red 3px"
        setTimeout(function () {
            correctAnswer.style.display = "none"
            correctAnswer.textContent = ""
            correctAnswer.style.border = "none"
        }, 1500)
        console.log("wrong")
    }
    currentQuestionIndex += 1
    displayQuestions()
    // increment the current question index

    //display to user right or wrong
    // modify their score + or -
    //then call displayQuestions() to show the next questioon
}

var answer = document.getElementsByClassName("btn")
for (let i = 0; i < answer.length; i++) {
    const element = answer[i];
    element.addEventListener("click", checkAnswer)
}

function endQuiz() {
    questionsEl.style.display = "none"
    quizOverEl.style.display = "block"
    totalScore.textContent = `Your final score is ${timeLeft}`
}

function saveHS() {
    var initial = document.getElementById("initials").value
    if (initial != "") {
        var storeScores = JSON.parse(localStorage.getItem("highscores")) || []
        var currentScore = { name: initial, score: timeLeft }
        storeScores.push(currentScore)
        localStorage.setItem("highscores", JSON.stringify(storeScores))
        window.location.replace("highscores.html")
    }

}

startEl.addEventListener("click", startQuiz);
initials.addEventListener("click", saveHS)
