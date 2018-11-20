import { Scene } from 'phaser';
export default class SceneB extends Phaser.Scene {
    constructor() {
        super();
        Phaser.Scene.call(this, { key: 'end' });
    }

    init(data) {
        this._score = data.Score;
    }

    preload() {
        this.load.image('EndScreen', 'assets/endscreen.png');
        this.load.bitmapFont('d_p', 'assets/font.png', 'assets/font.fnt');
    }



    create() {
        // console.log(this._score);
        this.add.image(960, 540, 'EndScreen');
        this.add.bitmapText(750, 200, 'd_p', "Score: " + this._score, 50, 1);
        this.add.bitmapText(1500, 950, 'd_p', "Press Start", 25, 1);
        // console.log(this.input.keyboard.createCursorKeys());
        this.input.once('pointerdown', function (event) {
            // console.log(event);
            // if(event.key)
            // this.scene.pause('end');
            // this.start = this.scene.get('game');
            // this.start.scene.restart();
            //this.scene.start('game');
            location.reload();
        }, this);
    }

    update(timestep, delta) {
    }
}