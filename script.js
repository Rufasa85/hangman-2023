var wordH2 = document.querySelector("#word-spot");
var startBtn = document.querySelector("button#start");
var winsSpan = document.querySelector("#wins-span");
var lossesSpan = document.querySelector("#losses-span");
var resetBtn = document.querySelector("#reset");
var timeLeftSpan = document.querySelector("#time-left");
var resultsH2 = document.querySelector("#results")

var wordsArray = ["manatee","chimpanzee","dolphin","gibbon","capybara","panda"]
var randomWord;
var guessedLetters = [];
var countdownTimer;
var timeLeft = 10;
var isPlaying = false;

var wins = localStorage.getItem("wins") || 0;
var losses = localStorage.getItem("losses");

resultsH2.style.display="none";

if(!losses){
    losses=0
}

winsSpan.textContent = wins
lossesSpan.textContent = losses
console.log(wins,losses)

function startGame() {
    if(isPlaying){
        return;
    }
    //start timer
    resultsH2.style.display="none";
    timeLeft=10;
    timeLeftSpan.textContent = timeLeft;
    isPlaying=true;
    countdownTimer = setInterval(function(){
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        if(timeLeft<=0){
            // if time runs out, lose the game
            clearInterval(countdownTimer);
            resultsH2.style.display="block";
            resultsH2.textContent = "You lose!"
            losses++;
            localStorage.setItem("losses",losses);
            lossesSpan.textContent = losses
            isPlaying=false
        }
    },1000)
    //generate a random word
    randomWord = wordsArray[Math.floor(Math.random()*wordsArray.length)]
    console.log(randomWord)
    // generate a "_" for each char in random word
    guessedLetters=[];
    for (let i = 0; i < randomWord.length; i++) {
        guessedLetters.push("_")
    }
    console.log(guessedLetters)
    wordH2.textContent = guessedLetters.join(" ");
}
//  listen for keystrokes
document.addEventListener("keyup",function(event){
    if(!isPlaying){
        return;
    }
    console.log(event.key);
    console.log(randomWord);
    if(randomWord.includes(event.key)){
        //  if letter is in word, replace "_" with the letter
        for (let i = 0; i < randomWord.length; i++) {
            if(randomWord[i]===event.key){
                guessedLetters[i]=event.key
            }
        }
        wordH2.textContent = guessedLetters.join(" ");
        // if all letter guessed, win the game
        if(guessedLetters.join("")===randomWord){
            resultsH2.style.display="block";
            resultsH2.textContent = "You win!"
            clearInterval(countdownTimer);
            wins++;
            localStorage.setItem("wins",wins);
            winsSpan.textContent = wins
            isPlaying=false;
        }
    }
})

// save wins/losses to localstorage

startBtn.addEventListener("click",startGame);
resetBtn.addEventListener("click",function(){
    localStorage.clear();
    wins = 0;
    losses = 0; 
    winsSpan.textContent = wins;
    lossesSpan.textContent = losses;
})