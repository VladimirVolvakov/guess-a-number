// Game basic values:
let minimum = 1;
let maximum = 100;
let winningNumber = 49;
let attemptsLeft = 5;

// UI elements:
const game = document.querySelector('#game');
const minNumber = document.querySelector('.min-number');
const maxNumber = document.querySelector('.max-number');
const guessInput = document.querySelector('#guess-input');
const submitButton = document.querySelector('#submit-button');
const message = document.querySelector('.message');

// Set text content of minimal and maximal number limits:
minNumber.textContent = minimum;
maxNumber.textContent = maximum;

// Add event listener for submit button:
submitButton.addEventListener('click', () => {
    // Convert type of input data from string to number:
    let guessAttempt = +guessInput.value;

    // Validation of value:    
    if (guessAttempt < minimum || guessAttempt > maximum) {
        setMessage(`Your number is outside of a range. Please enter a number between ${minimum} and ${maximum}`, 'red');
    }

    // Check if guess attempt was successful:
    if (guessAttempt === winningNumber) {
        gameOver(true, 'Congratulations! You win!');
    } else if (guessAttempt > winningNumber) {
        attemptsLeft = attemptsLeft - 1;
        if (attemptsLeft === 0) {
            gameOver(false, `You have no attempts left. Game over, you lose. The correct number was ${winningNumber}`);
        } else {
            guessInput.style.borderColor = 'red';
            setMessage(`Too high... But you still have ${attemptsLeft} attempts to win`, 'red');
        };
    } else {
        attemptsLeft = attemptsLeft - 1;
        if (attemptsLeft === 0) {
            gameOver(false, `You have no attempts left. Game over, you lose. The correct number was ${winningNumber}`)
        } else {
            guessInput.style.borderColor = 'red';
            setMessage(`Too low... But you still have ${attemptsLeft} attempts to win`, 'red');
        };
    };
});

// Add event listener for submitButton.play-again:
game.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('play-again')) {
        window.location.reload();
    };
});

// Function for setting messages:
function setMessage(messageText, color) {
    message.style.color = color;
    message.textContent = messageText;
};

// Function to show game is over:
function gameOver(isGameWon, messageText) {
    let color;
    isGameWon ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(messageText, color);

    // Play again option:
    submitButton.value = 'Play again';
    submitButton.className = 'play-again';
}