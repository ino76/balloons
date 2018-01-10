// Balloon game
// author: Daniel Cech 2017

const airButton = document.getElementById('airButton')
const vybrano = document.getElementById('vybrano')
const kc = document.getElementById('Kc')
const nafouknuto = document.getElementById('nafouknuto')
const maxBalonku = document.getElementById('maxBalonku')
const maxInput = document.getElementById('maxInput')

const START_WIDTH = '110px'
const START_HEIGHT = '150px'
const coinsSound = document.getElementById('coins')
const popSound = document.getElementById('pop')

let vybranoValue = Number(vybrano.textContent)
let kcValue = Number(kc.textContent)
let nafouknutoValue = Number(nafouknuto.textContent)
let maxBalonkuValue = Number(maxBalonku.textContent)
balloon1.style.width = START_WIDTH
balloon1.style.height = START_HEIGHT

balloon2.style.width = START_WIDTH
balloon2.style.height = START_HEIGHT

balloon3.style.width = START_WIDTH
balloon3.style.height = START_HEIGHT
let color = ['red', 'green', 'blue']
let probabilityToPop
let addedProbability = 0
let randColor1
let randColor2
let randColor3
let lastColor
let koeficient = 0

let inPop = 0

window.onload = changeColor(1)
window.onload = changeColor(2)
window.onload = changeColor(3)

// zjisti jestli balonek praskl nebo nepraskl
function checkRandomPop() {
    let random = Math.random() * 100
    random = Math.ceil(random)
    console.log('hod kostkou: ' + random)
    if (probabilityToPop >= random){
        popBalloon()
    }
}


// praskne balon
function popBalloon(number) {
    if(inPop == number) {
        return
    }

    inPop = number

    popSound.play()
    console.log('POP!')
    nafouknutoValue++
    nafouknuto.textContent = nafouknutoValue
    const balloon = document.getElementById('balloon' + number)
    let color
    switch(number) {
        case 1:
            color = randColor1
        break;
        case 2:
            color = randColor2
        break;
        case 3:
            color = randColor3
        break;
    }
    balloon.src = 'images/' + color + 'Pop.png'
    airButton.disabled = true
    setTimeout(function(number){kontrola(number)}, 1000)
}

// zmeni barvu balonku tak aby se vybrala jina nez posledni
function changeColor(number) {

    let newColor = color[Math.floor(Math.random() * color.length)]

    probabilityToPop = 0

    switch(newColor) {
        case 'red':

        break;
        case 'blue':

        break;
        case 'green':
 
        break;
    }

    switch(number) {
        case 1:
            randColor1 = newColor
        break;
        case 2:
            randColor2 = newColor
        break;
        case 3:
            randColor3 = newColor
        break;
    }

    console.log('barva nastavena na ' + newColor)
    console.log('pravdepodobnost prasknuti je ' + probabilityToPop + '%')

    const balloon = document.getElementById('balloon' + number)
    balloon.src = 'images/' + newColor + 'Balloon.png'
}



function balonPrifouknut() {
    console.log('rozmer: ' +
        balloon.style.width.slice(0,-2) + ' x ' + balloon.style.height.slice(0,-2))
    let newWidth = Number(balloonWidth.slice(0, -2)) + 10
    let newHeight = Number(balloonHeight.slice(0, -2)) + 15
    balloonWidth = newWidth + 'px'
    balloonHeight = newHeight + 'px'
    balloon.style.width = balloonWidth
    balloon.style.height = balloonHeight
}

// hlavni funkce nafouknuti balonku ... zajisti vsechny zmeny a vola vsechny funkce ktere se ucastni procesu
function nafoukni(){

    switch(randColor) {
        case 'red':
            kcValue = Number(kc.textContent) + (30 * probabilityToPop) + 5
        break;

        case 'blue':
            kcValue = Number(kc.textContent) + (15 * probabilityToPop) + 5
        break;

        case 'green':
            kcValue = Number(kc.textContent) + (5 * probabilityToPop) + 5
        break;
    }
    
    kc.textContent = (kcValue)
    checkRandomPop()
    balonPrifouknut()
    probabilityToPop += addedProbability
    console.log('pravdepodobnost prasknuti je ' + probabilityToPop + '%')
    console.log('odmena je ' + kc.textContent + ' kreditu')
}


function novyBalon(number) {
    kcValue = 0
    kc.textContent = kcValue

    const balloon = document.getElementById('balloon' + number)
    balloon.style.width = START_WIDTH
    balloon.style.height = START_HEIGHT
    changeColor(number)
}


function setMax() {
    if (Number(maxInput.value) > nafouknutoValue) {
        maxBalonkuValue = Number(maxInput.value)
        maxBalonku.textContent = maxBalonkuValue
    } else {
        number.value == nafouknutoValue + 1
    }
}


function vyber() {
    nafouknutoValue++
    vybranoValue += kcValue
    kc.textContent = kcValue
    vybrano.textContent = vybranoValue
    nafouknuto.textContent = nafouknutoValue
    if(kcValue > 0) {
        kcValue = 0
        coinsSound.play()
    }
    kontrola()
}


function kontrola(number) {
    inPop = 0
    airButton.disabled = false
    if (maxBalonkuValue === nafouknutoValue) {
        alert('All balloons were used.\nSummary:\n\n' + 'Koeficient: ' + koeficient +
              '\nCollected coins: ' + vybranoValue +
              '\nOverall rating: ' + Math.ceil(vybranoValue / koeficient * 100) + '%')
        obnovNastaveni()
    } else {
        novyBalon(number)
    }
}


function obnovNastaveni() {
    koeficient = 0
    vybranoValue = 0
    kcValue = 0
    nafouknutoValue = 0
    vybrano.textContent = vybranoValue
    kc.textContent = kcValue
    nafouknuto.textContent = nafouknutoValue
    novyBalon()
}