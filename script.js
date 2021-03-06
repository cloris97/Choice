// load img
const topBar = new Image();
topBar.src = 'img/top.png';
const cat = new Image();
cat.src = 'img/cat.png';
const evil = new Image();
evil.src = 'img/evil.png';
const child = new Image();
child.src = 'img/child.png';
const friend = new Image();
friend.src = 'img/friend.png';
const paramedic = new Image();
paramedic.src = 'img/paramedic.png';
const parent = new Image();
parent.src = 'img/parent.png';
const police = new Image();
police.src = 'img/police.png';
const prof = new Image();
prof.src = 'img/prof.png';
const worker = new Image();
worker.src = 'img/worker.png';
const brain = new Image();
brain.src = 'img/brain.png';

// Card(str, Image, array, array, str, str)
function Card(narrative, img, cNo, cYes, l, r) {
    this.narrative = narrative;
    this.img = img;
    this.n = cNo;
    this.y = cYes;
    this.l = l;
    this.r = r;
}
// initialize all cards and put in an array
const c0 = new Card("I need your help this weekend", parent, [-10, 0, 10, 0], [10, 0, -10, 0], "I have a lot of studying<br/>to catch up on",
"Of course");
const c1 = new Card("How are you feeling today", parent, [-5, -5, -5, 0], [5, 5, 5, 0], "Eh", "Great");
const c2 = new Card("It’s been a while", parent, [-5, 0, 0, -5], [5, 0, 0, 5], "I’ve been busy", "I’ve been doing great!");
const c3 = new Card("There’s a massive party next weekend. We should get some weed",
    friend, [10, 5, 0, -10], [-10, -5, 0, -5], "The dispensary", "I heard Sam has some<br/>good cheap stuff");
const c4 = new Card("My younger sibling wants to try, can you buy some for us?",
    friend, [-10, 0, 0, -10], [10, 0, 0, 0], "The dispensary", "Underage smoking is bad,<br/>no way");
const c5 = new Card("Sam’s weed is making me feel sick, drive me home",
    friend, [-5, 0, 0, 0], [10, -20, 0, 0], "No, I smoked too", "I’m always there for you");
const c6 = new Card("Bet you can’t take two hits and then down two beers in less than two minutes",
    friend, [10, 10, 0, 0], [-20, -20, 0, -20], "I don't wanna do it", "Let me prove you wrong!");
const c7 = new Card("Meow", cat, [-5, -5, -5, -5], [5, 5, 5, 5], "...Leave", "Okay okay I’ll follow you");
const c8 = new Card("Prrr Meow Meow", cat, [-5, -5, -5, -5], [5, 5, 5, 5]);
const c9 = new Card("If Purple People Eaters are real… where do they find purple people to eat?",
    evil, [-5, -5, -5, -5], [5, 5, 5, 5], "Get out", "What");
const c10 = new Card("Does cannabis taste good? I want some too", child, [5, 0, 0, 0], [-5, 0, 0, -10], 
"There maximum penalties of<br/>14 years in jail for<br/>distributing to youth", "...");
const c11 = new Card("You ran a stop sign, explain yourself", 
    police, [-5, -5, -5, -5], [-10, -10, -10, -15], "Yes", "It was only a little");
const c12 = new Card("Remember not to drive impaired… Marijuana significantly affects judgment, motor coordination, and reaction time",
    police, [-10, -10, -10, 0], [5, 5, 10, 0], "Sure it does", "Oh I see");
const c13 = new Card("I hope all your assignments were finished throughout the weekend",
    prof, [10, -10, -10, -10], [-10, 10, 10, 0], "...", "Yes");
const c14 = new Card("CBD (cannabidiol) has minimal intoxicating properties but can help relieve insomnia, anxiety, spasticity, pain, and even epilepsy",
    paramedic, [10, 10, 10, 10], [-10, -10, -10, -10], "The more you know", "Blah Blah Blah");
const c15 = new Card("You’re not being responsible with your usage",
    brain, [10, 10, 10, 10], [-10, -10, -10, -10], "I know, I’ll be better", "I know,<br/>but I don’t want to miss out");

// push all cards into an array
let cards = [];
cards.push(c0);
cards.push(c1);
cards.push(c2);
cards.push(c3);
cards.push(c4);
cards.push(c5);
cards.push(c6);
cards.push(c7);
cards.push(c8);
cards.push(c9);
cards.push(c10);
cards.push(c11);
cards.push(c12);
cards.push(c13);
cards.push(c14);
cards.push(c15);
// create a backup of all cards when we've deleted all cards in the original array
let backupAarray = cards.slice(0);

