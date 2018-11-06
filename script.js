// load cards
const p0 = new Image();
p0.src = 'img/card0.png';
const p1 = new Image();
p1.src = 'img/card1.jpg';
// Card(str, Image, array, array)
function Card(narrative, img, cNo, cYes) {
    this.narrative = narrative;
    this.img = img;
    this.n = cNo;
    this.y = cYes;
}
// initialize all cards and put in an array
const c0 = new Card("lorem ipsum", p0, [10, 20, 10,20], [-10, -20, -10, -20]);
const c1 = new Card("hi", p1, [30, 40, 50, 60], [-30, -40, -50, -60]);
let cards = [];
for (i=0; i<1; i++) {
    cards.push("c"+i);
}
let cardsBackup = cards.slice(0);

// game
var Setting = {
    initialize: function() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 450;
        this.canvas.height = 650;
        // img
        this.topBar = document.getElementById('topBar');
        // variables
        this.mind = 40;
        this.body = 40;
        this.work = 40;
        this.money = 40;
        this.year = 1;
        // show the startScreen
        Game.startScreen();
        // listen for keypress
        Game.listen();
    },
    listen: function () {
        document.addEventListener('keydown', function (key) {
            // Handle the 'Press any key to begin' function and start the game.
            if (Game.running === false) {
                Game.running = true;
                window.requestAnimationFrame(Game.loop);
            }
            if (key.keyCode == 39) this.choice = 0;
            if (key.keyCode == 37) this.choice = 1;
        });
    },
    startScreen: function() {
        Game.draw();
        // Change the canvas font size and color
        this.ctx.font = '20px Courier';
        this.ctx.fillStyle = "white";
        this.ctx.fillText('Press Any Key to Begin',
            this.canvas.width / 2 - 130,
            this.canvas.height / 2 + 15
        );
    },
    endScreen: function() {},
    draw: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // bg fill
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#13130e";
        this.ctx.fill();
        // bot bar
        this.ctx.beginPath();
        this.ctx.rect(0, this.canvas.height - 75, this.canvas.width, 75);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        // mind
        this.ctx.beginPath();
        this.ctx.rect(0, 100 - this.mind, 112.5, this.mind);
        this.ctx.fillStyle = "#a6bd39";
        this.ctx.fill();
        // body
        this.ctx.beginPath();
        this.ctx.rect(112.5, 100 - this.body, 112.5, this.body);
        this.ctx.fillStyle = "#a6bd39";
        this.ctx.fill();
        // work
        this.ctx.beginPath();
        this.ctx.rect(112.5 * 2, 100 - this.work, 112.5, this.work);
        this.ctx.fillStyle = "#a6bd39";
        this.ctx.fill();
        // money
        this.ctx.beginPath();
        this.ctx.rect(450 - 112.5, 100 - this.money, 112.5, this.money);
        this.ctx.fillStyle = "#a6bd39";
        this.ctx.fill();
        // img
        this.ctx.drawImage(this.topBar, 0, 0, 450, 100);
    }
};

var Game = Object.assign({}, Setting);
Game.initialize();