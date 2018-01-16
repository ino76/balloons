// Balloon game
// author: Daniel Cech 2017

const START_WIDTH = '110px'
const START_HEIGHT = '150px'
const coinsSound = document.getElementById('coins')
const popSound = document.getElementById('pop')
const points = document.getElementById('points')
const poppedValue = document.getElementById('popped')
const balloonsMax = document.getElementById('balloonsMax')
const bonusPoints = document.getElementById('bonusPoints')
let popped = 0
let maxBalloons = Number(maxBalonku.textContent)
balloon1.style.width = START_WIDTH
balloon1.style.height = START_HEIGHT

// balloon2.style.width = START_WIDTH
// balloon2.style.height = START_HEIGHT

// balloon3.style.width = START_WIDTH
// balloon3.style.height = START_HEIGHT
let color = ['red', 'green', 'blue']

window.onload = newGame()

function newBalloon(number) {
    const balloon = document.getElementById('balloon' + number)
    
    bonusPoints.textContent = ''
    balloon.dataset.popped = ''
    poppedValue.textContent = popped
    
    const probability = document.getElementById('balloon' + number + 'percent')
    balloon.dataset.probability = 0
    probability.innerHTML = 0
    balloon.dataset.blowed = "false"
    
    balloon.style.width = START_WIDTH
    balloon.style.height = START_HEIGHT
    changeColor(number)

    const balloonRight =  document.getElementById('balloon' + number + 'right')
    const balloonLeft =  document.getElementById('balloon' + number + 'left')
    balloonRight.textContent = '|||||'
    balloonLeft.textContent = ''
    check()
}

// zmeni barvu balonku
function changeColor(number) {

    const newColor = color[Math.floor(Math.random() * color.length)]
   
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
    const balloon = document.getElementById('balloon' + number)
    balloon.src = 'images/' + newColor + 'Balloon.png'
    balloon.dataset.color = newColor
}


// hlavni funkce nafouknuti balonku ... zajisti vsechny zmeny a vola vsechny funkce ktere se ucastni procesu
function tryToInflate(number){

    const balloon = document.getElementById('balloon' + number)

    if(balloon.dataset.popped == 'pop') {
        return
    }

    const color = balloon.dataset.color
    const probability = document.getElementById('balloon' + number + 'percent')
    let probabilityData = Number(balloon.dataset.probability)
    
    balloon.dataset.blowed = "true"

    if(dice(1, 100) <= probabilityData) {
        popBalloon(number)
        return
    }

    switch(color) {
        case "red":
        probabilityData += dice(12, 20) 
        break;
        case "blue":
        probabilityData += dice(10, 15) 
        break;
        case "green":
        probabilityData += dice(5, 12) 
        break;
    }

    balloon.dataset.probability = probabilityData
    probability.innerHTML = probabilityData
    inflate(number)
}


//zvetsi velikost konkretniho balonu a zmeni barvu carkoveho ukazatele
function inflate(number) {
    
    const points = document.getElementById('points')
    const balloon = document.getElementById('balloon' + number)
    const probability = document.getElementById('balloon' + number + 'percent')
    let probabilityData = Number(balloon.dataset.probability)
    bonusPoints.textContent = '+ ' + Math.floor(Number(points.innerHTML) * (probabilityData / 100)) + ' points'

    const width = (Number(balloon.style.width.slice(0, -2)) + 16) + 'px'
    const height = (Number(balloon.style.height.slice(0, -2)) + 24) + 'px'
    balloon.style.width = width
    balloon.style.height = height

    const balloonRight =  document.getElementById('balloon' + number + 'right')
    const balloonLeft =  document.getElementById('balloon' + number + 'left')
    const numberOfRight = balloonRight.textContent.length
    if(numberOfRight > 0) {
        balloonLeft.textContent += '|'
        balloonRight.textContent = balloonRight.textContent.substr(1);
    } else {
        popBalloon(number)
    }

    switch (numberOfRight) {
        case 5:
        case 4:
            balloonLeft.style.color = "#0bd10b"
        break;
        case 3:
        case 2:
            balloonLeft.style.color = "#e69e04"
        break;
        case 1:
            balloonLeft.style.color = "red"
            balloon.dataset.probability = 100
            probability.innerHTML = 100
            bonusPoints.textContent = '+ ' + points.innerHTML + ' points'
        break;
    }


    console.log('rozmer: ' +
        balloon.style.width.slice(0,-2) + ' x ' + balloon.style.height.slice(0,-2))
    console.log(balloon.dataset.probability)
}



// praskne balon
function popBalloon(number) {
    const balloon = document.getElementById('balloon' + number)

    balloon.dataset.popped = 'pop'

    popped++
    popSound.play()
    console.log('POP!')
    let color = balloon.dataset.color
    balloon.src = 'images/' + color + 'Pop.png'
    setTimeout(function(){newBalloon(number)}, 1000)
}


function collect() {
    const balloon1 = document.getElementById('balloon1').dataset.blowed
    // const balloon2 = document.getElementById('balloon2').dataset.blowed
    // const balloon3 = document.getElementById('balloon3').dataset.blowed

    let numberOfPoints = Number(points.innerHTML)
    let numberAtStart = numberOfPoints


    if(balloon1 == 'true') {
        const balloon = document.getElementById('balloon1')
        const probability = document.getElementById('balloon1percent')
        let probabilityData = Number(balloon.dataset.probability)
        numberOfPoints += Math.floor(numberOfPoints * (probabilityData / 100))
        coinsSound.currentTime = 0;
        coinsSound.play()
        points.textContent = numberOfPoints
        popped++
        points.textContent = numberOfPoints
        newBalloon(1) 
    }
    
    // if(balloon2 == 'true') {
    //     const balloon = document.getElementById('balloon2')
    //     const probability = document.getElementById('balloon2percent')
    //     let probabilityData = Number(balloon.dataset.probability)
    //     numberOfPoints += Math.floor(numberOfPoints * probabilityData / 100)
    //     points.textContent = numberOfPoints
    //     popped++
    //     newBalloon(2)
    // }

    // if (maxBalloons < popped) {
    //     newGame()
    //     return
    // }
    

    // if(balloon3 == 'true') {
    //     const balloon = document.getElementById('balloon3')
    //     const probability = document.getElementById('balloon3percent')
    //     let probabilityData = Number(balloon.dataset.probability)
    //     numberOfPoints += Math.floor(numberOfPoints * probabilityData / 100)
    //     points.textContent = numberOfPoints
    //     popped++
    //     newBalloon(3)
    // }

    // if (maxBalloons < popped) {
    //     newGame()
    //     return
    // }
    

}



// kostka min-max
function dice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }




function check() {
    if (maxBalloons <= popped) {
        alert('All balloons were used.\nYou have ' + points.textContent + ' points.')
        newGame()
    }
}


function newGame() {
    popped = 0
    poppedValue.textContent = 0
    newBalloon(1)
    points.textContent = '100'
    
    
    // newBalloon(2)
    // newBalloon(3)
}