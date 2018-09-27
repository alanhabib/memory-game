
// Make a list of all memory card elements and store it in the const cards
const cards = document.querySelectorAll('.memory-card');

// when the player clicks the cards we need to define if it was the first or second to perform matching logic
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// if we flip cards before previous cards has not flipped the cards stuck thats why we need to lockboard
// in case it is not a match we lock the board and wait until the cards finish unflipping
function flipCard() {
    if (lockBoard) return;
    // if we click twice on the same cards before it used to evaluate true and stay at one card
    //  we add a condition that says if it is the firstcard then the "this" variable holds the firstCard 
    // but the firstCard variable is still on set so that condition is evaluate to false and the function will execute normally
    // if it is the secondCard click the "this" variable holds the secondCard and
    // in case it is the same as firstCard it will return from the function
    
    if (this === firstCard) return;

    this.classList.add('flip');
    // this is the first time player clicked card
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        // this is the element that has fired the event
        firstCard = this;
        // if true the return statement stops the execution here if it not true it continues
        return;
    }

    secondCard = this;
    checkForMatch();
}

// do cards match? we have data-framework from html to match the memory cards
// in order to access the data attribut we defined in html we do this through "dataset" object
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    // we call on a function depending on the players choice
    isMatch ? disableCards() : unflipCards();
}

// if it do not match the cards will not stay flipped
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}
// we call on resetboard if the cards does not match
function unflipCards() {
    lockBoard = true;
    // this way we can see the flipping of the cards
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

// using ES6 destructuring assignment which makes it possible to unpack values from arrays into distinct variables
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

// Here we loop through the list and for each card  we attach an eventlistener 
//  when the event is fired we ececute a function flipcard as above
cards.forEach(card => card.addEventListener('click', flipCard));