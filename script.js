// load cards
const p0 = new Image();
p0.src = 'img/0.png';
const p1 = new Image();
p1.src = 'img/1.png';
const p2 = new Image();
p2.src = 'img/2.png';
const p3 = new Image();
p3.src = 'img/3.png';
const p4 = new Image();
p4.src = 'img/4.png';
// Card(str, Image, array, array)
function Card (narrative, img, cNo, cYes) {
    this.narrative = narrative;
    this.img = img;
    this.n = cNo;
    this.y = cYes;
}
// initialize all cards and put in an array
const c0 = new Card("0", p0, [10, 20, 10,20], [-10, -20, -10, -20]);
const c1 = new Card("1", p1, [30, 40, 50, 60], [-30, -40, -50, -60]);
const c2 = new Card("2", p2, [30, 40, 50, 60], [-30, -40, -50, -60]);
const c3 = new Card("3", p3, [30, 40, 50, 60], [-30, -40, -50, -60]);
const c4 = new Card("4", p4, [30, 40, 50, 60], [-30, -40, -50, -60]);
let cards = [];
cards.push(c0);
cards.push(c1);
cards.push(c2);
cards.push(c3);
cards.push(c4);
// let cardsBackup = cards.slice(0);

// GLOBAL
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 450;
canvas.height = 650;
const topBar = document.getElementById('topBar');
let mind = 40, body = 40, work = 40, money = 40;
let round = 0;
let running = false, over = false;
let choice;

// game
function init() {
    startScreen();
    listen();
}
function listen() {
    document.addEventListener('keydown', function (key) {
        // Handle the 'Press any key to begin' function and start the game.
        if (running === false) {
            running = true;
            // window.requestAnimationFrame(loop);
            window.requestAnimationFrame(update);
        }
        if (key.keyCode == 39) {
            choice = 0;
        } else if (key.keyCode == 37) {
            choice = 1;
        } else {
            choice = 100;
        }
        console.log(choice);
    });
}
function startScreen() {
    draw();
    // Change the canvas font size and color
    ctx.font = '20px Menlo';
    ctx.fillStyle = "white";
    ctx.fillText('Press Any Key to Begin',
        canvas.width / 2 - 130,
        canvas.height / 2 + 15
    );
}
function endScreen(condition) {

}
function update() {
    if (!over) {
        //end-game conditions
        if (mind >= 100 && body >= 100 && work >= 100 && money >= 100) {
            setTimeout(function () {
                Game.endScreen(1);
            }, 700);
        } else if (mind <= 0 || body <= 0 || work <= 0 || money <= 0) {
            setTimeout(function () {
                Game.endScreen(0);
            }, 700);
        } else if (!cards.length) {
            // use the backup array
        }
        // ramdomly select a card
        let i = Math.floor(Math.random() * 5);
        // draw card
        ctx.drawImage(cards[i].img, 50, 150);
        console.log(cards[i].narrative);
    }
}
function drawCard(n) {

}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // bg fill
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#13130e";
    ctx.fill();
    // bot bar
    ctx.beginPath();
    ctx.rect(0, canvas.height - 75, canvas.width, 75);
    ctx.fillStyle = "black";
    ctx.fill();
    // mind
    ctx.beginPath();
    ctx.rect(0, 100 - mind, 112.5, mind);
    ctx.fillStyle = "#a6bd39";
    ctx.fill();
    // body
    ctx.beginPath();
    ctx.rect(112.5, 100 - body, 112.5, body);
    ctx.fillStyle = "#a6bd39";
    ctx.fill();
    // work
    ctx.beginPath();
    ctx.rect(112.5 * 2, 100 - work, 112.5, work);
    ctx.fillStyle = "#a6bd39";
    ctx.fill();
    // money
    ctx.beginPath();
    ctx.rect(450 - 112.5, 100 - money, 112.5, money);
    ctx.fillStyle = "#a6bd39";
    ctx.fill();

    // round
    ctx.font = '20px Menlo';
    ctx.fillStyle = "white";
    ctx.fillText(round + ' year', canvas.width / 2 - 35, 620);

    // img
    ctx.drawImage(topBar, 0, 0, 450, 100);
}
function loop() {
    update();
    draw();
    // If the game is not over, draw the next frame.
    if (!over) requestAnimationFrame(loop);
}

init();
// window.onload = function() {
//     var c = document.querySelector('canvas');
//     var ctx = c.getContext("2d");
//     ctx.drawImage(cards[0].img, 50, 150);
// }