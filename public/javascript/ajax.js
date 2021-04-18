
var quizContainer = document.getElementById("quizzes");
var counter = 0;
var ourData = "";
var sumbitCounter = 0;

window.addEventListener("load", function() {

	var text = document.createTextNode("Pick your desired topic");
	var div = document.getElementById("quizzes");
	div.appendChild(text);
	div.appendChild(document.createElement("br"));

	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', '/assessment/topics');
	ourRequest.onload = function() {
		var topicsData = JSON.parse(ourRequest.responseText);
		createDropDown(topicsData, "Topics", 0);
	}
	ourRequest.send();

})

submitChoiceButton.addEventListener("click", function() {
	if (sumbitCounter == 0) {
		var value = document.getElementById("Topics").value;
		console.log(value);

		while(quizContainer.firstChild){
			quizContainer.removeChild(quizContainer.firstChild);
		}
		var text = document.createTextNode("Pick your desired quiz");
		var div = document.getElementById("quizzes");
		div.appendChild(text);
		div.appendChild(document.createElement("br"));

		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', '/assessment/quizzes?topicID=' + value);
		ourRequest.onload = function() {
			var quiz = JSON.parse(ourRequest.responseText);
			createDropDown(quiz, "Quizzesss", 2);
		
		};
		ourRequest.send();
		sumbitCounter++;
	} else if (sumbitCounter == 1) {
		var value = document.getElementById("Quizzesss").value;
		console.log(value);
		while(quizContainer.firstChild){
			quizContainer.removeChild(quizContainer.firstChild);
		}

		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', '/assessment/questions?quizID=' + value);
		ourRequest.onload = function() {

			ourData = JSON.parse(ourRequest.responseText);
			console.log(ourData);
			renderQuestion(ourData, counter);
			renderInput(ourData, counter);
		
		};
		ourRequest.send();
		nextButton.classList.remove("hide-me");
		sumbitCounter++;
	} else {
		//check if answer is correct
	}



	


})


nextButton.addEventListener("click", function() {
	while(quizContainer.firstChild){
		quizContainer.removeChild(quizContainer.firstChild);
	}
	
	counter++;
	previousButton.classList.remove("hide-me");
	if(counter >= 2) {
		nextButton.classList.add("hide-me");

	}
	
	renderQuestion(ourData, counter);
	renderInput(ourData, counter);
});

previousButton.addEventListener("click", function() {
	while(quizContainer.firstChild){
		quizContainer.removeChild(quizContainer.firstChild);
	}
	
	counter--;
	nextButton.classList.remove("hide-me");
	if(counter <= 0) {
		previousButton.classList.add("hide-me");
	}

	renderQuestion(ourData, counter);
	renderInput(ourData, counter);
})


function getAnswers(type) {
	var answerRequest = new XMLHttpRequest();
	var answerData = "";
    var magicNumber = "";
    magicNumber = ourData[counter].questionID;
    answerRequest.open('GET', '/assessment/answers?questionID=' + magicNumber);
    answerRequest.onload = function() {
    	answerData = JSON.parse(answerRequest.responseText);
    	console.log(answerData);
    	if(type == 1) {
    		createDropDown(answerData, ourData[counter].questionID, 1);
    	} else if(type == 2) {
    		createMC(answerData);
    	} else {
    		createFITB(magicNumber);
    	}
    	
    	};
    answerRequest.send();
}

function renderQuestion(data, i) {
	var htmlString = "";
	htmlString = data[i].statement;



	quizContainer.insertAdjacentHTML('beforeend', htmlString);
}

function renderInput(data, i) {
		if(data[i].type == "O"){
			getAnswers(3);
		} else if(data[i].type == "M"){
			getAnswers(2);
		} else {
			getAnswers(1);
		}
	
}



// Shuffle array function from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array to randomize order of answers
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createDropDown(answerData, name, option) {

    var selectMenu = document.createElement("select");
    Object.assign(selectMenu, {
        name: name,
        id: name,
    });
   
    	
	shuffleArray(answerData);
	console.log(answerData);
	for (var i = 0; i < answerData.length; i++) {
		console.log("hallo");
		if(option == 1) {
    		let option = document.createElement("option");
    		option.text = answerData[i].answer;
    		option.value = answerData[i].answer;
    		selectMenu.appendChild(option);
    	} else if (option == 0) {
    		let option = document.createElement("option");
    		option.text = answerData[i].title;
    		option.value = answerData[i].topicID;
    		selectMenu.appendChild(option);
		} else if (option == 2) {
			let option = document.createElement("option");
    		option.text = answerData[i].title;
    		option.value = answerData[i].quizID;
    		selectMenu.appendChild(option);
		}
   	}
	
	console.log("Succes");
	
	var div = document.getElementById("quizzes");
	div.appendChild(document.createElement("br"));
	div.appendChild(selectMenu);

}

function createMC(answerData) {
	var form = document.createElement("form");
	shuffleArray(answerData);
	for (var i = 0; i < answerData.length; i++) {
		console.log("hallo");
    	form.appendChild(createInput(answerData, i));
    	form.appendChild(document.createTextNode(answerData[i].answer));
   	}
   	
   	var div = document.getElementById("quizzes");
   	div.appendChild(document.createElement("br"));
	div.appendChild(form);
}

function createInput(answerData, i) {
	var inputElem = document.createElement("input");
	Object.assign(inputElem, {
		type: "radio",
		name: answerData[i].questionID,
		value: answerData[i].answer,
	});

	return inputElem;
}

function createFITB(magicNumber) {
	var input = document.createElement("input");
	Object.assign(input, {
		type: "text",
		name: magicNumber,
	});
	
	var div = document.getElementById("quizzes");
	div.appendChild(document.createElement("br"));
	div.appendChild(input);
}
