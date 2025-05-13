let user = 0;
let comp = 0;

const startBtn = document.getElementById("start");
const startScreen = document.getElementById("startscreen");
const gameScreen = document.getElementById("gamescreen");

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
});

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const us = document.querySelector("#user");
const cs = document.querySelector("#comp");

const genCompChoice = () => {
    const options = ["rock","paper","scissor"];
    const randid = Math.floor(Math.random() *3); //floor for absolute value and random generates random
    return options[randid];
};

const drawGame = () => {
    //console.log("The game is draw");
    msg.innerText = "Draw!";
    msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        //console.log("You Win");
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        user++;
        us.innerText = user;
    }else{
        //console.log("I Win");
        msg.innerText = `I win! ${compChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor = "red";
        comp++;
        cs.innerText = comp;
    }
};

const playGame = (userChoice) => {
    //console.log(userChoice);
    const compChoice = genCompChoice();
    //console.log(compChoice);
    if(userChoice === compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice === "rock"){
            userWin = compChoice === "paper" ? false : true;
        }
        else if(userChoice === "paper"){
            userWin = compChoice === "scissor" ? false : true;
        }
        else{
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
    

}
choices.forEach((choice)=>{
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
       playGame(userChoice);
    })
});