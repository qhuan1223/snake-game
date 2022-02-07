let table = document.getElementById("gameboard");
let score = document.getElementById("score")
let td = document.getElementsByTagName("td")
let currentScore = 0;
let count = 0;


function createGrid(){ // make a table 20x20
    for(let j = 0; j < 20; j++){
        let row = document.createElement("tr");
        for(let i = 0; i < 20; i++){
            let td = document.createElement("td");
            td.id=`row${j} column${i}`
            row.appendChild(td);
        }
        table.appendChild(row)
    }
}
createGrid();


 let snake = {
     position:[[10,8],[10,7],[10,6], [10,5]],
     nextDirection: [0,1]
 }


 let gameState = {
     food: [10,15],
     snake: snake
 }

 window.addEventListener("keydown", function (event) { // make it so the arrows can work and change the directions of the snake 
     const key = event.key;

     switch (event.key) {
        case "ArrowLeft":
            snake.nextDirection = [0,-1] 
            // Left pressed
            break;
        case "ArrowRight":
            snake.nextDirection = [0,1]
            // Right pressed
            break;
        case "ArrowUp":
            snake.nextDirection = [-1,0]
            // Up pressed
            break;
        case "ArrowDown":
            snake.nextDirection =[1,0]
            // Down pressed
            break;
    }
 })





 function makeSnake () { // have snake appear on the html
    for( let i = 0; i < snake.position.length; i++) {
        let here = snake.position[i];
        let body = document.getElementById(`row${here[0]} column${here[1]}`)
        body.classList.add("snake")
        
    }

 }

 makeSnake()

 function getFood() { // have food appear on the html
    let food = gameState.food
    let oldCell = document.getElementById(`row${gameState.food[0]} column${gameState.food[1]}`)
    oldCell.classList.remove("food")

    let randomPosition = [Math.floor(20 * Math.random()), Math.floor(20 * Math.random())]
    gameState.food = randomPosition;

    
    let newCell = document.getElementById(`row${gameState.food[0]} column${gameState.food[1]}`) // 
    newCell.classList.add("food");
}

getFood()



let lost = false;

function movingSnake () { // have the snake move by looking at the nextDirection
    let head = snake.position[0].slice(); //[10,8]
    let headX = head[0] + snake.nextDirection[0];
    let headY = head[1] + snake.nextDirection[1];
    snake.position.unshift([headX, headY]) // [10,8] + [0,1] =[10,9] // add new head


    let tail = snake.position[snake.position.length-1] //[10,5] - [0,1] = [10,4]
    let cell = document.getElementById(`row${tail[0]} column${tail[1]}`) // 
    snake.position.pop()
    cell.classList.remove("snake") // remove old tail and make it appear on the html
    

    youLose()
    
    if (!lost) {
        makeSnake()
        randomFood()
    }
    
    
    
 }

 movingSnake()



function tick() {
    movingSnake()
}

 let timer = setInterval(tick, 1000/3) // this makes it so the snakes moves at a set time


 

function randomFood() {
    let food = gameState.food 
    
    
    // movingSnake();

    let head = snake.position[0].slice();
    
    let tail = snake.position[snake.position.length-1].slice()
    let tailX = tail[0] - snake.nextDirection[0];
    let tailY = tail[1] - snake.nextDirection[1];
    
    
    
    if (food[0] === head[0] && food[1] === head[1]) {
        snake.position.push([tailX, tailY])
        getFood();
        currentScore++
        count++
        console.log(count)
         // this is going too fast. How to slow it down 
        clearInterval(timer)
        timer = setInterval(tick, 1000/(3 + count))
    }
    score.textContent = `Current Score: ${currentScore}`;

}



// set up premeter

function youLose () {
    let head = snake.position[0].slice(); 
    

    if (head[0] < 0  || head[0] > 19 || head[1] < 0 || head[1] > 19) {
        table.textContent ="Game Over!"
        table.style.height = "300px";
        table.style.width = "300px";
        table.style.textAlign = "center"
        table.style.padding ="100px"
        table.style.margin ="100px"
        table.style.fontSize ="xxx-Large"
        clearInterval(timer)
        lost = true;
    }

    for (let i = 1; i < snake.position.length; i++) {
        let positions = snake.position[i];

        let positionX = snake.position[i][0]
        let positionY = snake.position[i][1]
        

        if (positionX === head[0] && positionY === head[1]) {
            table.textContent ="Game Over!"
            table.style.height = "300px";
            table.style.width = "300px";
            table.style.textAlign = "center"
            table.style.padding ="100px"
            table.style.margin ="100px"
            table.style.fontSize ="xxx-Large"
            clearInterval(timer)
            lost = true;
        }
    }
   
}

start.addEventListener("click", function resetGame(event) {
    return window.location.reload();
})
 


 // extra bonus, make different apples and different effects for each type of apples
// I give up on this 
