var body = document.getElementById("body");
var footer = document.getElementById("footer");
var questionDiv = document.createElement("div");

// Create div in which the questions will be
function initializeQuestionDiv() {
    body.insertBefore(questionDiv, footer);
    questionDiv.setAttribute("id", "questionDiv");
    questionDiv.setAttribute("class", "assessment-body__questionDiv");
}

// Initializing all the elements to the assessment page
function initializeList(id) {
    var ul = document.getElementById(id);
    var li = ul.getElementsByTagName("li")[0];

    createLink(li, "Home", "index.html", 0);
    li = li.nextElementSibling;
    createLink(li, "History", "history.html", 0);
    li = li.nextElementSibling;
    createLink(li, "Structure", "structure.html", 0);
    li = li.nextElementSibling;
    createLink(li, "Assessment", "", 0);
    li = li.nextElementSibling;
    createLink(li, "FAQ", "faq.html", 0);
    li = li.nextElementSibling;
    createLink(li, "Login", "users/login", 0);
    li = li.nextElementSibling;
    createLink(li, "About", "about.html", 0);
}

// Creates header
function initializeHeader() {
    var img = document.createElement("img");
    img.setAttribute("class", "header__image");
    img.setAttribute(
        "src",
        "https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png"
    );
    img.setAttribute("alt", "HTML logo");

    var para = document.createElement("p");
    var text = document.createTextNode("HTML");
    para.appendChild(text);
    para.setAttribute("class", "header__title");

    var header = document.createElement("header");
    header.setAttribute("class", "body__header");
    header.appendChild(img);
    header.appendChild(para);
    body.insertBefore(header, body.firstElementChild);
}

// Creates each link
function createLink(element, name, link, target) {
    var myLink = document.createElement("a");
    var name = document.createTextNode(name);
    myLink.setAttribute("href", link);
    if (target) myLink.setAttribute("target", "_blank");
    myLink.appendChild(name);
    element.appendChild(myLink);
}

function initializeDiv(className, linkName, link) {
    var div = document.createElement("div");
    div.setAttribute("class", className);
    var elem = document.getElementsByTagName("footer")[0];
    elem.appendChild(div);

    if (linkName != null) {
        createLink(div, linkName, link, true);
    }
}

function createFooterButton(className, id, buttonText) {
    var elem = document.getElementsByClassName(
        "footer__button-group footer__menu"
    )[0];
    var button = document.createElement("button");
    Object.assign(button, {
        className: className,
        id: id,
    });
    var buttonLabel = document.createTextNode(buttonText);
    button.appendChild(buttonLabel);
    elem.appendChild(button);
}

var dropDownFooter = class {
    constructor(
        labelClassName,
        labelName,
        selectClassName,
        selectId,
        options,
        input,
        locationName
    ) {
        this.labelClassName = labelClassName;
        this.labelName = labelName;
        this.selectClassName = selectClassName;
        this.selectId = selectId;
        this.options = options;
        this.input = input;
        this.locationName = locationName;
    }

    createDropDown() {
        var elem = document.getElementsByClassName(this.locationName)[0];
        var label = document.createElement("label");
        label.setAttribute("class", this.labelClassName);
        var labelText = document.createTextNode(this.labelName);
        label.appendChild(labelText);
        elem.appendChild(label);

        var select = document.createElement("select");
        Object.assign(select, {
            className: this.selectClassName,
            id: this.selectId,
        });
        for (var i = 0; i < this.options.length; i++) {
            select.appendChild(createOptions(this.options[i]));
        }

        if (this.input) {
            var div = document.createElement("div");
            var input = document.createElement("input");
            Object.assign(input, {
                className: "color-font-group__color",
                id: "colorInput",
                type: "color",
                value: "#282923",
            });

            div.appendChild(input);
            div.appendChild(select);
            elem.appendChild(div);
        } else {
            elem.appendChild(select);
        }
    }
};

function initializeUnorderedList(className, idName, location) {
    var ul = document.createElement("ul");
    Object.assign(ul, {
        className: className,
        id: idName,
    });
    for (var i = 0; i < 7; i++) {
        ul.appendChild(document.createElement("li"));
    }
    var elem = document.getElementsByClassName(location)[0];
    elem.appendChild(ul);
}