// GLOBAL
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 450;
canvas.height = 650;
ctx.textAlign = 'center';
let mind, body, work, money;
let round;
let running = false,
    over = false;
let choice, party;

// wrapText algorithm from https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
function wrapText(context, text, x, y, maxWidth, lineHeight) {
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
            words.splice(i + 1, 0, words[i].substr(test.length))
            words[i] = test;
        }
        test = line + words[i] + ' ';
        metrics = context.measureText(test);

        if (metrics.width > maxWidth && i > 0) {
            context.fillText(line, x, y);
            line = words[i] + ' ';
            y += lineHeight;
            lineCount++;
        } else {
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
    party = false;
    cards = backupAarray.slice();
    startScreen();
    listen();
}

// key press listener
function listen() {
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    document.addEventListener('keydown', function (key) {
        // set game to be running
        if (running === false) {
            running = true;
            setTimeout(function () {
                window.requestAnimationFrame(update);
            }, 100);
            return;
        }
        if (key.keyCode == 37) {
            left.style.color = 'white';
            setTimeout(function () {
                window.requestAnimationFrame(update);
            }, 300);
            choice = 0;
        } else if (key.keyCode == 39) {
            right.style.color = 'white';
            setTimeout(function () {
                window.requestAnimationFrame(update);
            }, 300);
            choice = 1;
        } else {
            choice = -1;
        }
    });
    // restore original style
    document.addEventListener('keyup', function (key) {
        left.style.color = '#a6bd39';
        right.style.color = '#a6bd39';
    });
}

function startScreen() {
    drawBg();
    ctx.fillText('Press ← or → to Play.',
        canvas.width / 2,
        canvas.height / 2 - 50
    );
    wrapText(ctx, "Balance mental health, physical health, school, and money.", 
        canvas.width / 2 + 8, canvas.height / 2 + 25, 430, 30);
}

function endScreen(win) {
    drawBg();
    ctx.fillText('You survived ' + round + ' years.',
        canvas.width / 2,
        canvas.height / 2 + 15
    );
    over = true;
    console.log('over');
    // restart after 3 seconds
    setTimeout(function () {
        init();
    }, 3000);
    // restore original text
    document.getElementById('l').innerHTML = 'No';
    document.getElementById('r').innerHTML = 'Yes';
}

function update() {
    if (!over) {
        //end-game conditions
        if ((mind >= 100 || mind <= 0) || (body >= 100 || body <= 0) ||
            (work >= 100 || work <= 0) || (money >= 100 || money <= 0)) {
            endScreen(0);
            return;
        } else if (round == cards.length - 1) {
            // made right choices and survived all scenarios
            endScreen(1);
            return;
        } else if (!cards.length) {
            // used up all cards
            console.log('backup');
            cards = backupAarray.slice();
        }
        round++;
        // ramdomly select a card
        let i = Math.floor(Math.random() * cards.length);
        // draw card
        drawCard(i);
        cards.splice(i, 1);
        console.log(cards.length);
    }
}

function drawCard(i) {
    let currentCard = cards[i];
    drawBg();

    // display narrative
    ctx.font = '18px Menlo';
    wrapText(ctx, currentCard.narrative, canvas.width / 2 + 5, 135, 435, 30);
    ctx.drawImage(currentCard.img, canvas.width / 2 - 300 / 2, 250, 300, 300);

    // change left and right arrow text
    if (currentCard.l === undefined) {
        document.getElementById('l').innerHTML = 'No';
        document.getElementById('r').innerHTML = 'Yes';
    } else {
        document.getElementById('l').innerHTML = currentCard.l;
        document.getElementById('r').innerHTML = currentCard.r;
    }

    // adjust values according to choice
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

    // make sure the values stay within bounds
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

// update values in topBar
function drawBalance() {
    // top bar bg
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, 100);
    ctx.fillStyle = "#a6bd39";
    ctx.fill();
    // mind
    ctx.beginPath();
    ctx.rect(20, 20, 102.5, (100 - mind) * .55);
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
    ctx.fillText('Year ' + round, canvas.width / 2, 620);
}

window.onload = function () {
    init();
}