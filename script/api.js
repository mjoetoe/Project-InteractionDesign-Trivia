let answerdiv;
let button = document.getElementById("js-button");
var serverEndPoint = "https://opentdb.com/api.php?amount=10&type=multiple";


let showQuestion = function(json){
    let answers = [];
    let correct_answer = json.correct_answer;
    let vraag = document.querySelector(".js-inspiration");

    let answerdiv = document.querySelector(".js-answers");
    answers.push(json.correct_answer);
    json.incorrect_answers.forEach(element => {
        answers.push(element);
    });

    answers = shuffle(answers);

    answers.forEach(element =>{
        answerdiv.innerHTML += `<div class="c-trivia__answers--item">
                                    <button class="c-trivia__button">${element}</button>
                                </div>`
    });

    vraag.innerHTML = json.question;

    let buttons = document.querySelectorAll('.js-answers');
    buttons = buttons[0].children;

    let counter = 0;
    for (let element of buttons){
        element = element.firstElementChild;
        element.addEventListener('click', function(){
            var parser = new DOMParser;
            var dom = parser.parseFromString(
                '<!doctype html><body>' + correct_answer,
                'text/html');
            
            var decodedString = dom.body.textContent;
            
            if(element.textContent == decodedString){
                element.classList.add('correct');
            }else{
                element.classList.add('incorrect');
            }

            for(let element of buttons){
                element = element.firstElementChild;
                element.disabled = true;

                if(element.textContent == decodedString){
                    element.classList.add('correct');
                }else{
                    element.classList.add('incorrect');
                }
            }
            
            interval = setInterval(getAPI, 5000);
            nextQuestionInterval = setInterval(nextQuestionCountdown, 1000)
        });
        counter++;
    }

    console.log(json)
    difficulty(json.difficulty);
}

const difficulty = function(moeilijkheid){
    if(moeilijkheid == "easy") {
        document.querySelector('.js-status').style.width = `15%`;
        document.querySelector('.js-status').style.background = '#B9C831';
    }
    else if(moeilijkheid == "medium" ){
        document.querySelector('.js-status').style.width = `50%`;
        document.querySelector('.js-status').style.background = '#FECB36';
    }
    else{
        document.querySelector('.js-status').style.width = `100%`;
        document.querySelector('.js-status').style.background = '#E83647';
    }
};


let counterQuestion = 4;

const nextQuestionCountdown = function(){
    if(counterQuestion == 0){
        clearInterval(nextQuestionInterval);
        counterQuestion = 4;
    }else{
        counterQuestion--;
    }
}


const getAPI = function(){
    answerdiv.innerHTML = "";
    // Eerst bouwen we onze url op
	let url = `https://opentdb.com/api.php?amount=10&type=multiple`;
	// Met de fetch API proberen we de data op te halen.
	fetch(url)
		.then(req => {
			if (!req.ok) {
				console.error('Error with fetch');
			} else {
				return req.json();
			}
		})
		.then(json => {
			showQuestion(json.results[0]);
		});
    // Als dat gelukt is, gaan we naar onze showResult functie.
    
    clearInterval(interval);
};


/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


const init = function() {   
    answerdiv = document.querySelector(".js-answers");
    console.log("init initiated!");
    getAPI();
};

document.addEventListener("DOMContentLoaded", init);