var Question = class {
    constructor(title, question, correctAnswer) {
        this.title = title;
        this.question = question;
        this.correctAnswer = correctAnswer;
    }
    test() {
        alert(this.correctAnswer);
    }

    checkAnswer(title, rightInput, checked) {
        if (checked) {
            var checked = ":checked";
        } else {
            var checked = "";
        }
        var input = document.querySelector(
            "input[name=" + CSS.escape(title) + "]" + checked
        );

        if (input.value.toLowerCase() === rightInput.toLowerCase()) {
            var field = document.getElementById("fieldset-" + this.title);
            field.style.backgroundColor = "lightgreen";
        } else {
            var field = document.getElementById("fieldset-" + this.title);
            field.style.backgroundColor = "tomato";
        }
    }
};

class selectQuestion extends Question {
    constructor(title, question, correctAnswer, possibleAnswers) {
        super(title, question, correctAnswer);
        this.possibleAnswers = possibleAnswers;
    }

    initializeFieldMC() {
        var br1 = document.createElement("br");
        var br2 = document.createElement("br");
        var br3 = document.createElement("br");
        var field = document.createElement("fieldset");
        field.setAttribute("class", "questionDiv__questionBox");
        field.setAttribute("id", "fieldset-" + this.title);
        var legend = document.createElement("legend");
        legend.setAttribute("class", "questionBox__title");
        var title = document.createTextNode(this.title);
        legend.appendChild(title);
        field.appendChild(legend);

        var p = document.createElement("p");
        p.appendChild(document.createTextNode(this.question));
        field.appendChild(p);

        shuffleArray(this.possibleAnswers);

        var div = document.createElement("div");

        div.appendChild(
            createInput(this.title, this.possibleAnswers[0], "radio", 0)
        );
        div.appendChild(document.createTextNode(this.possibleAnswers[0]));
        div.appendChild(br1);

        div.appendChild(
            createInput(this.title, this.possibleAnswers[1], "radio", 0)
        );
        div.appendChild(document.createTextNode(this.possibleAnswers[1]));
        div.appendChild(br2);

        div.appendChild(
            createInput(this.title, this.possibleAnswers[2], "radio", 0)
        );
        div.appendChild(document.createTextNode(this.possibleAnswers[2]));
        div.appendChild(br3);

        div.appendChild(
            createInput(this.title, this.possibleAnswers[3], "radio", 0)
        );
        div.appendChild(document.createTextNode(this.possibleAnswers[3]));

        div.addEventListener(
            "change",
            this.checkAnswer.bind(this, this.title, this.correctAnswer, 1)
        );

        field.appendChild(div);

        questionDiv.appendChild(field);
    }

    initializeFieldDropDown() {
        var field = document.createElement("fieldset");
        field.setAttribute("class", "questionDiv__questionBox");
        field.setAttribute("id", "fieldset-" + this.title);
        var legend = document.createElement("legend");
        legend.setAttribute("class", "questionBox__title");
        var title = document.createTextNode(this.title);
        legend.appendChild(title);
        field.appendChild(legend);

        var lab = document.createElement("label");
        var labText = document.createTextNode(this.question);

        lab.appendChild(labText);
        field.appendChild(lab);

        var br = document.createElement("br");
        field.appendChild(br);

        var selectMenu = document.createElement("select");
        Object.assign(selectMenu, {
            name: this.title,
            id: this.title,
        });

        shuffleArray(this.possibleAnswers);

        selectMenu.appendChild(createOptions("--Select your answer please--"));
        for (var i = 0; i < this.possibleAnswers.length; i++) {
            selectMenu.appendChild(createOptions(this.possibleAnswers[i]));
        }

        field.appendChild(selectMenu);

        questionDiv.appendChild(field);

        selectMenu.addEventListener(
            "input",
            this.checkAnswerDropDown.bind(this, this.title, this.correctAnswer)
        );
    }

    checkAnswerDropDown(title, rightInput) {
        var currentElement = document.getElementById(title);
        var input = currentElement.options[currentElement.selectedIndex].text;
        if (input == rightInput) {
            var field = document.getElementById("fieldset-" + this.title);
            field.style.backgroundColor = "lightgreen";
        } else {
            var field = document.getElementById("fieldset-" + this.title);
            field.style.backgroundColor = "tomato";
        }
    }
}

function createOptions(value) {
    this.value = value;
    var option = document.createElement("option");
    Object.assign(option, {
        value: this.value,
    });
    var name = document.createTextNode(this.value);
    option.appendChild(name);
    return option;
}

class FITBQuestion extends Question {
    constructor(title, question, correctAnswer, placeHolder) {
        super(title, question, correctAnswer);
        this.placeHolder = placeHolder;
    }

