let currentClass = '';

//////// SELECTOR ////////
let startNewGameModal = document.querySelector('.new-game-modal');
let successModal = document.querySelector('.success-game-modal');
let rulesModal = document.querySelector('.rules-modal');
let playerRoundScore = document.getElementsByClassName('player-round-score')
let playerGlobalScore = document.getElementsByClassName('player-global-score')



//////// DECLARATION OF EMPTY VARIABLES ////////
let currentPlayer = Math.floor(Math.random() * 2)
let round = []
let totalRound

//////// PLAYERS ARRAY ////////
let players = [
    {
        name:'',
        globalScore: 0,
        roundScore : 0
    },
    {
        name:'',
        globalScore: 0,
        roundScore : 0
    }
]

//////// WHEN USER START A NEW GAME ////////
function showStartNewGameModal(){
    
    startNewGameModal.classList.remove('hidden')
    successModal.classList.add('hidden')
    rulesModal.classList.add('hidden')

    for(i=0;i<players.length; i++){
        players[i].globalScore = 0
        playerGlobalScore[i].textContent = players[i].globalScore
        playerRoundScore[i].textContent = players[i].globalScore
    }
}


//////// ADD PLAYERS NAMES FROM INPUT TEXT  ////////
function displayPlayersNames(){
    let playersInputValues = document.getElementsByTagName('input');
    let playersTitle = document.getElementsByClassName('player-title')
    let startSound = document.getElementById("start-sound");
    
    for (i = 0; i < players.length; i++){
        if(playersInputValues[i].value){
            players[i].name = playersInputValues[i].value
            playersTitle[i].textContent = players[i].name
        }else{
            players[i].name = 'Player '+ (i+1)
            playersTitle[i].textContent = 'Player '+ (i+1)
        }
    }
    
    //Hide modal and start player's round 
    startNewGameModal.classList.add('hidden');
    startSound.play()
    turnPlayer()
}


//////// DISPLAY CSS ELEMENTS WHICH SHOWS WHO IS THE CURRENT PLAYER  ////////
function turnPlayer(){
    let currentPlayerIcon = document.getElementsByClassName('current-player')
    let currentPlayerBg = document.getElementsByClassName('player-bg')
    
    currentPlayerIcon[currentPlayer].classList.remove('opacity-0')
    currentPlayerBg[currentPlayer].classList.add('bg-gray-50')
    
    if (currentPlayer == 0){
        currentPlayerIcon[1].classList.add('opacity-0')
        currentPlayerBg[1].classList.remove('bg-gray-50')
    }else{
        currentPlayerIcon[0].classList.add('opacity-0')
        currentPlayerBg[0].classList.remove('bg-gray-50')
    }
}



//////// ROLL DICE FUNCTION  ////////
function rollDice(){
    let diceSound = document.getElementById("roll-dice-sound");
    let errorSound = document.getElementById("error-sound");
    
    diceSound.play();
    let number = Math.floor(1 + Math.random() * 6)
    let cube = document.querySelector('.cube')
    let showClass = 'show-' + number
    
    if(currentClass){
        cube.classList.remove(currentClass)
    }
    cube.classList.add(showClass)
    currentClass = showClass
    displayScore(number)
    
    //If dice falls on 1
    if(number == 1){
        errorSound.play();
        players[currentPlayer].roundScore = 0
        playerRoundScore[currentPlayer].textContent = players[currentPlayer].roundScore
        holdScore()
    }
}

//////// DISPLAY ROUND SCORE OF CURRENT PLAYER  ////////
function displayScore(number){
    totalRound = 0
    round.push(number);
    round.forEach(newNb=>{
        totalRound += newNb
    })
    players[currentPlayer].roundScore = totalRound
    playerRoundScore[currentPlayer].textContent = players[currentPlayer].roundScore
}



//////// HOLD SCORE OF CURRENT PLAYER  ////////
function holdScore(){
    let playerGlobalScoreValue = players[currentPlayer].globalScore
    let playerRoundScoreValue = players[currentPlayer].roundScore
    
    round = []
    playerRoundScoreValue = parseInt(playerRoundScore[currentPlayer].textContent)
    playerRoundScore[currentPlayer].textContent = 0
    
    playerGlobalScoreValue += playerRoundScoreValue
    players[currentPlayer].globalScore = playerGlobalScoreValue
    playerGlobalScore[currentPlayer].textContent = playerGlobalScoreValue
    
    //End of game at 100 points
    if (playerGlobalScoreValue < 100){
        currentPlayer++
        //Keep the currentPlayer value odd or even
        currentPlayer %2 == 0 ? currentPlayer = 0 : currentPlayer = 1
        turnPlayer()
    }else{
        showSuccessModal()
    }
}


//////// DISPLAY SUCCESS MODAL  ////////
function showSuccessModal(){
    let winner = document.querySelector('.winner-player')
    let successsSound = document.getElementById("success-sound");
    
    successsSound.play()
    successModal.classList.remove('hidden')
    winner.textContent = players[currentPlayer].name
}

//////// DISPLAY RULES MODAL  ////////
function showRulesModal(){
    if(rulesModal.classList.contains('hidden')){
        rulesModal.classList.remove('hidden')
    }else{
        rulesModal.classList.add('hidden')
    }
}


