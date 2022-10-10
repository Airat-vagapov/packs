let cards = document.querySelectorAll('.item-card');
let cardsSmall = document.querySelectorAll('.item-card-small');
let cardsBig = document.querySelectorAll('.item-card-big');

let allCards = [];

allCards.push.apply(allCards, cards);
allCards.push.apply(allCards, cardsSmall);
allCards.push.apply(allCards, cardsBig);

// Добавление количества
let cardCount = document.querySelectorAll('.item-card-pcs');

cardCount.forEach((cnt) => {
    let cntPlus = cnt.querySelector('.qnt-plus-btn-container')
    let cntMinus = cnt.querySelector('.qnt-minus-btn');
    let cntSum = cnt.querySelector('.qnt-choose')

    cntPlus.addEventListener('click', () => {
        cntSum.value++
    })
    cntMinus.addEventListener('click', () => {
        if(cntSum.value > 0) {
            cntSum.value--
        }
    })
})