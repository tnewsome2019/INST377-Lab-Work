document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0



    //The Tetrominos
    const lTetromino = [
        [1, width+1, width*2+1, 2], 
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1], 
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2], 
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ];

    const oTetromino = [
        [0, 1, width, width+1], 
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1], 
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]
    
    const theTetrominos = [
        lTetromino, 
        zTetromino, 
        tTetromino, 
        oTetromino, 
        iTetromino]

    let currentPosition = 4
    let currentRotation = 0
    

    //randomly select a Tetromino and its rotation
    let random = Math.floor(Math.random()*theTetrominos.length)
    let current = theTetrominos[random][0]

    //draw the tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }
    
    //undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    //make the tetromino move down every second 
    //timerId = setInterval(moveDown, 1000)

    //assign function to keycodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()  
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }

    document.addEventListener('keyup', control)

    //move dwon function

    function moveDown() {
        undraw()
        currentPosition += width
        draw()
    }

    //freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start new tetrmino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominos.length)
            current = theTetrominos[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    //move lfet unless theres a blockage 
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -+1

        if(current.some(index => squares[currentPosition+ index].classList.contains('taken'))) {
            currentPosition += 1
        }

        draw()
    }

    //move right unless theres a blockage
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width)

        if(!isAtLeftEdge) currentPosition =+1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }

        draw()
    }

    //rotate the tetromino 
    function rotate() {
        undraw()
        currentPosition ++ 
        if(currentPosition === current.length) {//if currentroatetion gets to 4, make it go backto 0
            currentRotation = 0
        }

        current = theTetrominos[random][currentRotation]
        draw()
    }

    //show up next tetromino in mini grid
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displaywidth = 4
    let displayIndex = 0
    

    //the tetrominis w/o rotation
    const upNextTetrominos = [
        [1, displaywidth+1, displaywidth*2+1, 2], //lTeteomino
        [0, displaywidth, displaywidth+1, displaywidth*2+1], //zTetromino
        [1, displaywidth, displaywidth+1, displaywidth+2], //tTetromino
        [0, 1, displaywidth, displaywidth+1 ], //oTetromino
        [1, displaywidth+1, displaywidth*2+1, displaywidth*3+1] //iTetromino
    ]

    //display the shape in the mini-grid display
    function displayShape() {
        //remove trace of trtromino from grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        upNextTetrominos[nextRandom] .forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }

    //add functionality ot the button
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        }   else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()*theTetrominos.length)
            displayShape()
        }
    }


    })