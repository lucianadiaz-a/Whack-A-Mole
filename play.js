var gameRunning = false;
var score = 0; 
var timer;
var gameTime;
var timeout; 

function beginTimer(){
    var element = document.getElementById('timer');
    gameRunning = true;
    var sec = 20;
    timer = setInterval(()=>{
        element.innerHTML = sec;
        //console.log(gameRunning);
        sec --;
        if(sec<=-1){
            clearInterval(timer);
            clearInterval(gameTime);
            gameRunning = false;
            turnRed();
            $("img").attr("src","hole.png");
        }
    },1000);
}

//generates a random interval between 0.5 and 3  
function generateInterval() {
    const randomInteger = Math.floor(Math.random() * 6) + 1;
    const interval = randomInteger * 0.5;
    return (interval*1000) ;
  }

//const randomValue = generateInterval();
//console.log(randomValue);

let prevHole; 
function chooseHole(){
    const allHoles = document.querySelectorAll("img");
    const int = Math.floor(Math.random()*8);
    const selectedHole = allHoles[int];
    if (selectedHole == prevHole){
        return chooseHole();
    } 
    prevHole = selectedHole;
    return selectedHole;
}

function revertHole(hole){
    $(hole).attr("src","hole.png");
}

function popUp(){
    const milliseconds = generateInterval();
    const whichHole = chooseHole();
    $(whichHole).attr("src","mole.png");
    setTimeout(() => {
        revertHole(whichHole);
    },milliseconds);
}

function startGame(){
    beginTimer();
    gameTime = setInterval(()=>{
        popUp();
    },generateInterval());
}

function clearGame(){
    score = 0;
    document.getElementById('score').innerHTML = 0;
    document.getElementById('timer').innerHTML = 20;
}

function turnRed(){
    var timerElement = document.getElementById('timer');
    var scoreElement = document.getElementById('score');
    timerElement.style.color = 'red';
    scoreElement.style.color = 'red';
}

function turnWhite(){
    var timerElement = document.getElementById('timer');
    var scoreElement = document.getElementById('score');
    timerElement.style.color = 'white';
    scoreElement.style.color = 'white';
}

$(document).ready(function(){    
    startGame();
    $("#button").click(function(){
        $("img").attr("src","hole.png");
        clearInterval(timer);
        clearInterval(gameTime);
        gameRunning = false;
        clearGame();
        turnWhite();
        startGame();
    })
    $("img").click(function(){
        if($(this).attr("src") == "mole.png"){
            revertHole(this);
            score ++;
            var displayScore = document.getElementById('score');
            displayScore.innerHTML = score;
        }
    })
})

