const pipeWidth = 50;
const pipeGap = 100;
let score = 0;
let bird = {
	x: 100,
	y: 200,
	speed: 0,
	size: 50,
};
let img;
let pipes = [
	{
		x: 600,
		y: 200,
	},
	{
		x: 900,
		y: 200,
	},
];

function preload() {
	img = loadImage("./bird.png");
}

function setup() {
	createCanvas(600, 400);
}

function draw() {
	background(100, 100, 100);
	applyPhysics();
	drawBird();
	for (let i = 0; i < pipes.length; i++) {
		movePipes(pipes[i]);
		drawPipes(pipes[i]);
		if (pipes[i].x < bird.x + 2 && pipes[i].x > bird.x - 2) {
			checkCollision(pipes[i]);
		}
	}
	textSize(24);
	text("Score: " + score, width - 100, 24);
}

function drawBird() {
	// circle(bird.x, bird.y, 50);
	image(img, bird.x - bird.size / 2, bird.y - bird.size / 2, bird.size, bird.size);
}

function applyPhysics() {
	bird.speed = bird.speed + 0.3;
	bird.y = bird.y + bird.speed;
	if (bird.y > height) {
		bird.y = height;
	}
}

function mouseClicked() {
	bird.speed = -4;
}

function drawPipes(pipe) {
	circle(pipe.x, pipe.y, 5);
	rect(pipe.x, 0, pipeWidth, pipe.y - pipeGap / 2);
	rect(pipe.x, pipe.y + pipeGap / 2, pipeWidth, height - pipe.y + pipeGap / 2);
}

function movePipes(pipe) {
	pipe.x -= 3;
	if (pipe.x < -pipeWidth) {
		pipe.x = 600;
		pipe.y = random(20 + pipeGap / 2, height - 20 - pipeGap / 2);
	}
}

function checkCollision(pipe) {
	let safeRange = (pipeGap - bird.size) / 2;
	if (bird.y < pipe.y + safeRange && bird.y > pipe.y - safeRange) {
		score++;
		console.log(score);
	} else {
		// noLoop();
	}
}
