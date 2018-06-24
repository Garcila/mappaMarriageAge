let myMap;
let canvas;
let countriesAge;
let countriesCoor;
let dataMap = [];

const mappa = new Mappa('Leaflet');

const options = {
	lat: 0,
	lng: 0,
	zoom: 2.4,
	style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
};

async function preload() {
	countriesAge = await loadTable('./age_of_marriage.csv', 'csv', 'header');
	countriesCoor = await loadJSON('countries.json');
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	myMap = mappa.tileMap(options);
	myMap.overlay(canvas);

	countriesAge.rows.forEach(co => {
		for (let c in countriesCoor) {
			if (countriesCoor[c][2] === co.arr[0]) {
				let latitude = countriesCoor[c][0];
				let longitude = countriesCoor[c][1];
				let age = co.arr[1];
				let name = co.arr[0];
				dataMap.push({ latitude, longitude, age });
			}
		}
	});

	myMap.onChange(drawCountries);
}

function drawCountries() {
	clear();
	dataMap.forEach(dataPoint => {
		if (
			myMap.map
				.getBounds()
				.contains({ lat: dataPoint.latitude, lng: dataPoint.longitude })
		) {
			// Transform lat/lng to pixel position
			const pos = myMap.latLngToPixel(
				dataPoint.latitude,
				dataPoint.longitude
			);
			let size = dataPoint.age;
			size = map(size, 18, 32, 5, 30) + myMap.zoom();

			// map the age to color range
			let col = map(dataPoint.age, 13, 35, 80, 255);
			stroke(255, 70);
			fill(col, 0, 0, 150);

			// if age is greater than 15 display circle and text on map
			let age = round(dataPoint.age);
			if (age > 15) {
				ellipse(pos.x, pos.y, size, size);
				fill(255);
				textSize(8);
				text(age, pos.x - 5, pos.y + 5);
			}
		}
	});
	noLoop();
}
