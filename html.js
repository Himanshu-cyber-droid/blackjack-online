



function dayscalc() {

	var year=prompt('Your birth year pls!');
	let result=(2021-year)*365;
	var h1=document.createElement('h1');
	var ans=document.createTextNode('You are '+result+' days old!');
	h1.setAttribute('id', 'ageInDays');
	h1.appendChild(ans);
	document.getElementById('result').appendChild(h1);
}


function reset() {

	document.getElementById('ageInDays').remove();
}




function generateCat() {

	var image=document.createElement('img');
	var div=document.getElementById('result2');
	image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
	div.appendChild(image);


}


function rpsGame(yourChoice) {

	console.log(yourChoice);
	var humanChoice, botChoice;
	humanChoice=yourChoice.id;
	botChoice=numberToChoice(randToRpsInt());
	console.log('ComputerChoice: ',botChoice);
	results=decideWinner(humanChoice, botChoice);
	console.log(results);
	message=finalMessage(results);
	console.log(message);

	rpsFrontEnd(yourChoice.id, botChoice, message);

}


function randToRpsInt() {
	return Math.floor(Math.random()*3);
	
}


function numberToChoice(number){
	return ['rock', 'paper','scissors'][number];
}



function decideWinner(yourChoice, computerChoice) {
	var rpsDatabase ={
		'rock': {'scissors':1, 'rock':0.5, 'paper':0},
		'paper': {'rock':1,'paper':0.5, 'scissors':0},
		'scissors':{'paper':1, 'scissors':0.5, 'rock':0},
	}

	var yourScore=rpsDatabase[yourChoice][computerChoice];
	var computerScore=rpsDatabase[computerChoice][yourChoice];

	return [yourScore, computerScore];
}



function finalMessage([yourScore, computerScore]) {
	if(yourScore === 0){
		return{'message':'You Lost!', 'color':'red'};
	}else if(yourScore===0.5){
		return{'message':'You tied!', 'color':'yellow'};

	}else{
		return{'message':'You Won!', 'color':'green'};
	}
	
}


function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {

	var imagesDatabase={
		'rock': document.getElementById('rock').src,
		'paper': document.getElementById('paper').src,
		'scissors':document.getElementById('scissors').src

	}

	document.getElementById('rock').remove();
	document.getElementById('paper').remove();
	document.getElementById('scissors').remove();

	var humanDiv=document.createElement('div');
	var botDiv=document.createElement('div');
	var messageDiv=document.createElement('div');

	
		humanDiv.innerHTML= "<img src='"+imagesDatabase[humanImageChoice]+"' height=150, width=150 style='box-shadow: 0px 10px 50px blue;'>"
		messageDiv.innerHTML="<h1 style='color: "+finalMessage['color']+"; font-size:60px; padding:30px; '>"+finalMessage['message']+"</h1>"
		botDiv.innerHTML="<img src='"+imagesDatabase[botImageChoice]+"' height='150', width='150' style='box-shadow: 0px 10px 50px red;'>"
		document.getElementById('flex-box-container-3').appendChild(humanDiv);
		document.getElementById('flex-box-container-3').appendChild(messageDiv);
		document.getElementById('flex-box-container-3').appendChild(botDiv);
}		


//challenge 4

var all_buttons=document.getElementsByTagName('button');
var copyAllButtons=[];
for(let i=0;i<all_buttons.length; i++){
	copyAllButtons.push(all_buttons[i].classList[1]);

}
console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
	if(buttonThingy.value === 'red'){
		buttonsRed();
	}else if(buttonThingy.value === 'green'){
		buttonsGreen();
	}else if(buttonThingy.value === 'reset'){
		buttonColorReset();
	}else if(buttonThingy.value === 'random'){
		randomColor();
	}	
}



function buttonsRed() {

	for(let i=0;i<all_buttons.length;i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add('btn-danger');
	}
}



function buttonsGreen() {
	
	for(let i=0;i<all_buttons.length;i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add('btn-success');
	}
}



function buttonColorReset() {
	for(let i=0;i<all_buttons.length;i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add(copyAllButtons[i]);
	}
	
}



