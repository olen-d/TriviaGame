//  Start Game
let q = 0;

const triviaGame = {
    startGame: () => {
        $("#start").css("display","none");
        $("#question").css("display","block");
        $("#answers").css("display","block");
    },
    
    showTimer: () => {
        $("#timer").css("display","block");
    },
    
    showQuestion: () => {
        $("#answers").empty();
        $("#question").text(questions[q]["question"]);       
        let answersArray = questions[q]["answers"];
        answersArray.forEach((element, index) => {
            $("#answers").append(`<button type = "button" class = "btn btn-dark answer" data-answer = "${index}">${element}</button>`);
        });
    },
    
    checkAnswer: (answer) => {
        let correctAnswer = questions[q]["correct"];
        if (answer == correctAnswer) {
            alert("Good Job");
        }
        q++;
    }

}

//  Initialize the questions

const questions =  [{
    question: "Which person is the only United States cyclist to ever win the Tour de France?",
    answers: ["Chris Horner", "Lance Armstrong", "Greg Lemond", "Anderew Hampsten"],
    correct: 2 
},{
    question: "What brand of bicycle was Peter Sagan riding when he won his first grand tour stage?",
    answers: ["Specialized", "Cannondale", "Bianchi", "Look"],
    correct: 1
}];

$(document).ready(function () {
    $("#start").on("click",() => {
        triviaGame.showTimer();
        triviaGame.startGame();
        triviaGame.showQuestion();

        //  Arrow functions don't bind this, so don't use one here
        $(".answer").on("click",function() {
            triviaGame.checkAnswer($(this).attr("data-answer"));
        });
    });
});
//  Questions
//  Question Object - Question, Answer 1 ... 4, true/false
//  Timer
//  Check answer
