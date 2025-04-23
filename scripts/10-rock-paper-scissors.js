let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  tie: 0
}; 

updateScoreElement();

let isAutoPlaying = false;
let intervalID;

function autoPlay(){
  if(!isAutoPlaying){
    intervalID = setInterval (() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else{
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
};

//using addEventListener instead of onclick
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

//using keydown in addEventListener
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  } else if(event.key === 'p'){
    playGame('paper');
  } else if(event.key === 's'){
    playGame('scissors');
  }
});

function playGame(playerMove){
  const computerMove = pickComputerMove();

  let result='';
  if (playerMove === 'rock'){
    if (computerMove === 'rock'){
    result = 'Tie.'
    }else if (computerMove === 'paper'){
      result = 'You lose.'
    }else if (computerMove === 'scissors'){
      result = 'You win.'
    }
  }
  else if (playerMove === 'paper'){
    if (computerMove === 'rock'){
      result = 'You win.'
      }else if (computerMove === 'paper'){
        result = 'Tie.'
      }else if (computerMove === 'scissors'){
        result = 'You lose.'
    }
  }
  else if (playerMove === 'scissors'){
    if (computerMove === 'rock'){
      result = 'You lose.'
      }else if (computerMove === 'paper'){
        result = 'You win.'
      }else if (computerMove === 'scissors'){
        result = 'Tie.'
    }
  }

  if(result === 'You win.'){
    score.wins += 1;
  }else if (result === 'You lose.'){
    score.losses += 1;
  }else if(result === 'Tie.'){
    score.tie +=1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;

}

function updateScoreElement(){
 const updateScore = document.querySelector('.js-score');
 
 updateScore.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.tie}`;
}

function hideResultAndMoves(){65
  document.getElementById("hide").style.display = "none";
}

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove ='';

  if (randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
  }else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  }else if (randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'scissors';
  }
return computerMove;
}