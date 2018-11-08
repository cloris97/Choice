// load img
const topBar = new Image();
topBar.src = 'img/top.png';
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
const c0 = new Card("0", p0, [-10, -10, -10, -10], [10, 10, 10, 10]);
const c1 = new Card("1", p1, [-10, -10, -10, -10], [10, 10, 10, 10]);
const c2 = new Card("2", p2, [-10, -10, -10, -10], [10, 10, 10, 10]);
const c3 = new Card("3", p3, [-10, -10, -10, -10], [10, 10, 10, 10]);
const c4 = new Card("4", p4, [-10, -10, -10, -10], [10, 10, 10, 10]);
let cards = [];
cards.push(c0);
cards.push(c1);
cards.push(c2);
cards.push(c3);
cards.push(c4);
let backupAarray = cards.slice(0);

// GLOBAL
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 450;
canvas.height = 650;
ctx.textAlign = 'center';
let mind = 50, body = 50, work = 50, money = 50;
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
        }
        if (key.keyCode == 37) {
            choice = 0;
            window.requestAnimationFrame(update);
        } else if (key.keyCode == 39) {
            choice = 1;
            window.requestAnimationFrame(update);
        } else {
            choice = 100;
        }
        console.log(choice);
    });
}
function startScreen() {
    drawBg();
    ctx.fillText('Press Left or Right Arrow Key',
        canvas.width / 2,
        canvas.height / 2 + 15
    );
}
function endScreen(win) {

}
function update() {
    if (!over) {
        //end-game conditions
        if ((mind >= 100 || mind <= 0) || (body >= 100 || body <= 0) || 
        (work >= 100 || work <= 0) || (money >= 100 || money <=0)) {
            setTimeout(function () {
                Game.endScreen(0);
            }, 700);
        } else if (round >= cards.length - 1) { // round > cards array length
            setTimeout(function () {
                Game.endScreen(1);
            }, 700);
        } else if (!cards.length) {
            cards = backupAarray;
        }
        // ramdomly select a card
        let i = Math.floor(Math.random() * cards.length);
        // draw card
        drawCard(i);
    }
}
function drawCard(i) {
    let currentCard = cards[i];
    drawBg();
    ctx.fillText(currentCard.narrative, canvas.width / 2, 140);
    ctx.drawImage(currentCard.img, 60, 200);
    if (choice == 0) {
        mind += currentCard.n[0];
        body += currentCard.n[1];
        work += currentCard.n[2];
        money += currentCard.n[3]
    } else if (choice == 1) {
        mind += currentCard.y[0];
        body += currentCard.y[1];
        work += currentCard.y[2];
        money += currentCard.y[3]
    }
    mind = Math.max(mind, 0);
    mind = Math.min(mind, 100);
    body = Math.max(body, 0);
    body = Math.min(body, 100);
    work = Math.max(work, 0);
    work = Math.min(work, 100);
    money = Math.max(money, 0);
    money = Math.min(money, 100);
    drawBalance();
}
function drawBalance() {
    // top bar bg
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, 100);
    ctx.fillStyle = "#a6bd39";
    ctx.fill();
   // mind
   ctx.beginPath();
   ctx.rect(0, 0, 102.5, 100-mind);
   ctx.fillStyle = "#2e3418";
   ctx.fill();
   // body
   ctx.beginPath();
   ctx.rect(102.5, 0, 112, 100-body);
   ctx.fillStyle = "#2e3418";
   ctx.fill();
   // work
   ctx.beginPath();
   ctx.rect(102.5 * 2 + 10, 0, 120, 100-work);
   ctx.fillStyle = "#2e3418";
   ctx.fill();
   // money
   ctx.beginPath();
   ctx.rect(450 - 112, 0, 112, 100-money);
   ctx.fillStyle = "#2e3418";
   ctx.fill();
   // img
   ctx.drawImage(topBar, 0, 0);
}
function drawBg() {
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
    // balance
    drawBalance();
    // round
    ctx.font = '20px Menlo';
    ctx.fillStyle = "white";
    ctx.fillText(round + ' year', canvas.width / 2, 620);
}
function loop() {
    update();
    drawBg();
    // If the game is not over, draw the next frame.
    // if (!over) requestAnimationFrame(loop);
}

window.onload = function () {
    init();
}