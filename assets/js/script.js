'use strict'

/*-------------------------CALL-OBJECT----------------------------*/

let requestURL = './assets/json/json.json';
let request = new XMLHttpRequest();
request.open( 'GET', requestURL );
request.responseType = 'json';
request.send();

let basale;

request.onload = function () {
    basale = request.response;
}

/*----------------------VAR-DECLARATION---------------------------*/

let calculator = document.body.querySelector("#calculator");
let message = document.body.querySelector( "#message" );


/*--------------------LISTENER-FOR-CLICK--------------------------*/
calculator.addEventListener( "click", checkButton );
calculator.onsubmit = (e) => { e.preventDefault(); };

calculator.onpointerdown = function (e) {
    let button = e.target.closest("#calculate");

    if (!button) return;
    e.preventDefault();
}

/*------------------LISTENER-FOR-KEY-ENTER------------------------*/

calculator.addEventListener("focusin", listenEnter );
calculator.addEventListener("focusout", removePressEnter );


/*-------------------MANAGEMENT-KEY-ENTER-------------------------*/

function listenEnter(e) {
    calculator.addEventListener("keydown", pressEnter);

}

function removePressEnter(e) {
    calculator.removeEventListener("keydown", pressEnter);
}

function pressEnter(e) {
    let enter = e.key;

    if ( enter == "Enter" ) {
        getInformation();
    }
    else return;
}

/*----------------GET-THE-INFORMATION-BY-FORM---------------------*/

function checkButton(e) {
    let button = e.target;

    if (!button) return;

    switch( button.id ) {

        case "calculate" : {
            getInformation();
            break;
        }

        case "reset" : {
            
            let input = document.body.querySelector("#weight");
            let a = document.body.querySelector("#result-basale");
            let b = document.body.querySelector("#result-totale");
            let message = document.body.querySelector("#message");

            cleanText(input,a,b,message);
            input.classList.remove("error");
            break;
        }
    }   

}


function getInformation() {    

    let weight = calculator.weight;

    if ( !weight.value ) {
        message.textContent = "Inserisci un valore valido";
        weight.focus();
        weight.classList.add("error");
        weight.addEventListener("input", removeError );
        return;
    }

    weight.removeEventListener("input", removeError );

    weight = weight.value;
    let gender = calculator.gender.value;
    let age = calculator.age.value;
    let work = calculator.work.value;

    if( age != "18_29" && age != "30_59" ) {
	    work = "laf";
    } 

    let workout = calculator.workout.value;

    calculatorKcal( weight, gender, age, work, workout );
    
}

/*---------------------FUNCTION-CALCULATE-------------------------*/

function calculatorKcal( weight, gender, age, work, workout ) {

    let base = calculateBase(weight, gender, age);
    let activity = calculateActivity(gender, age, work, workout);
    let total = (base * activity).toFixed(2);

    write(base, total);
}

function calculateBase( w, g, a ) {

    let person = basale[g][a];

    let res = ( person.k1 * w ) + person.k2;

    res = res.toFixed(2);

    return res;

}

function calculateActivity(g, a, w, wt) {
    let person = basale[g][a];
    let res = person[w][wt];

    return res;
}
/*--------------------WRITE-RESULT-IN-A-DIV-----------------------*/

function write(base, total) {

    let result = document.body.querySelector("#result-basale");
    result.textContent = base;

    result = document.body.querySelector("#result-totale");
    result.textContent = total;

    result = null;
}

function removeError(e) {
    let weight = e.target.closest("#weight");

    if (!weight) return;

    weight.classList.remove("error");
    message.textContent = "";

}

function cleanText(...arr){
    for ( let elem of arr ) {
        elem.textContent = "";
        elem.value = "";
    }
}