setTimeout(() => {
	document.getElementById("animatedText").classList.add("moved-up");
}, 2000);

const canvas = document.getElementById("c");
if (!canvas) {
	console.error("Canvas element with ID 'c' not found.");
}
const ctx = canvas.getContext("2d");
let dots = [];
let mouse = { x: -1000, y: 0, moved: false };
let mouseInside = true;
let gravityFade = 1;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Dot {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.radius = 2;
		this.originalX = x;
		this.originalY = y;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
		ctx.fill();
	}
}

function init() {
	dots = [];
	let spacing = 50;
	for (let x = -50; x < canvas.width + 50; x += spacing) {
		for (let y = -50; y < canvas.height + 50; y += spacing) {
			dots.push(new Dot(x, y));
		}
	}
}

let gridOffsetX = 0;
let gridOffsetY = 0;
let minDistance = 20;
let dotsOpacity = 0;
let dotsVisible = false;

function fadeInDots() {
	const fadeInterval = setInterval(() => {
		dotsOpacity += 0.05;
		if (dotsOpacity >= 1) {
			dotsOpacity = 1;
			clearInterval(fadeInterval);
		}
	}, 50);
}

function initDotsWithDelay() {
	dotsVisible = true;
	init();
	fadeInDots();
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (dotsVisible) {
		let spacing = 50;
		gridOffsetX -= 0.15;
		gridOffsetY -= 0.1;

		if (gridOffsetX <= -spacing) {
			gridOffsetX = 0;
		}
		if (gridOffsetY <= -spacing) {
			gridOffsetY = 0;
		}

		if (mouseInside) {
			gravityFade += (1 - gravityFade) * 0.05;
		} else {
			gravityFade += (0 - gravityFade) * 0.05;
		}

		dots.forEach((dot) => {
			dot.x = dot.originalX - gridOffsetX;
			dot.y = dot.originalY - gridOffsetY;

			let dx = dot.x - mouse.x;
			let dy = dot.y - mouse.y;
			let distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < minDistance) distance = minDistance;
			let force = Math.max(0, (400 - distance) / 400) * gravityFade;
			let directionX = (dx / distance) * force * 15;
			let directionY = (dy / distance) * force * 15;

			dot.x += directionX;
			dot.y += directionY;

			if (mouseInside) {
				dot.radius += (2 + force * 3 - dot.radius) * 0.05;
			} else {
				dot.radius += (2 - dot.radius) * 0.05;
			}

			ctx.fillStyle = `rgba(255, 255, 255, ${
				dotsOpacity * (0.6 + force * 0.4)
			})`;
			dot.draw();
		});
	}

	requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	mouse.moved = true;
	mouseInside = true;
});

canvas.addEventListener("mouseenter", () => {
	mouseInside = true;
	gravityFade += (1 - gravityFade) * 0.05;
});

canvas.addEventListener("mouseleave", () => {
	mouseInside = false;
	gravityFade = 1;
});

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});

let currentIndex = -1;
let lastIndex = -1;

function showPreview(title, description, link, index) {
	if (index === currentIndex) return;

	const preview = document.getElementById("preview");
	const previewTitle = document.getElementById("preview-title");
	const previewDescription = document.getElementById("preview-description");
	const previewLink = document.getElementById("preview-link");
	if (previewLink) previewLink.href = link;

	lastIndex = currentIndex;
	currentIndex = index;

	const direction = lastIndex < currentIndex ? "up" : "down";

	previewDescription.classList.remove(
		`slide-up-in`,
		`slide-up-out`,
		`slide-down-in`,
		`slide-down-out`
	);
	previewTitle.classList.remove(
		`slide-up-in`,
		`slide-up-out`,
		`slide-down-in`,
		`slide-down-out`
	);

	if (lastIndex !== -1) {
		previewDescription.classList.add(`slide-${direction}-out`);
		previewTitle.classList.add(`slide-${direction}-out`);
	}

	setTimeout(() => {
		previewTitle.textContent = title;
		previewDescription.textContent = description;

		preview.classList.remove("hidden");

		previewDescription.classList.remove(`slide-${direction}-out`);
		previewTitle.classList.remove(`slide-${direction}-out`);
		previewDescription.classList.add(`slide-${direction}-in`);
		previewTitle.classList.add(`slide-${direction}-in`);
	}, 100);
}

initDotsWithDelay();
animate();

let leftButtonHasBeenHovered = false;
