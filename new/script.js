const ctx = document.getElementById('example').getContext('2d'); 
let stopGame = true;
let frames = 0;

function mainLoop(){
    if(stopGame === false){
    console.log('game running')

    if(theCar.moveUp || theCar.moveDown || theCar.moveLeft || theCar.moveRight){
        theCar.move();
    }

        frames++;

        function drawSelf(u){
            ctx.fillStyle = 'black'
            ctx.fillRect(u.x, u.y, u.width, u.height)
        }

        ctx.clearRect(0,0,400,400);

        const fireballImg = new Image();
        fireballImg.src = "./images/car.png";

        function drawImg(){
            ctx.drawImage(fireballImg, theCar.x, theCar.y, theCar.height, theCar.width);
        }
        
        // drawImg();

        
        if(frames % 100 == 0){
            theGame.spawnObstacle()
        }
        
        theGame.obstacleArray.forEach((eachObstacle)=>{
            drawSelf(eachObstacle, true)
        })

        drawSelf(theCar);
        
        //All Obstacle Collisions
        theGame.obstacleArray.forEach((object)=>{
            object.obstacleCollision();
        })

        requestAnimationFrame(mainLoop);
    }
    else{
        function endGame() {
            console.log('losing')
            ctx.fillStyle = "black";
            ctx.font = "50px Arial";
            ctx.fillText("YOU LOSE", 75, 200);
            theGame = null;
            theCar = null;
        }
        endGame();
    }
}

class Obstacle{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    moveDownForever(){
        console.log('Obstacle moveDownForever()')
       let blah = setInterval(()=>{

            this.y += 10;

            if(this.y > 400){
                clearInterval(blah)
            }
        },100)
    }

    obstacleCollision(){
        console.log('Obstacle obstacleCollision()')
        
        let theCarLeft = theCar.x;
        let theCarRight = theCar.x + theCar.width;
        let theCarTop = theCar.y;
        let theCarBottom = theCar.y + theCar.height;

        if(this.x + this.width >= theCarLeft && this.x <= theCarRight && 
            this.y + this.height>= theCarTop && this.y <= theCarBottom ){
                if(this.y + this.height + 10 > theCar.y){
                    for(let i = 0; i < 10 ; i++){
                        this.y++
                    }
                }      
                stopGame = true;
        }
        }
}

class Car{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.movement = "";
        this.points = 0;
        this.moveUp;
        this.moveDown;
        this.moveRight;
        this.moveLeft;
        this.speed = 4;
    }

    move(){
        if(this.moveUp){
            this.y -= this.speed;
        }
        if(this.moveDown){
            this.y += this.speed;
        }
        if(this.moveLeft){
            this.x -= this.speed;
        }
        if(this.moveRight){
            this.x += this.speed;
        }
    }
}

class Game{
    constructor(){
        this.obstacleArray = [];
    }


    spawnObstacle(){
        console.log('Game spawnObstacle()')
        let rWidth = 100;
        let rHeight = 50;
        let rX = Math.floor(Math.random() * 200);
        let rY= 0 - rHeight;
        let newObstacle = new Obstacle(rX, rY, rWidth, rHeight);
        this.obstacleArray.push(newObstacle);
        newObstacle.moveDownForever();
    }

    clearUnusedObstacles(){
        this.obstacleArray.forEach((ob, i)=>{
            if(ob.y > 400){
                this.obstacleArray.splice(i, 1)
            }
        })
    }
}

//KEY COMMANDS
document.onkeypress = function(e){

    if(e.key === "s"){
        theCar.moveDown = true;
    }
    if(e.key === "w"){
        theCar.moveUp = true;
    }
    if(e.key === "a"){
        theCar.moveLeft = true;
    }
    if(e.key === "d"){
        theCar.moveRight = true;
    }

}

document.onkeyup = function(e){
    if(e.key === "s"){
        theCar.moveDown = false;
    }
    if(e.key === "w"){
        theCar.moveUp = false;
    }
    if(e.key === "a"){
        theCar.moveLeft = false;
    }
    if(e.key === "d"){
        theCar.moveRight = false;
    }
}

// var keyState = {};    
// window.addEventListener('keydown',function(e){
//     keyState[e.key || e.which] = true;
// },true);    
// window.addEventListener('keyup',function(e){
//     keyState[e.key || e.which] = false;
// },true);

// x = 100;

// function gameLoop() {
//     if (keyState["a"]){
//         x = -1;
//     }    
//     if (keyState["d"]){
//         x = 1;
//     }
//     if (keyState["s"]){
//         y = 1;
//     }
//     if (keyState["w"]){
//         y = -1;
//     }

//     setTimeout(gameLoop, 10);


//START GAME
document.getElementById('start').onclick = startGame;

let theGame;

function startGame(){  
    stopGame = true;
    mainLoop();
    theGame = null;
    theCar = null;
    stopGame = false;
    theGame = new Game();
    theCar = new Car(250, 250, 20, 20);
    frames = 0;
    mainLoop();
}

window.setInterval(()=>{
    if(stopGame === false){
        theCar.points += 10;
    }
    document.querySelector('.points > span').innerHTML = theCar.points;
}, 50);
