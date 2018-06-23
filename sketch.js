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
	canvas = createCanvas(1000, 600);
	myMap = mappa.tileMap(options);
	myMap.overlay(canvas);

	countriesAge = loadTable('./age_of_marriage.csv', 'csv', 'header');
	countriesCoor = loadJSON('countries.json');

	myMap.onChange(drawCountries);

	// fill(202, 10, 10, 100);
}

function draw() {}

function drawCountries() {
	clear();
	// console.log(countriesCoor);
	countriesAge.rows.forEach(co => {
		for (let c in countriesCoor) {
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
					let size = co.arr[1];
					size = map(size, 18, 32, 5, 30) + myMap.zoom();
					let col = map(co.arr[1], 13, 35, 80, 255);
					stroke(255, 70);
					fill(col, 0, 0, 150);
					// let age = round(co.arr[1] * 100) / 100;
					let age = round(co.arr[1]);
					if (age > 15) {
						ellipse(pos.x, pos.y, size, size);
						fill(255);
						textSize(8);
						text(age, pos.x - 5, pos.y + 5);
					}
				}
			}
		}
	});
	noLoop();
}
