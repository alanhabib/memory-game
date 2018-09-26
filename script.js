const cards = document.querySelectorAll(".memory-card");

console.log(cards);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

flipCard = () => {
    console.log("i was clicked");
    console.log(this);
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");
    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        // return statement stops the function execution here
        return;
    }
    // second click
    secondCard = this;
    checkForMatch()

}

checkForMatch = () => {
    // do cards match?
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards()
}


// its a match
disableCards = () => {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
}

// not a match
unflipCards = () => {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false;
        resetBoard()
    }, 1500);
}

resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// shuffled before click wrap it inside parentesis to make the function invoked function expression
// which means the function will be executed right after its definition
(shuffle = () => {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos
    })
})();

cards.forEach(card => card.addEventListener("click", flipCard))
    ;