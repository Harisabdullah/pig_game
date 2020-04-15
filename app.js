/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, twoSix, target;

var dice0 = document.querySelector('.dice-0');
var dice1 = document.querySelector('.dice-1');

targetValue = document.getElementById('target');
// initializing app
init();
// Only for text enteries
// 

// For injecting HTML
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


document.querySelector('.btn-roll').addEventListener('click', function() {
	// 1. Random number
	var dice0Val = Math.floor(Math.random() * 6) +1;
	var dice1Val = Math.floor(Math.random() * 6) +1;

	// 2. Display the result

	document.getElementById('dice-box').style.display = 'block';

	dice0.src = 'dice-' + dice0Val + '.png';
	dice1.src = 'dice-' + dice1Val + '.png';

	// 3. Update the round score only if the roll number was not a 1.

	if (dice0Val !== 1 && dice1Val !== 1) {
		// storing value of dice to check if he got six in row
		if (dice0Val === 6 && dice1Val === 6){
			twoSix += 6;
			if (twoSix === 12) {
				roundScore = 0;
				dice0Val = 0;
				dice1Val = 0;
				scores[activePlayer] = 0;
				document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
				twoSix = 0;
			}
		} else {
			twoSix = 0;
		}
		// Add score
		roundScore += dice0Val + dice1Val ;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
		
		// 2. Check if player won the game
		ifWinner();
	} else {
		setTimeout(nextPlayer, 500)
		// nextPlayer();
	}

});


document.querySelector('.btn-hold').addEventListener('click', function(){
	// 1. Add CURRENT score to global score
	scores[activePlayer] += roundScore;

	// 2. Update the UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	nextPlayer();

});

function nextPlayer(){
	twoSix = 0;
	// Next player
	roundScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = roundScore;

	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.getElementById('dice-box').style.display = 'none';

};

function ifWinner(){
	if ((scores[activePlayer] + roundScore) >= target){
			document.getElementById('target-box').style.display = 'block';
			document.querySelector('.player-'+ activePlayer +'-panel').classList.toggle('active');
			document.querySelector('.player-'+ activePlayer +'-panel').classList.toggle('winner');

			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.btn-hold').style.display = 'none';
			document.querySelector('.btn-roll').style.display = 'none';
			document.getElementById('dice-box').style.display = 'none';

			scores[activePlayer] += roundScore;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

			roundScore = 0;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

			document.querySelector('.btn-new').classList.toggle('btn-winner-new');
	}
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){

	document.getElementById('target-box').style.display = 'none';
	target = parseInt(document.getElementById('target').value);
	
	if (target%2 !== 0 && target%2 !== 1){
		target = 20;
	} 
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	twoSix = 0;

	document.getElementById('dice-box').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-'+ activePlayer +'-panel').classList.add('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('#name-0').textContent = 'player 1';
	document.querySelector('#name-1').textContent = 'player 2';
	document.querySelector('.btn-hold').style.display = 'block';
	document.querySelector('.btn-roll').style.display = 'block';

	document.querySelector('.btn-new').classList.remove('btn-winner-new');
};


