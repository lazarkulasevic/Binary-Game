let tableTable = document.getElementById('table');
let tableResults = document.querySelector('.results');
let spanPercent = document.querySelector('span');
let faBtn = document.querySelector('.fa');

let mainNumber = Math.floor(Math.random() * 100) + 1;
let counter = 1;

let userAccuracy = {
    accuracy: 100,
    win: 0,
    numberOfPlay: 0
}

for (let i = 1; i <= 10; i++) {
    let trElement = document.createElement('tr');
    tableTable.appendChild(trElement);

    for (let i = 1; i <= 10; i++) {
        let tdElement = document.createElement('td');
        tdElement.classList.add('number')
        trElement.appendChild(tdElement);
    }
}

let tdElementAll = document.querySelectorAll('.number');

tdElementAll.forEach((td, i) => {
    let tdNumber = document.createTextNode(`${i + 1}`);
    td.appendChild(tdNumber);
});

tableTable.addEventListener('click', event => {
    if (event.target.tagName == 'TD') {
        if (event.target.classList.contains('clicked')) return;
        event.target.classList.add('clicked');

        if (event.target.textContent == mainNumber) {
            playersAccuracy();
            tableResultsPrint(counter, event.target.textContent);
            congrats();
        } else {
            tableResultsPrint(counter, event.target.textContent);
            counter++;
            if (counter > 7) {
                playersAccuracy();
                alertPlayer();
            }
        }
    }
});

for (let i = 1; i <= 8; i++) {
    let trElement = document.createElement('tr');
    trElement.classList.add('tr-results')
    tableResults.appendChild(trElement);
}

let trElementAllRes = document.querySelectorAll('.tr-results');

for (let i = 1; i <= 3; i++) {
    let tdElement = document.createElement('td');
    trElementAllRes[0].appendChild(tdElement);
}

let tdText1 = document.createTextNode('Number of attempts');
let tdText2 = document.createTextNode('The number is');
let tdText3 = document.createTextNode('Attempts left');

let tdElementAllRes = document.querySelectorAll('.tr-results td');

tdElementAllRes[0].appendChild(tdText1);
tdElementAllRes[1].appendChild(tdText2);
tdElementAllRes[2].appendChild(tdText3);

function tableResultsPrint(counter, input) {
    let trElementAllRes = document.querySelectorAll('.tr-results');

    for (let i = 1; i <= 3; i++) {
        let tdElement = document.createElement('td');
        tdElement.classList.add(`num${counter}`)
        trElementAllRes[counter].appendChild(tdElement);
    }
    let classCounter = 'num' + counter;
    let tdElementAllRes = document.querySelectorAll(`.${classCounter}`)
    let greater = 'greater than', less = 'less than', numWanted = "correct! It's";
    let greaterLess = input == mainNumber ? numWanted : input > mainNumber ? less : greater;

    let numOfTry = document.createTextNode(`${counter}`);
    let greaterOrLess = document.createTextNode(`${greaterLess} ${input}`);
    let triesLeft = document.createTextNode(`${7 - counter}`);

    tdElementAllRes[0].appendChild(numOfTry);
    tdElementAllRes[1].appendChild(greaterOrLess);
    tdElementAllRes[2].appendChild(triesLeft);
}

function alertPlayer() {
    alert(`Game over! The number we were looking for is ${mainNumber}`);
    location.reload();
}

function congrats() {
    alert(`Congratulations! The number is ${mainNumber}`);
    location.reload();
}

// LOCAL STORAGE
if (JSON.parse(localStorage.getItem('userAccuracy')) === null) {
    localStorage.setItem('userAccuracy', JSON.stringify(userAccuracy));
} else {
    userAccuracy = JSON.parse(localStorage.getItem('userAccuracy'));
    spanPercent.textContent = `${userAccuracy.accuracy}%`;
}

function playersAccuracy() {
    if (counter <= 7) {
        userAccuracy.win += 1;
    }
    userAccuracy.numberOfPlay += 1;
    userAccuracy.accuracy = Math.round(userAccuracy.win / userAccuracy.numberOfPlay * 100);
    spanPercent.textContent = `${userAccuracy.accuracy}%`;

    return localStorage.setItem('userAccuracy', JSON.stringify(userAccuracy));
}

function binarySearch() {
    let target = 50;
    let bot = 0, top = 100;
    let fields = [];

    while (target != mainNumber) {
        fields.push(target);

        if (target < mainNumber) {
            bot = target;
        } else {
            top = target;
        }
        target = Math.round((top + bot) / 2);
    }
    fields.push(target);

    return fields;
}

function demo() {
    let i = 0;
    fields = binarySearch();

    let coloring = setInterval(() => {
        let num = fields[i];
        tableResultsPrint(counter, num);
        i += 1;
        counter += 1;

        tdElementAll[num - 1].classList.add('clicked');
        if (i == fields.length) {
            tdElementAll[num-1].classList.add('wanted');
            clearInterval(coloring);
        }
    }, 800);
}

faBtn.addEventListener('click', () => {
    demo();

}, {once: true});