function randomColor(){
	let choices=['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

	for(let i=0;i<all_buttons.length;i++){
		var randomNumber=Math.floor(Math.random()*4);
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add(choices[randomNumber]);
	}
}



// challenge5
let blackjackGame={
	'you':{'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score':0},
	'dealer':{'scoreSpan': '#dealer-blackjack-result', 'div':'#dealer-box', 'score':0},
	'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
	'cardsMap':{'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':[1,11]},
	'wins':0,
	'losses':0,
	'draws':0,
	'isStand': false,
	'turnsOver': false,
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const HITSOUND = new Audio('sounds/swish.m4a');
const LOSSSOUND =new Audio('sounds/aww.mp3');
const WINSOUND =new Audio('sounds/cash.mp3');



document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);



function blackjackHit(){


if(blackjackGame['isStand']===false){
	let card=randomCard();
	showCard(card, YOU);
	updateScore(card, YOU);
	// console.log(YOU['score']);
	showScore(YOU);
}

}

function randomCard() {

	let randomIndex=Math.floor(Math.random()*13);
	return blackjackGame['cards'][randomIndex];

}



function showCard(card, activePlayer) {
	if(activePlayer['score']<=21){

		let cardImage =document.createElement('img');
		cardImage.src=`images/${card}.png`;
	 	document.querySelector(activePlayer['div']).appendChild(cardImage);
	 	HITSOUND.play();
	}

}



function blackjackDeal() {
	// showResult(computeWinner());

	if(blackjackGame['turnsOver']===true)
	{

		blackjackGame['isStand']=false;
		let yourImages = document.querySelector('#your-box').querySelectorAll('img');
		let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');

		for(let i=0;i<yourImages.length;i++){
			yourImages[i].remove();
		}

		for(let i=0;i<dealerImages.length;i++) {
			dealerImages[i].remove();
		}

		YOU['score']=0;
		DEALER['score']=0;

		document.querySelector(YOU['scoreSpan']).textContent=0;
		document.querySelector(YOU['scoreSpan']).style.color='white';

		document.querySelector(DEALER['scoreSpan']).textContent=0;
		document.querySelector(DEALER['scoreSpan']).style.color='white';
		
		document.querySelector('#blackjack-result').textContent="Let's play";
		document.querySelector('#blackjack-result').style.color='black';
		blackjackGame['turnsOver']=true;
	}	

} 



function updateScore(card, activePlayer){

	if(card === 'A'){

		if(activePlayer['score']+blackjackGame['cardsMap'][card][1]>21){
			activePlayer['score']+=blackjackGame['cardsMap'][card][0];
		}else{
			activePlayer['score']+=blackjackGame['cardsMap'][card][1];
		}
	}else{

	activePlayer['score']+=blackjackGame['cardsMap'][card];

	}
}


function showScore(activePlayer) {

	if(activePlayer['score']>21){
		document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
		document.querySelector(activePlayer['scoreSpan']).style.color='red';
		
		
	}else{

		document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
	}
}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
	// body...
	blackjackGame['isStand']=true;

	while(DEALER['score']<16 && blackjackGame['isStand']===true){
	let card=randomCard();
	showCard(card, DEALER);
	updateScore(card, DEALER);
	// console.log(DEALER['score']);
	showScore(DEALER);
	await sleep(1000);


}

	
		blackjackGame['turnsOver']=true;
		let winner= computeWinner();
		showResult(winner);
	

	

}


function computeWinner() {

	let winner;

	if(YOU['score']<=21){

		if(YOU['score']>DEALER['score'] || (DEALER['score']>21)){
			winner=YOU;
			blackjackGame['wins']++;


		}else if(YOU['score']<DEALER['score']){

			winner=DEALER;
			// console.log('Dealer Won!')
			blackjackGame['losses']++;

		}else if(YOU['score']===DEALER['score']){
			// console.log('Draw');
			blackjackGame['draws']++;

		}

	} else if(YOU['score']>21 && DEALER['score']<=21){

		winner=DEALER;
		blackjackGame['losses']++;

	}else if(YOU['score']>21 && DEALER['score']>21){

		blackjackGame['draws']++;
	}

	console.log(blackjackGame);
	return winner;
}

function showResult(winner) {
	let message, messageColor;
	if(blackjackGame['turnsOver']===true){

		if(winner === YOU){
			document.querySelector('#wins').textContent=blackjackGame['wins'];
			message='YOU WON!';
			messageColor: 'green';
			WINSOUND.play();
		}else if(winner === DEALER) {
			document.querySelector('#losses').textContent=blackjackGame['losses'];
			message='YOU WON!';
			message='YOU LOST!';
			messageColor:'red';
			LOSSSOUND.play();

		}else{
			document.querySelector('#draws').textContent=blackjackGame['draws'];
			message='YOU WON!';
			message="IT'S A DRAW!"; 
			messageColor='black';
		}

		document.querySelector('#blackjack-result').textContent=message;
		document.querySelector('#blackjack-result').style.color=messageColor;
}


}












