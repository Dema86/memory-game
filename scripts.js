const cards = document.querySelectorAll('.memory-card');

let RotateCard = false;
let lockBoard = false;
let firstCard, secondCard;

//time counter
var counter = 0;

var totalCounter = 120 * 1000; //timer out is 120 seconds
var increase = 50;//increase every 50 seconds

//interval handle
var interval;

//number of clicks
var numClicks = 0;

//opened cards
var openedCards = 0;

//modal
var modal = document.getElementById("gameModal");

//game status (playing or none)
var playing = false;

//start time
var startTime = 0;

function rotateCard() {
	
	//playing?
	if (!playing) {
		alert("Please click Start / Restart button");
		return;
	}
	
    if (lockBoard) return;
    if (this === firstCard) return;
	
	numClicks++;
	//show number of clicks
	showNumberOfClicks();

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
	
	if (isMatch){ //matched a pair
		openedCards += 2;
	}
}

function disableCards() {
    firstCard.removeEventListener('click', rotateCard);
    secondCard.removeEventListener('click', rotateCard);

    resetBoard();
}

function unrotateCards() {
    lockBoard = true;

    setTimeout(() => {
		if (firstCard != null){
			firstCard.classList.remove('rotate');
		}
		if (secondCard != null){
			secondCard.classList.remove('rotate');
		}
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [RotateCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//reset game
function resetGame(){
	resetBoard();
	cards.forEach(card => {
        card.classList.remove('rotate');
		//remove for non-opened cards
		card.removeEventListener('click', rotateCard);
		card.addEventListener('click', rotateCard);
    });
	
	//shuffle cards
	shuffle();
}

//shuffle cards
function shuffle(){
	(function mixCards() {
		cards.forEach(card => {
			let randomcards = Math.floor(Math.random() * 12);
			card.style.order = randomcards;
		});
	})();
}


cards.forEach(card => card.addEventListener('click', rotateCard));

//update timer
function updateTimer(){
	
	counter += increase;
	
	//%
	var percent  = counter * 100 / totalCounter;
	
	document.getElementById("progress-bar-left").style.width = percent + "%";
	document.getElementById("progress-bar-left").innerHTML =  Math.floor(percent) + "%&nbsp";
	
	if (openedCards == cards.length){
		endGame();
	}else if (counter >= totalCounter)
	{//check time out
		
		document.getElementById("progress-bar-left").style.width = "100%";
		document.getElementById("progress-bar-left").innerHTML = "100%&nbsp";
	
		clearInterval(interval);
		alert("Time out!");
		
		playing = false;
	}
}

//reset timer
function resetTimer(){
	clearTimer();
	interval = setInterval(updateTimer, increase);
}

//clear timer
function clearTimer(){
	clearInterval(interval);
	counter = 0;
}

//start/restart
function startRestart(){
	resetTimer();	
	numClicks = 0;
	resetGame();
	openedCards = 0;
	//show number of clicks
	showNumberOfClicks();
	
	playing = true;
	startTime = new Date();
}

//show number of clicks
function showNumberOfClicks(){
	document.getElementById("clickCounter").innerHTML = "Number of clicks: " + numClicks;
}

//end game
function endGame(){
	clearInterval(interval);
	playing = false;
	document.getElementById("numClicksModel").innerHTML = numClicks;

	//elapsed time
	var timeDiff = Math.round((new Date() - startTime) / 1000); //in second
	document.getElementById("timeToWinModel").innerHTML = timeDiff + " (seconds)";
  
	modal.style.display = "block";	
}

//close model (click button handler)
function closeModel(){
	modal.style.display = "none";
}

//restart game (click button handler)
function restartModel(){
	modal.style.display = "none";
	startRestart();
}

//clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
