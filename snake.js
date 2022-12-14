const display = document.querySelector('.gamedisplay');

function createDisplay() {
    for (let i = 1; i <= 484; i++) {
        let div = document.createElement("div")
        
        if (i < 23 || i > 462 || i === 23 || i === 45 || i === 67 || i === 89 || i === 111 || i === 133 || i === 155 || i === 177 ||  i === 199 ||
            i === 221 || i === 243 || i === 265 || i === 287 || i === 309 || i === 331 ||  i === 353 ||  i === 375 ||  i === 397 ||  i === 419 || 
            i === 441 ||
            i === 44 || i === 66 || i === 88 || i === 110 || i === 132 || i === 154 || i === 176 || i === 198 ||  i === 220 ||
            i === 242 || i === 264 || i === 286 || i === 308 || i === 330 || i === 352 ||  i === 374 ||  i === 396 ||  i === 418 ||  i === 440 || 
            i === 462) {
                div.dataset.stopborder = "yes"
                div.classList.add('border-square')
            } else if (i === 227 || i === 228 || i === 229) {
                div.classList.add('snakebody')
            }

        display.appendChild(div)
        div.setAttribute('id', i)
        div.classList.add('square')
    }
}
createDisplay()

class Snake {

    constructor () {
        this.currentLength = 3
        this.speed = 320
        this.direction = "right"
        this.clickDirection = "right"
        this.snakeArray = [227, 228, 229] // <--- Last array item is snake head
        this.inGame = false
        this.result = 0
        this.bestResult = 0
    }

    startSettings() {
        this.currentLength = 3
        this.direction = "right"
        this.clickDirection = "right"
        this.snakeArray = [227, 228, 229]
        this.inGame = false

        document.querySelectorAll('.snakebody').forEach(item => item.classList.remove('snakebody'))

        let applenow = document.querySelector('.apple')
        applenow.classList.remove('apple')
    }
    
    main() {
        if (this.inGame === true) return
        this.inGame = true
        this.generateApple()

        this.inter = setInterval(() => {
            if (this.inPause === true) return
            this.move()
        }, this.speed)
    }

    move() {
        if (this.direction === "right") {
            this.snakeArray.push(this.snakeArray.at(-1) + 1) 
            this.checkGameOver()
            this.checkEat()
            this.checkYouWin()
        }
        if (this.direction === "left") {
            this.snakeArray.push(this.snakeArray.at(-1) - 1) 
            this.checkGameOver()
            this.checkEat()
            this.checkYouWin()
        }
        if (this.direction === "up") {
            this.snakeArray.push(this.snakeArray.at(-1) - 22) 
            this.checkGameOver()
            this.checkEat()
            this.checkYouWin()
        }
        if (this.direction === "down") {
            this.snakeArray.push(this.snakeArray.at(-1) + 22) 
            this.checkGameOver()
            this.checkEat()
            this.checkYouWin()
        }
    }

    changeDirection(dir) {
        this.clickDirection = dir
    }

    checkWrongMove() {
        if (this.clickDirection === "right" && this.direction === "right") return
        if (this.clickDirection === "left" && this.direction === "left") return
        if (this.clickDirection === "up" && this.direction === "up") return
        if (this.clickDirection === "down" && this.direction === "down") return

        if (this.clickDirection === "right" && this.direction === "left") return 
        if (this.clickDirection === "left" && this.direction === "right") return
        if (this.clickDirection === "up" && this.direction === "down") return 
        if (this.clickDirection === "down" && this.direction === "up") return 

        this.direction = this.clickDirection
    }

    checkEat() {
        if (this.gameOver === true) return
        this.eat = false
        let currentApple = document.querySelector('.apple')
        let currentAppleId = currentApple.getAttribute('id')
        let str1 = this.snakeArray.at(-1)
        let str2 = currentAppleId
        if (str1.toString() === str2.toString()) {
            currentApple.classList.remove('apple')
            this.generateApple()
            this.eat = true
            this.currentLength++
        }
        this.drawSnake()
    }

    drawSnake() {
        let headPosition = document.querySelector(`[id="${this.snakeArray.at(-1)}"]`)
        headPosition.classList.add('snakebody')
            
        let lastPositionElem = document.querySelector(`[id="${this.snakeArray[0]}"]`)
        if (this.eat === true || this.gameOver === true) return
        lastPositionElem.classList.remove('snakebody')
        this.snakeArray.shift()
    }

