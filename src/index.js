import './styles.css'

//DEFINE CONSTANTS

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const BLUE_CLASS = 'blue'
const YELLOW_CLASS = 'yellow'
const WHITE_CLASS = 'white'

//GET HTML
//
//
const playAgain = document.querySelector('[data-play-again]')
const tileData = document.querySelectorAll('[data-tile]')
const flipContainers = Array.from(
  document.getElementsByClassName('flip-container')
)
const frontColor = Array.from(document.getElementsByClassName('front white'))
const backColor = Array.from(document.getElementsByClassName('back blue'))
const winningMessage = document.getElementById('winning-message-page')
//
//CLICK ON CONTAINERS => TRIGGERS GAME METHODS
//

flipContainers.forEach((container) => {
  container.addEventListener('click', handleClick, { once: true })
})
let turn = BLUE_CLASS
let counter = 0
function handleClick(e) {
  console.log(counter)
  counter++
  const container = e.currentTarget
  const currentClassColor = turn
  fixColor(container, currentClassColor)
  checkForWin(currentClassColor, counter)
  switchSides(currentClassColor)
  //console.log([...flipContainers].every(i => i.classList.contains('flip-container blue'|| 'flip-container yellow') ))
}

//FIXCOLOR

function fixColor(container, currentClassColor) {
  container.classList.add(currentClassColor)
  for (let i = 0; i < 9; i++) {
    if (flipContainers[i].classList.contains(BLUE_CLASS))
      frontColor[i].classList.replace('white', 'blue')
  }

  for (let i = 0; i < 9; i++)
    if (flipContainers[i].classList.contains(YELLOW_CLASS))
      frontColor[i].classList.replace('white', 'yellow')
}

//SWITCH BETWEEN COLORS

function switchSides(currentClassColor) {
  if (currentClassColor === BLUE_CLASS) {
    turn = YELLOW_CLASS
    for (let i = 0; i < 9; i++) backColor[i].classList.replace('blue', 'yellow')
  } else
    for (let i = 0; i < 9; i++) {
      backColor[i].classList.replace('yellow', 'blue')
      turn = BLUE_CLASS
    }
}

//CHECK FOR A WIN
function checkForWin(currentClassColor, counter) {
  if (
    WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return flipContainers[index].classList.contains(
          'flip-container' && currentClassColor
        )
      })
    })
  ) {
    winningMessage.classList.add('show')
    playAgain.addEventListener('click', resetScreen)
  }
  if (counter === 9) {
    winningMessage.classList.add('show')
    playAgain.addEventListener('click', resetScreen)
  }
}

const resetScreen = () => {
  winningMessage.classList.remove('show')
  for (let i = 0; i < 9; i++) {
    frontColor[i].classList.replace('yellow', 'white')
    frontColor[i].classList.replace('blue', 'white')
    flipContainers[i].classList.remove('yellow')
    flipContainers[i].classList.remove('blue')
    flipContainers[i].removeEventListener('click', handleClick)
    flipContainers[i].addEventListener('click', handleClick, { once: true })
    counter = 0
  }
}
