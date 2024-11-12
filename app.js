let boxes = document.querySelectorAll(".box");
let msg = document.querySelector(".msg");
let gameStart = false;
let level = document.querySelector(".level");
let btns = ["red","green","blue","yellow"];
let resetBtn = document.createElement("button");
resetBtn.setAttribute("id","resetBtn");
resetBtn.innerText="Reset";

// -------------to track flow of game --------------------
let gameSeq = []; let userSeq = [];

/*--------after press any key show msg that Game started-------*/
document.addEventListener("keypress",function () {
    if(gameStart==false){
        msg.innerHTML="Game Started...";
        gameStart = true;
        levelUp();
        level.after(resetBtn);
        resetBtn.addEventListener("click",gameReset);
    }
})

let lev = 0;
function levelUp(){
    lev++;
    userSeq = [];
    level.innerHTML = `Level ${lev}`;
    gameFlash();
}
function gameFlash(){
    let randIdx = Math.floor(Math.random()*4);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`#${randCol}`);
    randBtn.classList.add("gameFlash");
    gameSeq.push(randCol);
    //console.log(gameSeq);
    setTimeout(() => {
        randBtn.classList.remove("gameFlash");
    }, 250);
}

for(let btn of boxes){
    btn.addEventListener("click",btnPress);
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userCol = btn.getAttribute("id");
    userSeq.push(userCol);
    //console.log(userSeq);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
        checkAns();
    }, 200);
}

function checkAns(){
    for(let i=0; i<userSeq.length; i++){
        if(gameSeq[i]!=userSeq[i]){
            console.log("Game over ..!! your score = ",lev);
            gameReset();
            break;
        }else if(gameSeq.length==userSeq.length){
            levelUp();
        }
    }
}
function gameReset(){
    gameSeq=[];
    userSeq=[]
    gameStart=false;
    msg.innerHTML="Press...! any key to start the game...";
    alert(`Your Score = ${lev}`);
    lev=0;
    level.innerHTML = `Level ${lev}`;
}
