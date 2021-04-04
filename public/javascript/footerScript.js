//--------------------------//
// Script for footer menu's //
//--------------------------//

//initialisation event listeners 
window.addEventListener("load", eventListeners);

function eventListeners(){
	document.getElementById("applyButton").addEventListener("click", changeElement);
	document.getElementById("countSelectedElement").addEventListener("click", getElement);
	document.getElementById("darkmodeToggle").addEventListener("click", darkMode);
	document.getElementById("selectTagMenu").addEventListener("change", fillElementSelect);
	fillElementSelect();
}

//filling the element selection footer menu
function fillElementSelect() {
	var chosenElement = document.getElementById("selectTagMenu").value;
	var parent = document.getElementById("elementsOfTag");
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
	var loopCount = 0;
	while (loopCount < countElement(chosenElement)) {
		var child = document.createElement("option");
		child.text = loopCount;
		parent.appendChild(child);
		loopCount++;
	}
}

//changes the element by given property and element
function changeElement() {
	var chosenElement = document.getElementById("selectTagMenu").value;
	var chosenElementCount = document.getElementById("elementsOfTag").value;
	var chosenProperty = document.getElementById("selectedProperty").value;
	var color = document.getElementById("colorInput").value;
	var fontSize = document.getElementById("fontSize").value;
	var Elements = document.getElementsByTagName(chosenElement);
	switch (chosenProperty) {
		case 'backgroundColor':
			Elements[chosenElementCount].style.backgroundColor = color;
			break;
		case 'fontColor':
			Elements[chosenElementCount].style.color = color;
			break;
		case 'fontSize':
			Elements[chosenElementCount].style.fontSize = fontSize;
			console.log(Elements[chosenElementCount].style.fontSize);
			break;
	}
}

// determines which value is selected from the dropdown manu
function getElement() {
	var currentElement = document.getElementById("selectTagMenu");
	var selected = currentElement.options[currentElement.selectedIndex].text;
	var elements = countElement(selected);
	alert("The \"" + selected + "\" element has " + elements + " appearances on this page");
}

// Counts how many times this element appearce on the page
function countElement(element) {
	let counter = document.getElementsByTagName(element);
	return counter.length;
}

// Changes the color scheme of page
function darkMode() {
	var body = document.body;
	body.classList.toggle("darkMode");
}

//---------------//
// End of script //
//---------------//
