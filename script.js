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
const c0 = new Card("Favor packaging over toy drink water out of the faucet yet scamper, but jump off balcony", p0, [-20, -20, -20, -20], [10, 10, 10, 10]);
const c1 = new Card("onto stranger's head milk the cow try to jump onto window and fall while scratching at wall", p1, [-20, -20, -20, -20], [10, 10, 10, 10]);
const c2 = new Card("and i show my fluffy belly but it's a trap! if you pet it i will tear up your hand", p2, [-20, -20, -20, -20], [10, 10, 10, 10]);
const c3 = new Card("Small kitty warm kitty little balls of fur attack the dog then pretend like nothing happened howl uncontrollably for no reason for be a nyan cat", p3, [-20, -20, -20, -20], [10, 10, 10, 10]);
const c4 = new Card("feel great about it", p4, [-20, -20, -20, -20], [10, 10, 10, 10]);
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
let mind, body, work, money;
let round;
let running = false, over = false;
let choice;

// wrapText algorithm from https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
function wrapText (context, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' '),
        line = '',
        lineCount = 0,
        i,
        test,
        metrics;
    for (i = 0; i < words.length; i++) {
        test = words[i];
        metrics = context.measureText(test);
        while (metrics.width > maxWidth) {
            // Determine how much of the word will fit
            test = test.substring(0, test.length - 1);
            metrics = context.measureText(test);
        }
        if (words[i] != test) {
            words.splice(i + 1, 0,  words[i].substr(test.length))
            words[i] = test;
        }  
        test = line + words[i] + ' ';  
        metrics = context.measureText(test);
        
        if (metrics.width > maxWidth && i > 0) {
            context.fillText(line, x, y);
            line = words[i] + ' ';
            y += lineHeight;
            lineCount++;
        }
        else {
            line = test;
        }
    }
    context.fillText(line, x, y);
}
// game
function init() {
    round = 0;
    running = false;
    over = false;
    mind = 50, body = 50, work = 50, money = 50;
    cards = backupAarray;
    startScreen();
    listen();
}
function listen() {
    document.addEventListener('keydown', function (key) {
        // Handle the 'Press any key to begin' function and start the game.
        if (running === false) {
            running = true;
        }
        if (key.keyCode == 37) {
            choice = 0;
            window.requestAnimationFrame(update);
            // window.requestAnimationFrame(loop);
        } else if (key.keyCode == 39) {
            choice = 1;
            window.requestAnimationFrame(update);
            // window.requestAnimationFrame(loop);
        } else {
            choice = -1;
        }
        console.log(choice);
    });
}
function startScreen() {
    drawBg();
    ctx.fillText('Press Left or Right Key to Play',
        canvas.width / 2,
        canvas.height / 2 + 15
    );
}
function endScreen(win) {
    drawBg();
    ctx.fillText('You Lost, Restarting in 3 Sec',
        canvas.width / 2,
        canvas.height / 2 + 15
    );
    over = true;
    console.log('over');
    setTimeout(function () {init();}, 3000);
}
function update() {
    if (!over) {
        //end-game conditions
        if ((mind >= 100 || mind <= 0) || (body >= 100 || body <= 0) || 
        (work >= 100 || work <= 0) || (money >= 100 || money <=0)) {
            endScreen(0);
            console.log('end 1');
            return;
        } else if (round >= cards.length - 1) { // round > cards array length
            endScreen(1);
            return;
        } else if (!cards.length) {
            cards = backupAarray;
        }
        round++;
        // ramdomly select a card
        let i = Math.floor(Math.random() * cards.length);
        // draw card
        drawCard(i);
    }
}
function drawCard(i) {
    let currentCard = cards[i];
    drawBg();
    ctx.font = '18px Menlo';
    wrapText(ctx, currentCard.narrative, canvas.width / 2, 125, 430, 26);
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
   ctx.rect(20, 20, 102.5, (100-mind)*.55);
   ctx.fillStyle = "#2e3418";
   ctx.fill();
   // body
   ctx.beginPath();
   ctx.rect(102.5 + 20, 20, 102.5, (100 - body) * .55);
   ctx.fillStyle = "#2e3418";
   ctx.fill();
   // work
   ctx.beginPath();
   ctx.rect(102.5 * 2 + 20, 20, 102.5, (100 - work) * .55);
   ctx.fillStyle = "#2e3418";
   ctx.fill();
   // money
   ctx.beginPath();
   ctx.rect(102.5 * 3 + 20, 20, 102.5, (100 - money) * .55);
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
    drawBg();
    update();
    // If the game is not over, draw the next frame.
    // if (!over) requestAnimationFrame(loop);
}

window.onload = function () {
    init();
}