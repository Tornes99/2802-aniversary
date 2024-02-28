const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Fondo
const backgroundImage = new Image();
backgroundImage.src = '..//assets/images/fondo1.png'; // Reemplaza 'background.jpg' con la ruta de tu imagen de fondo

// Suelo
const groundColor = 'brown';
const groundHeight = 50;

// Jugador 1 (controlado por teclado)
const player1 = {
    x: 50,
    y: canvas.height - groundHeight - 60, // Ajuste para la nueva altura del jugador
    width: 30,
    height: 60, // Doble de altura
    color: 'green',
    speed: 5,
    isJumping: false
};

// Jugador 2 (controlado por teclado)
const player2 = {
    x: canvas.width - 80,
    y: canvas.height - groundHeight - 60, // Ajuste para la nueva altura del jugador
    width: 30,
    height: 60, // Doble de altura
    color: 'red',
    speed: 5,
    isJumping: false
};

// Temporizador
let timer = 600; // segundos

// Obstáculos (amarillos)
const obstacles = [
    { x: 200, y: canvas.height - groundHeight - 30, width: 30, height: 30, color: 'yellow' },
    { x: 400, y: canvas.height - groundHeight - 30, width: 30, height: 30, color: 'yellow' },
    // Puedes agregar más obstáculos según sea necesario
];

function update() {
    // Movimiento del jugador 1 con teclado
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                player1.x -= player1.speed;
                break;
            case 'ArrowRight':
                player1.x += player1.speed;
                break;
            case 'ArrowUp':
                if (!player1.isJumping) {
                    jump(player1);
                }
                break;
            case 'ArrowDown' :
                player1.y -= 20
                break;
        }
    });

    // Movimiento del jugador 2 con teclado
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'a':
                player2.x -= player2.speed;
                break;
            case 'd':
                player2.x += player2.speed;
                break;
            case 'w':
                if (!player2.isJumping) {
                    jump(player2);
                }
                break;
            case 's':
                // Agacharse (reducir la altura)
                player2.height = 30;
                break;
        }
    });

    // Restablecer altura al estar de pie
    window.addEventListener('keyup', (e) => {
        if (e.key === 's') {
            player2.height = 60; // Doble de altura
        }
    });

    // Movimiento automático de los obstáculos
    for (let obstacle of obstacles) {
        obstacle.x -= player1.speed;
        // Verificar colisiones con obstáculos
        if (
            player1.x < obstacle.x + obstacle.width &&
            player1.x + player1.width > obstacle.x &&
            player1.y < obstacle.y + obstacle.height &&
            player1.y + player1.height > obstacle.y
        ) {
            // Colisión con obstáculo para Jugador 1, puedes manejar esto según tus necesidades
            alert('¡Jugador 1 chocó con un obstáculo!');
        }
        if (
            player2.x < obstacle.x + obstacle.width &&
            player2.x + player2.width > obstacle.x &&
            player2.y < obstacle.y + obstacle.height &&
            player2.y + player2.height > obstacle.y
        ) {
            // Colisión con obstáculo para Jugador 2, puedes manejar esto según tus necesidades
            alert('¡Jugador 2 chocó con un obstáculo!');
        }
    }

    // Verificar si el tiempo se ha agotado
    if (timer <= 0) {
        alert('¡Tiempo agotado! Ambos jugadores pierden.');
        resetGame();
    }

    timer--; // Decrementa el temporizador
}

function draw() {
    // Dibuja el fondo
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Dibuja el suelo
    ctx.fillStyle = groundColor;
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    // Dibuja a Jugador 1
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

    // Dibuja a Jugador 2
    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

    // Dibuja los obstáculos
    for (let obstacle of obstacles) {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    // Dibuja el temporizador
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Tiempo: ${timer}s`, 10, 30);
}

function jump(player) {
    player.isJumping = true;
    let jumpHeight = 0;

    function jumpLoop() {
        if (jumpHeight < 60) { // Altura máxima del salto
            player.y -= 5; // Ajusta según la velocidad del salto
            jumpHeight += 5;
            requestAnimationFrame(jumpLoop);
        } else {
            // Restablece la posición y marca que ha terminado el salto
            player.isJumping = false;
        }
    }

    jumpLoop();
}

function resetGame() {
    timer = 60; // Reinicia el temporizador
    player1.x = 50; // Reinicia la posición de Jugador 1
    player2.x = canvas.width - 80; // Reinicia la posición de Jugador 2
    player1.y = canvas.height - groundHeight - 60; // Reinicia la posición de Jugador 1
    player2.y = canvas.height - groundHeight - 60; // Reinicia la posición de Jugador 2
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

window.onload = function () {
    gameLoop();
};
