let myMap;
let canvas;
let countriesAge;
let countriesCoor;

const mappa = new Mappa('Leaflet');

const options = {
	lat: 0,
	lng: 0,
	zoom: 2.4,
	style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
};

function setup() {
	canvas = createCanvas(1500, 800);
	myMap = mappa.tileMap(options);
	myMap.overlay(canvas);

	countriesAge = loadTable('./age_of_marriage.csv', 'csv', 'header');
	countriesCoor = loadJSON('countries.json');

	myMap.onChange(drawPoint);
	myMap.onChange(drawCountries);

	fill(202, 10, 10, 100);
}

function draw() {}

function drawCountries() {
	clear();
	// console.log(countriesCoor);
	countriesAge.rows.forEach(co => {
		for (let c in countriesCoor) {
			// console.log(co.arr[0]);
			// console.log(countriesCoor[c][2]);
			if (countriesCoor[c][2] === co.arr[0]) {
				let latitude = countriesCoor[c][0];
				let longitude = countriesCoor[c][1];
				let r = co.arr[1];
				if (
					myMap.map
						.getBounds()
						.contains({ lat: latitude, lng: longitude })
				) {
					// Transform lat/lng to pixel position
					const pos = myMap.latLngToPixel(latitude, longitude);
					// Get the size of the meteorite and map it. 60000000 is the mass of the largest
					// meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
					let size = co.arr[1];
					size = map(size, 18, 32, 1, 25) + myMap.zoom();
					let col = map(co.arr[1], 10, 40, 80, 255);
					fill(col, 0, 0, 190);
					// let age = round(co.arr[1] * 100) / 100;
					let age = round(co.arr[1]);
					if (age > 15) {
						ellipse(pos.x, pos.y, size, size);
						fill(255);
						textSize(8);
						text(age, pos.x - 5, pos.y + 5);
					}

					// ellipse(pos.x, pos.y, r, r);
				}
			}
		}
	});
	noLoop();
}

function drawPoint() {
	clear();

	// const nigeria = myMap.latLngToPixel(11.396396, 5.076543);
	// noStroke();
	// ellipse(nigeria.x, nigeria.y, 20, 20);

	const nigeria = myMap.latLngToPixel(33.93911, 67.709953);
	noStroke();
	ellipse(nigeria.x, nigeria.y, 20, 20);
}