    generateApple() {
        let randomApple
        let appleSquare = document.querySelector('[id="2"]')

        while (appleSquare.classList.contains('snakebody') || appleSquare.classList.contains('border-square')) {
            randomApple = Math.floor(Math.random() * (462-24) + 24)
            appleSquare = document.querySelector(`[id="${randomApple}"]`)
        }

        appleSquare.classList.add('apple')
    }

    checkGameOver() {
        let currentSquare = document.querySelector(`[id="${this.snakeArray.at(-1)}"]`)
        if (currentSquare.classList.contains('border-square') || currentSquare.classList.contains('snakebody')) {
            this.gameOver = true
            this.inGame = false
            clearInterval(this.inter)
            this.result = this.currentLength
            if (this.bestResult <= this.currentLength) {
                this.bestResult = this.currentLength
            }
            this.gameOverDisplay()
            this.startSettings()
        }
    }

    gameOverDisplay() {
        let gameoverpop = document.querySelector('.popup-gameover')
        gameoverpop.style.display = 'flex'

        let yourscore = document.querySelector('.yourscore')
        yourscore.innerText = `${this.result}`

        let bestresult = document.querySelector('.bestresult')
        bestresult.innerText = `${this.bestResult}`
    }   

    pause(isPause) {
        if (this.inGame === false) return

        if (isPause === "pause") {
            this.inPause = true;
        } else if (isPause === "continue") {
            this.inPause = false;
            this.main()
        }
    }

    checkYouWin() {
        if (this.currentLength === 400) {
            let winpop = document.querySelector('.popup-win');
            winpop.style.display = 'flex'
            clearInterval(this.inter)
            this.startSettings()
        }
    }

}

const snake = new Snake()

const start = document.querySelector('#start');
const pause = document.querySelector('#pause');

// POPUP:

const helloPopup = document.querySelector('.popup-hello');
const okPopupBtn = document.querySelector('.ok-popup');
okPopupBtn.addEventListener('click', () => {
    helloPopup.style.display = 'none'
})

const gameoverPopup = document.querySelector('.popup-gameover');
const gameoverPlayAgain = document.querySelector('.gameover-playagain');
gameoverPlayAgain.addEventListener('click', () => {
    gameoverPopup.style.display = 'none'
    snake.gameOver = false
    start.style.display = 'flex'
    pause.style.display = 'none'
})

const pausePopup = document.querySelector('.popup-pause');
const continueBtn = document.querySelector('.pause-continue');
continueBtn.addEventListener('click', () => {
    snake.pause("continue")
    pausePopup.style.display = 'none'
})

const winPopup = document.querySelector('.popup-win');
const winPopupPlayAgain = document.querySelector('.win-playagain');
winPopupPlayAgain.addEventListener('click', () => {
    winPopup.style.display = 'none'
    start.style.display = 'flex'
    pause.style.display = 'none'
})

//START GAME:

start.addEventListener('click', () => {
    if (snake.inPause === true || snake.gameOver === true) return
    display.innerHTML = ""
    createDisplay()
    snake.main()
    helloPopup.style.display = 'none'
    gameoverPopup.style.display = 'none'
    start.style.display = 'none'
    pause.style.display = 'flex'
})

//PAUSE GAME:
pause.addEventListener('click', () => {
    snake.pause("pause")
    pausePopup.style.display = 'flex'
})


// CONTROLLER BUTTONS:
const upbtn = document.querySelector('#up');
const downbtn = document.querySelector('#down');
const leftbtn = document.querySelector('#left');
const rightbtn = document.querySelector('#right');

upbtn.addEventListener('click', () => {
    snake.changeDirection('up')
    snake.checkWrongMove()
})

downbtn.addEventListener('click', () => {
    snake.changeDirection('down')
    snake.checkWrongMove()
})

leftbtn.addEventListener('click', () => {
    snake.changeDirection('left')
    snake.checkWrongMove()
})

rightbtn.addEventListener('click', () => {
    snake.changeDirection('right')
    snake.checkWrongMove()
})


// KEYBOARD BUTTONS:
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
        snake.changeDirection('up')
        snake.checkWrongMove()
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
        snake.changeDirection('down')
        snake.checkWrongMove()
    } else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        snake.changeDirection('left')
        snake.checkWrongMove()
    } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        snake.changeDirection('right')
        snake.checkWrongMove()
    }
})