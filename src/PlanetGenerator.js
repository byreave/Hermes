import Planet from './Planet.js';
import Moon from './Moon.js';
export default class PlanetGenerator {
	constructor(scene) {
		this.scene = scene;

		this.XSpan = 1600;
		this.XStep = 200;
		this.YSpan = 1300;
		this.YStart = 100;
		this.radiusMin = 50;
		this.radiusMax = 100;
		this.texturePack = [ 'planet1', 'planet2' ];
		this.moonTexturePack = [ 'moon' ];
		this.totalNumber = 0; //for naming
	}
	//with a moon
	GenerateOnePlanet(x, y, radius, texture, name) {
		var planet = new Planet(this.scene, x, y, radius, name, texture);
		return planet;
	}

	AutoGenerateAScreen() {
		for (var i = this.XStep; i < this.XSpan; i += this.XStep) {
			var x = i,
				y = this.YStart + Math.random(this.YSpan + 1);
			var radius = Math.floor(Math.random() * (this.radiusMax - this.radiusMin)) + this.radiusMin;
			var texture = this.texturePack[Math.floor(Math.random() * this.texturePack.length)];
			var newPlanet = this.GenerateOnePlanet(x, y, radius, texture, 'Planet' + this.totalNumber.toString());
			this.totalNumber++;
			this.scene.planets.push(newPlanet);
		}
	}

	//for playable
	GenerateAScreen(make) {
		if (make) {
			var temp = this.XSpan;
			this.XSpan *= 2;
			for (var i = temp; i < this.XSpan; i += this.XStep) {
				var x = i,
					y = this.YStart + Math.random(this.YSpan + 1);
				var radius = Math.floor(Math.random() * (this.radiusMax - this.radiusMin)) + this.radiusMin;
				var texture = this.texturePack[Math.floor(Math.random() * this.texturePack.length)];
				var newPlanet = this.GenerateOnePlanet(x, y, radius, texture, 'Planet' + this.totalNumber.toString());
				this.totalNumber++;
				this.scene.planets.push(newPlanet);
			}
		}
		return false;
	}
}
