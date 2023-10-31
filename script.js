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
let spriteSheet;
let frames = [
	{ x: 0, y: 0 },
	{ x: 64, y: 0 },
	{ x: 128, y: 0 },
	{ x: 192, y: 0 },
	{ x: 0, y: 64 },
	{ x: 64, y: 64 },
	{ x: 128, y: 64 },
	{ x: 192, y: 64 },
];
let currentFrame = 0;
let animationDelay = 2;
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
	spriteSheet = loadImage("./sprites.png");
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
	image(
		spriteSheet,

		bird.x - bird.size / 2,
		bird.y - bird.size / 2,
		bird.size,
		bird.size,
		frames[currentFrame].x,
		frames[currentFrame].y,
		64,
		64
	);
	if (animationDelay == 0) {
		currentFrame++;
		if (currentFrame >= frames.length) {
			currentFrame = 0;
		}
		animationDelay = 2;
	} else {
		animationDelay--;
	}
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