    initializeFieldFITB() {
        var field = document.createElement("fieldset");
        field.setAttribute("class", "questionDiv__questionBox");
        field.setAttribute("id", "fieldset-" + this.title);
        var legend = document.createElement("legend");
        legend.setAttribute("class", "questionBox__title");
        var title = document.createTextNode(this.title);
        legend.appendChild(title);
        field.appendChild(legend);

        var questionP = document.createElement("p");
        var questionText = document.createTextNode(this.question);

        questionP.appendChild(questionText);
        field.appendChild(questionP);

        var inputField = createInput(
            this.title,
            null,
            "text",
            this.placeHolder
        );
        field.appendChild(inputField);

        questionDiv.appendChild(field);

        inputField.addEventListener(
            "input",
            this.checkAnswer.bind(this, this.title, this.correctAnswer, 0)
        );
    }
}

// Create input with desirable variables
function createInput(name, value, type, placeHolder) {
    this.name = name;
    this.value = value;
    this.type = type;
    this.placeHolder = placeHolder;

    var inputElem = document.createElement("input");
    Object.assign(inputElem, {
        type: this.type,
        name: this.name,
        value: this.value,
    });
    if (this.placeHolder)
        Object.assign(inputElem, { placeholder: this.placeHolder });
    return inputElem;
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

dropDownFooter1 = new dropDownFooter(
    "select-element-menu__label",
    "Select tag:",
    "select-element-menu__select-tag",
    "selectTagMenu",
    ["body", "header", "footer", "article", "aside", "section"],
    false,
    "footer__select-element-menu footer__menu"
);
dropDownFooter2 = new dropDownFooter(
    "select-element-menu__label",
    "Select Element:",
    "select-element-menu__select-item",
    "elementsOfTag",
    [],
    false,
    "footer__select-element-menu footer__menu"
);
dropDownFooter3 = new dropDownFooter(
    "select-property-menu__label",
    "Select property:",
    "select-propert-menu__select-color-font",
    "selectedProperty",
    ["backgroundColor", "fontColor", "fontSize"],
    false,
    "footer__select-property-menu footer__menu"
);
dropDownFooter4 = new dropDownFooter(
    "select-propert-menu__label",
    "Choose a color or font size:",
    "color-font-group__font",
    "fontSize",
    ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"],
    true,
    "footer__select-property-menu footer__menu"
);

Q1 = new FITBQuestion(
    "Q1",
    "In January of 2000, ______ became a standard together with HTML 4.01.",
    "XHTML",
    "Fill in the blank:"
);
Q2 = new selectQuestion(
    "Q2",
    "In which country was the World Wide Web invented?",
    "Switzerland",
    ["Switzerland", "USA", "France", "UK"]
);
Q3 = new selectQuestion("Q3", "What does the H in HTML stand for?", "Hyper", [
    "Hyper",
    "Horror",
    "Historic",
    "Hard",
    "Handy",
    "Hardware",
]);
Q4 = new selectQuestion(
    "Q4",
    "Who knows the most about the internet?",
    "Sergey Sosnovksy",
    ["Sergey Sosnovksy", "Bill Gates", "Tim Berners-Lee", "Jorrit Koerts"]
);
Q5 = new FITBQuestion(
    "Q5",
    "Paragraph. Enclose paragraphs in an article within ______ tags.",
    "<p>",
    "Fill in the blank:"
);

window.addEventListener("load", function () {
    initializeDiv(
        "footer__webtech",
        "Webtech UU",
        "http://www.cs.uu.nl/education/vak.php?vak=INFOB2WT"
    );
    initializeDiv("footer__navigation", null, null);
    initializeDiv(
        "footer__terms",
        "Terms and conditions",
        "../resources/Terms.pdf"
    );
    initializeDiv("footer__select-element-menu footer__menu", null, null);
    initializeDiv("footer__select-property-menu footer__menu", null, null);
    initializeDiv("footer__button-group footer__menu", null, null);
    dropDownFooter1.createDropDown();
    dropDownFooter2.createDropDown();
    dropDownFooter3.createDropDown();
    dropDownFooter4.createDropDown();
    createFooterButton("button-group__apply", "applyButton", "Apply");
    createFooterButton(
        "button-group__light-mode",
        "darkmodeToggle",
        "Toggle light mode"
    );
    createFooterButton(
        "button-group__count",
        "countSelectedElement",
        "count selected element"
    );
    initializeHeader();
    initializeQuestionDiv();
    initializeUnorderedList(
        "navigation__list",
        "upperList",
        "body__navigation"
    );
    initializeUnorderedList(
        "navigation__list",
        "lowerList",
        "footer__navigation"
    );
    initializeList("upperList");
    initializeList("lowerList");
    Q1.initializeFieldFITB();
    Q2.initializeFieldMC();
    Q3.initializeFieldDropDown();
    Q4.initializeFieldMC();
    Q5.initializeFieldFITB();
});
