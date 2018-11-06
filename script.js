// load img
const topBar = new Image();
topBar.src = 'img/top.png';
const c1 = new Image();
c1.src = 'img/card0.png';
const c2 = new Image();
c2.src = 'img/card1.jpg';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 450;
canvas.height = 650;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // bg fill
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#13130e";
    ctx.fill();

    // values fill
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, 100);
    ctx.fillStyle = "#a6bd39";
    ctx.fill();

    // bars and img
    ctx.drawImage(topBar, 0, 0, 450, 100);
    ctx.drawImage(c1, 100, 200);
}

window.onload = draw;