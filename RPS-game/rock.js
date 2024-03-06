let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};

updateScore();

let playing = false;
let intID;

function autoPlay(){
    if(!playing){
        intID = setInterval(()=>{
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        playing = true;

        document.querySelector('.autoPlay').innerHTML = 'Stop playing';
    }else{
        clearInterval(intID);
        playing = false;

        document.querySelector('.autoPlay').innerHTML = 'Auto play';
    }
}

document.querySelector('.autoPlay').addEventListener('click', autoPlay);

function removeButton(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
}

document.querySelector('.reset').addEventListener('click', () => {
    const confMsg = document.querySelector('.confirmation-msg');
    if(confMsg.classList.contains('confirmation-msg2')){
        confMsg.classList.remove('confirmation-msg2');
    }else{
        confMsg.classList.add('confirmation-msg2');
    }
})

document.querySelector('.confirmation-msg-yes').addEventListener('click', () => {
    removeButton();
    const confMsg = document.querySelector('.confirmation-msg');
    confMsg.classList.remove('confirmation-msg2');
}, false);

document.querySelector('.confirmation-msg-no').addEventListener('click', () => {
    const confMsg = document.querySelector('.confirmation-msg');
    confMsg.classList.remove('confirmation-msg2');
    }
)

function playGame(move){
    const computerMove = pickComputerMove();
    let result = '';

    if(move === 'rock'){
        if (computerMove === 'rock'){
        result = 'tie';
        }else if (computerMove === 'paper'){
        result = 'You lose';
        }else{
        result = 'You win';
        }

        if(result === 'You win'){
            score.wins ++;
        }else if(result === 'You lose'){
            score.losses ++;
        }else{
            score.ties ++;
        }
    }

    if(move === 'paper'){
        if (computerMove === 'rock'){
        result = 'You win';
        }else if (computerMove === 'paper'){
        result = 'tie';
        }else{
        result = 'You lose';
        }

        if(result === 'You win'){
            score.wins ++;
        }else if(result === 'You lose'){
            score.losses ++;
        }else{
            score.ties ++;
        }
    }

    if(move === 'scissors'){
        if (computerMove === 'rock'){
            result = 'You lose';
         }else if (computerMove === 'paper'){
            result = 'You win';
         }else{
            result = 'tie';
         }

         if(result === 'You win'){
            score.wins ++;
        }else if(result === 'You lose'){
            score.losses ++;
        }else{
            score.ties ++;
        }
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();
   
    document.querySelector('.result').innerHTML = `${result}`;

    document.querySelector('.player-result').innerHTML = `You: <img class="shape" src="photos/${move}-emoji.png">.`;

    document.querySelector('.computer-result').innerHTML = `Computer: <img class="shape" src="photos/${computerMove}-emoji.png">.`;
}

function updateScore(){
    document.querySelector('.score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
    let randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'rock';
    }else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'paper';
    }else{
        computerMove = 'scissors';
    }

    return computerMove;
}