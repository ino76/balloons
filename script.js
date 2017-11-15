// Balloon game
// author: Daniel Cech 2017

const airButton = document.getElementById('airButton')
const vybrano = document.getElementById('vybrano')
const kc = document.getElementById('Kc')
const nafouknuto = document.getElementById('nafouknuto')
const maxBalonku = document.getElementById('maxBalonku')
const maxInput = document.getElementById('maxInput')
const balloon = document.getElementById('balloon')
const START_WIDTH = '110px'
const START_HEIGHT = '150px'

let vybranoValue = Number(vybrano.textContent)
let kcValue = Number(kc.textContent)
let nafouknutoValue = Number(nafouknuto.textContent)
let maxBalonkuValue = Number(maxBalonku.textContent)
let balloonWidth = START_WIDTH
let balloonHeight = START_HEIGHT
balloon.style.width = balloonWidth
balloon.style.height = balloonHeight
let color = ['red', 'green', 'blue']
let probabilityToPop
let randColor 
let lastColor
let koeficient = 0

window.onload = changeColor()

// TODO ... dodelat funkci na nahodne prasknuti balonku
function checkRandomPop() {
    let random = Math.random() * 100
    random = Math.ceil(random)
    console.log('hod kostkou: ' + random)
    if (probabilityToPop >= random){
        popBalloon()
    }
}


function popBalloon() {
    console.log('POP!')
    nafouknutoValue++
    nafouknuto.textContent = nafouknutoValue
    balloon.src = randColor + 'Pop.png'
    airButton.disabled = true
    setTimeout(kontrola, 1000)
}


function changeColor() {
    let newColor = color[Math.floor(Math.random() * color.length)]
    if (newColor === lastColor) {
        console.log('jsme v rekurzi ... :O')
        changeColor()
        return
    }

    switch(newColor) {
        case 'red':
        probabilityToPop = 3
        koeficient += 60
        break;
        case 'blue':
        probabilityToPop = 6
        koeficient += 30
        break;
        case 'green':
        probabilityToPop = 12
        koeficient += 10
        break;
    }

    randColor = newColor
    lastColor = randColor
    console.log('barva nastavena na ' + randColor)
    console.log('pravdepodobnost prasknuti je ' + probabilityToPop + '%')
    balloon.src = randColor + 'Balloon.png'
}

function balonPrifouknut() {
    console.log('rozmer: ' +
        balloon.style.width.slice(0,-2) + ' x ' + balloon.style.height.slice(0,-2))
    let newWidth = Number(balloonWidth.slice(0, -2)) + 2
    let newHeight = Number(balloonHeight.slice(0, -2)) + 3
    balloonWidth = newWidth + 'px'
    balloonHeight = newHeight + 'px'
    balloon.style.width = balloonWidth
    balloon.style.height = balloonHeight
}


function nafoukni(){
    kcValue = Number(kc.textContent) + 5
    kc.textContent = (kcValue)
    checkRandomPop()
    balonPrifouknut()
}


function novyBalon() {
    kcValue = 0
    kc.textContent = kcValue
    balloonWidth = START_WIDTH
    balloonHeight = START_HEIGHT
    balloon.style.width = balloonWidth
    balloon.style.height = balloonHeight
    changeColor()
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
    kcValue = 0
    kc.textContent = kcValue
    vybrano.textContent = vybranoValue
    nafouknuto.textContent = nafouknutoValue
    kontrola()
}


function kontrola() {
    airButton.disabled = false
    if (maxBalonkuValue === nafouknutoValue) {
        alert('Dosly vam balonky.\n' + 'Koeficient: ' + koeficient +
              ', penez celkem vybrano: ' + vybranoValue + 'Kc' +
              '\nVase hodnoceni: ' + Math.ceil(vybranoValue / koeficient * 100) + '%')
        obnovNastaveni()
    } else {
        novyBalon()
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