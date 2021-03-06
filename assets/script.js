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


//setting global varibales
var wins = 0;
var remainingGuesses = 9;
var userGuess = [];
var correctGuesses = 0;
var availableWords = ["Apollo", "Moon", "Space", "Mars", "Jupiter", "Outerspace", "Kuiper belt", "Asteroid belt"]

//linking html ids to js variables
var playerWinsText = document.getElementById("player-wins");
var guessesLeftText = document.getElementById("remaining-guesses");
var lettersGuessedText = document.getElementById("letters-guessed");
var wordGuessText = document.getElementById("word-to-guess");

guessesLeftText.textContent = remainingGuesses;

window.onload = function () {
    var wordToConvert = availableWords[Math.floor(Math.random() * availableWords.length)];
    var selectedWord = wordToConvert.toLowerCase();
    var wordArray = selectedWord.split("");
    var blankWord = "";

    playerWinsText.textContent = wins;

    for (let i = 0; i < wordArray.length; i++) {
        blankWord = blankWord + "<span class='nameUnderscore' id='" + i + "'>_</span> ";
    }
    wordGuessText.innerHTML = "<p>" + blankWord + "</p>";

    console.log(wordArray);

    document.onkeyup = function (event) {
        var keyPress = String.fromCharCode(event.keyCode);
        var selectedIds = [];
        if (/[a-zA-Z0-9\s]/.test(keyPress)) {
            var playerKey = event.key;
            console.log("You pressed: " + playerKey);

            // determine if there are multiple occurances of the same charecter
            if (wordArray.includes(playerKey)) {
                for (let i = 0; i < wordArray.length; i++) {
                    var idToSelect = wordArray.indexOf(playerKey);
                    console.log("Id of key: ", idToSelect);

                    if (idToSelect >= 0) {
                        selectedIds.push(idToSelect);
                        delete wordArray[idToSelect];
                        console.log("Selected ID :", selectedIds);
                    }
                }
                userGuess.push(playerKey);
                //TODO: log the spcaebar correctly
                    //if (idToSelect = " ") {
                        //console.log("spacebar was pushed")
                    //}
            } else if (userGuess.indexOf(playerKey) >= 0) {
                console.log("you already picked " + playerKey + " letter!");

            } else {
                if (remainingGuesses > 0) {
                    remainingGuesses--;
                    guessesLeftText.textContent = remainingGuesses;
                    console.log("you remaining guesses: " + remainingGuesses);
                }
                if (remainingGuesses === 0) {
                    alert("You Loose!");
                }
                userGuess.push(playerKey);
            }

            lettersGuessedText.textContent = userGuess;

            console.log("This is user's guess ", userGuess);

            for (let i = 0; i < selectedIds.length; i++) {
                document.getElementById(selectedIds[i]).innerHTML = playerKey;
                correctGuesses++;
                if (correctGuesses === selectedWord.length) {
                    wins++;
                    playerWinsText.textContent = wins;
                    document.getElementById("resetButton").innerHTML = "<button type='button' class='btn btn-primary btn-lg'>Play Again!</button>";

                    //TODO: change word on click of "Play Again" button
                    //TODO: clear letters already guessed
                    //TODO: reset remaining guess back to 9
                    //TODO: Set display of button to hide
                    //TODO: If the above statement is true again display the button by setting the display to block

                }
            }
        }
    };
};
