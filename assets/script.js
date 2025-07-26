// Notes for the application
// 2. Choose a theme for your game! In the demo, we picked an 80s theme: 80s questions, 80s sound and an 80s aesthetic. You can choose any subject for your theme, though, so be creative!
// 3. Use key events to listen for the letters that your players will type.
// 4. Display the following on the page:
// 5. Press any key to get started!
// 6. Wins: (# of times user guessed the word correctly).
//    * If the word is `madonna`, display it like this when the game starts: `_ _ _ _ _ _ _`.
//    * As the user guesses the correct letters, reveal them: `m a d o _  _ a`.
// 7. Number of Guesses Remaining: (# of guesses remaining for the user).
// 8. Letters Already Guessed: (Letters the user has guessed, displayed like `L Z Y H`).
// 9. After the user wins/loses the game should automatically choose another word and make the user play it.


// setting global variables
var wins = 0;
var remainingGuesses = 9;
var userGuess = [];
var correctGuesses = 0;
var availableWords = ["Apollo", "Moon", "Space", "Mars", "Jupiter", "Outerspace", "Kuiper belt", "Asteroid belt"];

var selectedWord = "";
var wordArray = [];

//linking html ids to js variables
var playerWinsText = document.getElementById("player-wins");
var guessesLeftText = document.getElementById("remaining-guesses");
var lettersGuessedText = document.getElementById("letters-guessed");
var wordGuessText = document.getElementById("word-to-guess");

guessesLeftText.textContent = remainingGuesses;

function updateGuessedLettersDisplay() {
    lettersGuessedText.textContent = userGuess
        .map(function (ch) { return ch === " " ? "space" : ch; })
        .join(" ");
}

function startGame() {
    var wordToConvert = availableWords[Math.floor(Math.random() * availableWords.length)];
    selectedWord = wordToConvert.toLowerCase();
    wordArray = selectedWord.split("");
    var blankWord = "";
    remainingGuesses = 9;
    correctGuesses = 0;
    userGuess = [];
    guessesLeftText.textContent = remainingGuesses;
    lettersGuessedText.textContent = "";
    document.getElementById("resetButton").innerHTML = "";

    remainingGuesses = 9;
    correctGuesses = 0;
    userGuess = [];

    guessesLeftText.textContent = remainingGuesses;
    updateGuessedLettersDisplay();

    document.getElementById("resetButton").innerHTML = "";

    for (let i = 0; i < wordArray.length; i++) {
        blankWord += "<span class='nameUnderscore' id='" + i + "'>_</span> ";
    }
    wordGuessText.innerHTML = "<p>" + blankWord + "</p>";
}

    console.log(wordArray);

    document.onkeyup = function (event) {
        var selectedIds = [];
        var playerKey = event.key.toLowerCase();

        // Only respond to alphabetic keys. Any other key press is ignored and
        // does not affect the remaining guess count.
        if (!/^[a-z]$/.test(playerKey)) {
            return;
        }

        console.log("You pressed: " + playerKey);

        // Ignore letters that have already been guessed
        if (userGuess.includes(playerKey)) {
            console.log("you already picked " + playerKey + " letter!");
            return;
        }

        // determine if there are multiple occurrences of the same character
        if (wordArray.includes(playerKey)) {
            selectedIds = window.findLetterIndices(wordArray, playerKey);
            for (let i = 0; i < selectedIds.length; i++) {
                delete wordArray[selectedIds[i]];
            }
        } else {
            if (remainingGuesses > 0) {
                remainingGuesses--;
                guessesLeftText.textContent = remainingGuesses;
                console.log("you remaining guesses: " + remainingGuesses);
            }
            if (remainingGuesses === 0) {
                alert("You Lose!");
                document.getElementById("resetButton").innerHTML = "<button id='play-again' type='button' class='btn btn-primary btn-lg'>Play Again!</button>";
                document.getElementById("play-again").addEventListener('click', startGame);
            }
        }

        userGuess.push(playerKey);
        lettersGuessedText.textContent = userGuess.join(' ');

        console.log("This is user's guess ", userGuess);

        for (let i = 0; i < selectedIds.length; i++) {
            document.getElementById(selectedIds[i]).innerHTML = playerKey;
            correctGuesses++;
            if (correctGuesses === selectedWord.length) {
                wins++;
                playerWinsText.textContent = wins;
                document.getElementById("resetButton").innerHTML = "<button id='play-again' type='button' class='btn btn-primary btn-lg'>Play Again!</button>";
                document.getElementById("play-again").addEventListener('click', startGame);
            }
        }
    };

window.onload = startGame;
