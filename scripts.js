const cards = document.querySelectorAll('.memory-card');

let RotateCard = false;
let lockBoard = false;
let firstCard, secondCard;


function rotateCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('rotate');

    if (!RotateCard) {
        RotateCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unrotateCards();
}

function disableCards() {
    firstCard.removeEventListener('click', rotateCard);
    secondCard.removeEventListener('click', rotateCard);

    resetBoard();
}

function unrotateCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('rotate');
        secondCard.classList.remove('rotate');


        resetBoard();
    }, 1000);
}

function resetBoard() {
    [RotateCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function mixCards() {
    cards.forEach(card => {
        let randomcards = Math.floor(Math.random() * 12);
        card.style.order = randomcards;
    });
})();

cards.forEach(card => card.addEventListener('click', rotateCard));

//time counter
var counter = 0;

var totalCounter = 60 * 1000; //timer out is 60 seconds
var increase = 50;//increase every 50 milliseconds

//interval handle
var interval = setInterval(updateTimer, increase);

//update timer
function updateTimer(){
	
	counter += increase;
	
	//%
	var percent  = counter * 100 / totalCounter;
	
	document.getElementById("progress-bar-left").style.width = percent + "%";
	document.getElementById("progress-bar-left").innerHTML =  Math.floor(percent) + "%&nbsp";
	
	//check done?
	if (counter >= totalCounter){
		
		document.getElementById("progress-bar-left").style.width = "100%";
		document.getElementById("progress-bar-left").innerHTML = "100%&nbsp";
	
		clearInterval(interval);
		alert("Time out!");
		location.reload();
	}
}

//reset timer
function resetTimer(){
	clearInterval(interval);
	interval = setInterval(updateTimer, increase);
}

//clear timer
function clearTimer(){
	clearInterval(interval);
}


		