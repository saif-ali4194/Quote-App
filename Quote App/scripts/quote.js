const Sound = {
	transition: new Audio("data/s1.mp3"),
	play: function (audio) {
		audio.currentTime = 0;
		audio.play();
	},
};

document.getElementById("btn-next").addEventListener("click", () => {
	fadeOutQuote();
	// Fade in the next quote after a delay of 1s
	setTimeout(fadeInQuote, 1000);
});

document.getElementById("btn-download").addEventListener("click", () => {
	const element = document.body;
	// use html2canvas to the screenshot of the element
	html2canvas(element).then(function (canvas) {
		// convert the canvas to data URL
		const dataURL = canvas.toDataURL("image/png");
		const img = document.createElement("img");
		img.src = dataURL;

		// Append the image to the body
		document.body.appendChild(img);

		// create a link to download image and click it
		const link = document.createElement("a");
		link.href = dataURL;
		link.download = "screenshot.png";
		link.click();

		// remove the image
		img.remove();
	});
});

// funtions
function fadeOutQuote() {
	document.getElementById("quote-container").style.opacity = 0;
	Sound.play(Sound.transition);
}

function fadeInQuote() {
	fetch("https://api.quotable.io/random")
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("quote-content").textContent = data.content;
			document.getElementById("author").textContent = data.author;
			document.getElementById("quote-container").style.opacity = 1;
			Sound.play(Sound.transition);
		});
}

function update() {
	window.requestAnimationFrame(update);
	const hue = parseFloat(
		getComputedStyle(document.documentElement).getPropertyValue("--hue")
	);
	const deg = parseFloat(
		getComputedStyle(document.documentElement).getPropertyValue("--deg")
	);

	document.documentElement.style.setProperty(
		"--hue",
		hue + Math.random() * 10 * 0.1
	);
	document.documentElement.style.setProperty("--deg", deg + 0.1 + "deg");
}

update();
