const canvas = document.getElementById('flappyBirdCanvas');
const ctx = canvas.getContext('2d');


window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (!gameStarted) {
            startGame();
        }
        if (!gameOver) {
            bird.velocity = -bird.jumpStrength;
        } else {
            resetGame();
            gameOver = false;
            gameLost = false;
        }
    }
});

// cargar gif  de perder y finalizar
const gameOverImage = document.createElement('img');
gameOverImage.src = '2802-aniversary/assets/images/peach-goma-confetil.gif'; // Cambia 'game_over.gif' con la ruta de tu imagen GIF

const gameLostImage = document.createElement('img');
gameLostImage.src = '2802-aniversary/assets/images/peach-cry.gif'; // Cambia 'game_over.gif' con la ruta de tu imagen GIF

const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 70,
    height: 70,
    image: new Image(),
    velocity: 0,
    gravity: 0.5,
    jumpStrength: 8
};

const background = new Image();
background.src = '2802-aniversary/assets/images/fondo1.png';

const obstacle = {
    width: 100,
    height: 250,
    x: canvas.width,
    y: Math.floor(Math.random() * (canvas.height - 300)) + 100,
    image: new Image(),
    passed: false
};

let score = 0;
let gameStarted = false;
let gameOver = false;
let gameLost = false;

bird.image.src = '2802-aniversary/assets/images/peach-angel.png';

// Cambia 'obstacle.png' con la ruta de tu imagen del obstáculo
obstacle.image.src = '2802-aniversary/assets/images/goma.png';
  

function update() {
    if (!gameStarted || gameOver || gameLost) {
        return;
    }

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

     window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            if (!gameStarted) {
                startGame();
            }
            bird.velocity = -bird.jumpStrength;
        }
    });

    obstacle.x -= 5;

    if (bird.x > obstacle.x + obstacle.width && !obstacle.passed) {
        score+=5;
        obstacle.passed = true;
    }

    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width;
        obstacle.y = Math.floor(Math.random() * (canvas.height - 300)) + 100;
        obstacle.passed = false;
    }
    //condicion para ver si topa en el cielo o el suelo
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        lostGame();
    }

    if (score >= 50) {
        endGame();
    }

    if (
        bird.x < obstacle.x + obstacle.width &&
        bird.x + bird.width > obstacle.x &&
        bird.y < obstacle.y + obstacle.height &&
        bird.y + bird.height > obstacle.y
    ) {
        lostGame();
    }
}

function draw() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(bird.image, bird.x, bird.y, bird.width, bird.height);

    // Dibuja la imagen del obstáculo en lugar de un rectángulo
    ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Puntaje: ${score}`, 10, 30);
    
    if (gameOver) {
        ctx.drawImage(gameOverImage, canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 200);
        //ctx.fillText('\n  Espera unos segundos para volver a iniciar', canvas.width / 2 - 130, canvas.height / 2 + 60);
       
    }
    if(gameLost) {
        ctx.drawImage(gameLostImage, canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 200);
        
    }
}

function startGame() {
    gameStarted = true;
}

function endGame() {
    gameOver = true;
    
    // Añadir lógica para reiniciar el juego después de un tiempo (por ejemplo, 2 segundos)
    
    setTimeout(() => {
        resetGame();
        gameOver = false;
    }, 2000);
}

    
 
function lostGame(){
    gameLost = true;
    setTimeout(() => {
        resetGame();
        gameLost = false;
    }, 2000);
    
}

function resetGame() {
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    obstacle.x = canvas.width;
    obstacle.y = Math.floor(Math.random() * (canvas.height - 300)) + 100;
    obstacle.passed = false;
    score = 0;
    gameStarted = false;
    gameOver = false;
    gameLost = false;
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

window.onload = function () {
    gameLoop();
};
