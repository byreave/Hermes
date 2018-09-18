import Player from './Player.js';
import * as dat from 'dat.gui';
import Back from './Back.js';
import LevelManager from './LevelManager.js';
import { deflateSync } from 'zlib';

export default class SceneA extends Phaser.Scene {
	constructor() {
		super();
		this.level = 0;
	}

	preload() {
		this.load.image('sky', 'assets/sky.png');
		//this.load.image('ground', 'assets/platform.png');
		this.load.image('star', 'assets/star.png');
		this.load.image('bomb', 'assets/bomb.png');
		// debugger
		this.load.image('back', 'assets/space.png');
		//this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

		// Resources for planets and moon
		this.load.image('planet1', 'assets/Planet1_static.png');
		this.load.image('planet2', 'assets/Planet2_static.png');

		this.load.image('moon', 'assets/Moon 1.png');

		//Json files for levels
		this.load.json('StartLevel', 'Levels/StartLevel.json');
		this.load.json('level1', 'Levels/level1.json');
		this.load.json('level2', 'Levels/level2.json');

		// Read sprites from the atlas
		// this.load.atlas('gems', '_LocalAssets/gems.png', '_LocalAssets/gems.json');
		this.load.atlas('character', 'assets/Hermes_animated.png', 'assets/Hermes_animated.json');
	}

	create() {
		// Create animation resources here
		this.anims.create({
			key: 'hermes',
			frames: this.anims.generateFrameNames('character', {
				prefix: 'Hermes_',
				end: 7,
				zeroPad: 4
			}),
			repeat: -1
		});
		//BG
		this.background = new Back(this, 960, 0.5, 540);
		//Player
		this.player = new Player(this, 0, 200);
		//Camera time to move to other screen(second)
		this.camTime = 3;
		this.oldCamScrollX = 0;
		this.oldCamScrollY = 0;

		//Level Manager
		this.levelManager = new LevelManager(this);
		//generating level
		this.levelManager.createALevelAt(new Phaser.Math.Vector2(960, 540), 'level2');
		console.log(this.levelManager);
		var gui = new dat.GUI();

		var f1 = gui.addFolder('Test');
		f1.add(this.player.sprite.body.velocity, 'x').listen();
		f1.add(this.player.sprite.body.velocity, 'y').listen();
		f1.add(this.player.sprite, 'x').listen();
		f1.add(this.player.sprite, 'y').listen();
		f1.add(this.player, 'isCCW').listen();
		f1.add(this.player, 'fuel').listen();
		f1.open();
	}
	update(timestep, delta) {
		this.player.update(delta);
		this.levelManager.currentLevel.update(delta);
		if (this.levelManager.moveTo != null) {
			var destination = 0;
			var speed = 0;
			switch (this.levelManager.moveTo) {
				case 'up':
					destination = this.oldCamScrollY - this.levelManager.levelHeight;
					speed = this.levelManager.levelHeight / this.camTime;
					if (this.cameras.main.scrollY > destination) {
						this.cameras.main.scrollY = this.cameras.main.scrollY - speed * delta / 1000;
					} else {
						this.levelManager.moveTo = null;
						this.oldCamScrollY = destination;
					}
					break;
				case 'down':
					destination = this.oldCamScrollY + this.levelManager.levelHeight;
					speed = this.levelManager.levelHeight / this.camTime;
					if (this.cameras.main.scrollY < destination) this.cameras.main.scrollY += speed * delta / 1000;
					else {
						this.levelManager.moveTo = null;
						this.oldCamScrollY = destination;
					}
					break;
				case 'left':
					destination = this.oldCamScrollX - this.levelManager.levelWidth;
					speed = this.levelManager.levelWidth / this.camTime;
					if (this.cameras.main.scrollX > destination) this.cameras.main.scrollX -= speed * delta / 1000;
					else {
						this.levelManager.moveTo = null;
						this.oldCamScrollX = destination;
					}
					break;
				case 'right':
					destination = this.oldCamScrollX + this.levelManager.levelWidth;
					speed = this.levelManager.levelWidth / this.camTime;
					if (this.cameras.main.scrollX < destination) this.cameras.main.scrollX += speed * delta / 1000;
					else {
						this.levelManager.moveTo = null;
						this.oldCamScrollX = destination;
					}
					break;
			}
			this.background.image.x = this.cameras.main.scrollX + 960;
			this.background.image.y = this.cameras.main.scrollY + 540;
		}
	}
}
