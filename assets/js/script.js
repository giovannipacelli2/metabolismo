'use strict'

let basale = {
    man : {
        "18_29" : {
            k1 : 15.3,
            k2 : 679,
            light : [1.41, 1.55],   /*1: soggetto non allenato, 2: soggetto allenato*/
            medium : [1.70, 1.78],
            hard : [2.01, 2.10]
        },
        "30_59" : {
            k1 : 11.6,
            k2 : 879,
            light : [1.41, 1.55],
            medium : [1.70, 1.78],
            hard : [2.01, 2.10]
        },
        "60_74" : {
            k1 : 11.9,
            k2 : 700,
            laf : [1.40, 1.51]
        },
        "74" : {
            k1 : 8.4,
            k2 : 819,
            laf : [1.33, 1.51]
        }
    },

    woman :{
        "18_29" : {
            k1 : 14.7,
            k2 : 496,
            light : [1.42, 1.56],
            medium : [1.56, 1.64],
            hard : [1.73, 1.82]
        },
        "30_59" : {
            k1 : 8.7,
            k2 : 829,
            light : [1.42, 1.56],
            medium : [1.56, 1.64],
            hard : [1.73, 1.82]
        },
        "60_74" : {
            k1 : 9.2,
            k2 : 688,
            laf : [1.44, 1.56]
        },
        "74" : {
            k1 : 9.8,
            k2 : 624,
            laf : [1.37, 1.56]
        }
    }
}

let calculator = document.body.querySelector("#calculator");
let message = document.body.querySelector( "#message" );

calculator.onpointerdown = function (e) {
    let button = e.target.closest(".button");

    if (!button) return;
    e.preventDefault();
}

calculator.addEventListener( "click", checkButton );
calculator.addEventListener("focusin", checkKey );
calculator.onsubmit = (e) => { e.preventDefault(); };

/*-------------------MANAGEMENT-KEY-ENTER-------------------------*/

function checkKey(e) {
    let input = e.target.closest("#weight");
    
    if (!input) return;

    input.addEventListener("keydown", pressEnter);
    input.focus();
}

function removePressEnter(e) {
    let input = e.target.closest("#weight");

    if (!input) return;

    input.removeEventListener("keydown", pressEnter);
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
    let button = e.target.closest(".button");

    if (!button) return;

    getInformation();

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
