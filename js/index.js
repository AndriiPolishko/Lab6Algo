let start = document.querySelector(".start")

let ai = document.querySelector(".player2")
ai.setAttribute('disabled','true')

let human = document.querySelector(".human")

let cardsInFirstDeck = []
$(human).on('click','.card',function(e){
    let card = e.target
    replace_card(card)})


let all_cards = [];
let players_cards = []
let ai_cards = []

const el = (tagName, attributes, children) => {
    const element = document.createElement(tagName);
    if (attributes) {
        for (const attrName in attributes) {
            element.setAttribute(attrName, attributes[attrName]);
        }
    }
    if (children) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        }
    }
    return element;
};
const div = (a, c) => el('div', a, c);

let r = '3 4 5 6 7 8 9 10 J Q K 2 A'
const ranks = r.split(' ');
const suits = '♠︎ ♥︎ ♣︎ ♦︎'.split(' ');
const getRank = (i) => ranks[i % 13];
const getSuit = (i) => suits[i / 13 | 0];
const getColor = (i) => (i / 13 | 0) % 2 ? 'red' : 'black';
const createCard = (i) => {
    const rank = getRank(i);
    const suit = getSuit(i);
    const id = rank+suit
    const colorClass = 'card ' + getColor(i);
    return div({ class: colorClass,id:id }, [
        div({ class: 'card-topleft' }, [
            div({ class: 'card-corner-rank' }, [
                rank
            ]),
            div({ class: 'card-corner-suit' }, [
                suit
            ])
        ]),
        div({ class: 'card-bottomright' }, [
            div({ class: 'card-corner-rank' }, [
                rank
            ]),
            div({ class: 'card-corner-suit' }, [
                suit
            ])
        ])
    ]);
};

const cardsData = new Array(52);
for (let i = 0; i < cardsData.length; i++) {
    cardsData[i] = i;
}

start.addEventListener('click',()=> {
    start.setAttribute("disabled","true")
    cardsData.forEach((i) => {
    const card = createCard(i);
    all_cards.push(card);
    });
    shuffle(all_cards);
    divideCards(all_cards,players_cards,ai_cards)
    appendDeck(human,players_cards)
    appendDeck(ai,ai_cards)
    console.log(players_cards)
    console.log(human.children)
})



function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function divideCards(array,arr1,arr2) {
    const n = array.length
    for(let i = 0; i < n;i++) {
        if(i<26)
            arr1.push(array[i]);
        else
            arr2.push(array[i]);
    }
}



function appendDeck(parent,deck) {
    const n = deck.length
    for(let i = 0; i < n;i++) {
        parent.appendChild(deck[i])
    }
}

function replace_card(card) {

    let deck1 = document.querySelector(".deck1")
    deck1.innerHTML="";
    deck1.appendChild(card);
    checkWinner()

}

function checkWinner() {
    if(human.innerHTML==="")
        alert("You Win")
}

function ai_move(pCard) {
    let pCopy = pCard.cloneNode(true,true)
    let pNum = +pCopy.id["0"]
    let elem = $("#");
}