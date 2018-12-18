//  Start Game
let q = 0;
let timerSteps = 30;
let delay = 4;
let timerInt = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let unanswered = 0;

const triviaGame = {
    startGame: () => {
        $("#start").css("display","none");
        $(".content").css("display","block");
        $("#question").css("display","block");
        $("#answers").css("display","block");
    },
    
    showTimer: () => {
        $("#timer").css("display","block");
    },
    
    showQuestion: () => {
        let answersArray = questions[q]["answers"];

        $("#question").html("<p>" + questions[q]["question"] + "<p>");

        answersArray.forEach((element, index) => {
            $("#answers").append(`<button type = "button" class = "btn btn-dark answer" data-answer = "${index}">${element}</button>`);
        });

        //  Arrow functions don't bind this, so don't use one here
        $(".answer").on("click",function() {
            triviaGame.checkAnswer($(this).attr("data-answer"));
        });
    },
    
    startTimer: (seconds) => { 
        $("#timer-display").text(seconds);
    
        timerInt = setInterval(() => {
            seconds--;
            $("#timer-display").text(seconds);

            if (seconds === 0) {
                triviaGame.cleanUp();
                $("#question").append("<h2>You Ran out of Time!</h2>");
                unanswered++;
                triviaGame.notRight();
            }
        },1000);
    },

    checkAnswer: (answer) => {
        let correctAnswer = questions[q]["correct"];
        if (answer == correctAnswer) {
            triviaGame.cleanUp();
            $("#question").append("<h2>Good Job!</h2>");
            let correctAnswer = questions[q]["correct"];
            let correctAnswerText = questions[q]["answers"][correctAnswer];
            $("#answers").append(`<h3><span class = "correct-good">${correctAnswerText}</span> is the Correct Answer</h3>`);
            $("#answers").append("<img src=\"assets/images/" + questions[q]["image"] + "\" class=\"ans\">");
            correctAnswers++;
            setTimeout(() => {
                triviaGame.nextQuestion()
            },delay * 1000);            
        } else {
            triviaGame.cleanUp();
            $("#question").append("<h2>Wrong Answer!</h2>");
            wrongAnswers++;
            triviaGame.notRight();      
        }
    },

    nextQuestion: () => {
        q++; 
        if (q < questions.length) {
            $("#question").empty();
            $("#answers").empty();
            triviaGame.showQuestion();
            triviaGame.startTimer(timerSteps);
        } else {
            triviaGame.cleanUp();
            $("#timer").css("visibility","hidden");
            $("#question").append("<h2>Congratulations, You Finished!</h2>");
            $("#answers").append(`<h3>Your Results:</h3><p>Correct Answers: ${correctAnswers}</p><p>Wrong Answers: ${wrongAnswers}</p><p>Unanswered: ${unanswered}</p>`);
            $("#replay").css("display", "block");
        }
    },

    cleanUp: () => {
        clearInterval(timerInt);
        $("#question").empty();
        $("#answers").empty();
    },

    notRight: () => {
        let correctAnswer = questions[q]["correct"];
        let correctAnswerText = questions[q]["answers"][correctAnswer];
        $("#answers").append(`<h3>The Correct Answer is: <span class = "correct">${correctAnswerText}</span></h3>`);
        $("#answers").append("<img src=\"assets/images/" + questions[q]["image"] + "\" class=\"ans\">");
        setTimeout(() => {
            triviaGame.nextQuestion()
        },delay * 1000);
    },

    restart: () => {
        q = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        unanswered = 0;
        triviaGame.cleanUp();
        $("#replay").css("display","none");
        $("#timer").css("visibility","visible");
    }
}

    //  Initialize the questions

    const questions = [{
        question: "Which person is the only United States cyclist to ever win the Tour de France?",
        answers: ["Chris Horner", "Lance Armstrong", "Greg Lemond", "Anderew Hampsten"],
        image: "Question1.jpg",
        correct: 2
    },{
        question: "What brand of bicycle was Peter Sagan riding when he won his first grand tour stage?",
        answers: ["Bianchi", "Cannondale", "Look", "Specialized"],
        image: "Question2.jpg",
        correct: 1
    },{
        question: "Which cyclist won the first Tour de France, held in 1903?",
        answers: ["Fernand Augereau", "Hippolyte Aucouturier", "Charles Laeser", "Maurice Garin"],
        image: "Question3.jpg",
        correct: 3
    },{
        question: "Which cyclist won the 2018 Vuelta a España?",
        answers: ["Simon Yates", "Geraint Thomas", "Miguel Ángel López", "Chris Froome"],
        image: "Question4.jpg",
        correct: 0
    },{
        question: "Which grand tour has never been won by a Colombian cyclist?",
        answers: ["Vuelta a España", "Tour de France", "Giro d'Italia"],
        image: "Question5.png",
        correct: 1
    },{
        question: "Which manufacturer of bicycle groupsets has the most Tour de France victories?",
        answers: ["Campagnolo", "SRAM", "Vittoria Margherita", "Shimano"],
        image: "Question6.jpg",
        correct: 0
    },{
        question: "Which cyclist was the first South American to win the Vuelta a España?",
        answers: ["Nario Quintana", "Jose Rujano", "Luis Herrera", "Fernando Gaviria"],
        image: "Question7.jpg",
        correct: 2
    },{
        question: "Which cyclist was the first South American to hold the yellow jersey at the Tour De France?",
        answers: ["Carlos Alberto Contreras", "Víctor Hugo Peña", "Fernando Gaviria", "Luis Felipe Laverde"],
        image: "Question8.jpg",
        correct: 1
    },{
        question: "What was the last year the Tour de France was won by a rider on a steel frame bicycle?",
        answers: ["1983", "1989", "1992", "1994"],
        image: "Question9.jpg",
        correct: 3
    }];

$(document).ready(function () {
    $("#start").on("click",() => {
        triviaGame.showTimer();
        triviaGame.startGame();
        triviaGame.showQuestion();
        triviaGame.startTimer(timerSteps);
    });

    $("#replay").on("click",() => {
        triviaGame.restart();
        triviaGame.showQuestion();
        triviaGame.startTimer(timerSteps);
    });
});