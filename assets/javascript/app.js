//  Start Game
let q = 0;
let timerSteps = 5;
let delay = 3;
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
            $("#answers").append(`<h3><span class = "correct-good">${correctAnswerText}</span></h3> is the Correct Answer`);
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
    }
}

    //  Initialize the questions

    const questions = [{
        question: "Which person is the only United States cyclist to ever win the Tour de France?",
        answers: ["Chris Horner", "Lance Armstrong", "Greg Lemond", "Anderew Hampsten"],
        correct: 2 
    },{
        question: "What brand of bicycle was Peter Sagan riding when he won his first grand tour stage?",
        answers: ["Bianchi", "Cannondale", "Look", "Specialized"],
        correct: 1
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