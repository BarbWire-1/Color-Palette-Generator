/*
 * Copyright BarbWire-1 aka Barbara Kälin, 2023
 * MIT License
 */
//JS only used to update backgrounds, color-codes and align slider- and input-values
// Calculating of the colors happens in css

// HELPER
const rgb2Hex = (rgb) => {
	const [r, g, b] = rgb.match(/\d+/g).map(Number);
	const hex =
		"#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0").toUpperCase();
	return hex;
};

const $ = (el) => document.getElementById(el);

// get the slider-elements
const hsl = {
	baseHue: $("baseHue"),
	saturation: $("saturation"),
	lightness: $("lightness"),
	rotation: $("rotation")
};

const updateColors = () => {
	const setColor = (prop, value) =>
		document.documentElement.style.setProperty(prop, value);

	// change the values of the css-variables to input-values
	setColor("--base-hue", hsl.baseHue.value);
	setColor("--saturation", hsl.saturation.value + "%");
	setColor("--lightness", hsl.lightness.value + "%");
	setColor("--rotation", hsl.rotation.value);

	// get the computed color on update (in rgb)
	// to write color-codes into the blocks
	const colorBlocks = document.querySelectorAll(".base-color");
	colorBlocks.forEach((block) => {
		const computedStyle = window.getComputedStyle(block);
		const computedColor = computedStyle.getPropertyValue("background-color");
		// color-codes in rgb and hex
		block.innerHTML = `${computedColor} <br> ${rgb2Hex(computedColor)}`;
	});
};

// Add event listeners To read and align value-changes
// This is a bit ugly. search for nicer solution to align values
for (const prop in hsl) {
	const slider = $(prop);
	const numericInput = $(`${prop}Value`);

	slider.addEventListener("input", () => {
		if (numericInput.value !== slider.value) {
			numericInput.value = slider.value;
			updateColors();
		}
	});

	numericInput.addEventListener("input", () => {
		if (slider.value !== numericInput.value) {
			slider.value = numericInput.value;
			updateColors();
		}
	});
}

// Initial color update
updateColors();

