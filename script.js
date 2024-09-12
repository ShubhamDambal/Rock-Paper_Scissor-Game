//javascript code

//create object outside the function bcz we want to save score lastly. (otherwise every time score set to 0)
let score = JSON.parse(localStorage.getItem('score')) ||
{
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

//add event listeners instead of onclick()
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
  playGame('Scissor');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  }
  else if (event.key === 'p') {
    playGame('Paper');
  }
  else if (event.key === 's') {
    playGame('Scissor');
  }
  else if(event.key === 'a'){
    autoPlay();
  }
  else if(event.key === 'Backspace'){
    // Update 'Backspace' to show the
    // confirmation message instead of
    // resetting the score immediately.
    showResetConfirmation();
  }
  else {
    alert('Press valid key!');
  }
})


// Function for showing the confirmation message.
function  showResetConfirmation(){
  document.querySelector('.reset-confirm').innerHTML = `
  Are you sure want to reset the score? 
  <button class="yes-button js-yes-button">Yes</button>
  <button class="no-button js-no-button">No</button>`;

  document.querySelector('.js-yes-button').addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });

  document.querySelector('.js-no-button').addEventListener('click', () => {
    hideResetConfirmation();
  });
}

function hideResetConfirmation(){
  document.querySelector('.reset-confirm').innerHTML = '';
}


function playGame(playerMove) {
  const computerMove = pickComputerMove(); //Function Call

  let result = '';

  if (playerMove === 'Scissor') {
    if (computerMove === 'Rock') {
      result = 'You lose.';
    }
    else if (computerMove === 'Paper') {
      result = 'You win.';
    }
    else if (computerMove === 'Scissor') {
      result = 'Tie.';
    }
  }
  else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win.';
    }
    else if (computerMove === 'Paper') {
      result = 'Tie.';
    }
    else if (computerMove === 'Scissor') {
      result = 'You lose.';
    }
  }
  else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie.';
    }
    else if (computerMove === 'Paper') {
      result = 'You lose.';
    }
    else if (computerMove === 'Scissor') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  }
  else if (result === 'You lose.') {
    score.losses += 1;
  }
  else if (result === 'Tie.') {
    score.ties += 1;
  }

  //localStorage
  localStorage.setItem('score', JSON.stringify(score));

  //updating scores on web page
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
        <img src="images/${playerMove}-emoji.png">
        <img src="images/${computerMove}-emoji.png">
        Computer`;

}

function updateScoreElement() {
  //puts wins, losses, ties inside the js-score paragraph.
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = '';
  let randomVal = Math.random();  //pick any value between 0 and 1

  if (randomVal > 0 && randomVal <= 1 / 3) {
    computerMove = 'Rock';
  }
  else if (randomVal > 1 / 3 && randomVal <= 2 / 3) {
    computerMove = 'Paper';
  }
  else {
    computerMove = 'Scissor';
  }
  return computerMove;
}

//Adding event listeners
document.querySelector('.js-reset-button').addEventListener('click', () => {
  // Update the click event listener to
  // show the confirmation message instead
  // of restting the score immediately.
  showResetConfirmation();
});

let isAutoPlaying = false;   //to check autoPlay is on or off
let intervalId;     //to store id of setInterval()

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    document.querySelector('.auto-play-button').innerText = 'Stop Play';
  }
  else {
    //stop the setInterval
    clearInterval(intervalId);
    isAutoPlaying = false;

    document.querySelector('.auto-play-button').innerText = 'Auto Play';
  }
});

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    document.querySelector('.auto-play-button').innerText = 'Stop Play';
  }
  else {
    //stop the setInterval
    clearInterval(intervalId);
    isAutoPlaying = false;

    document.querySelector('.auto-play-button').innerText = 'Auto Play';
  }
}

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}
