export default class StartGameScene extends Phaser.Scene {
  init(data) {
  }

  constructor() {
    super('start-game');
  }

  preload() {
    this.load.image('snake', 'assets/snake.png');
    this.load.image('carrot', 'assets/carrot.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('elmer-fudd', 'assets/elmer-fudd.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    this.add.image(0, 533, 'snake').setScale(.2).setOrigin(0);

    this.add.image(543, 0, 'snake').setScale(.2).setOrigin(0);

    this.add.image(522, 530, 'carrot').setOrigin(0);

    this.add.image(0, 0, 'carrot').setOrigin(0);

    this.add.text(width * .5, height * .5 - 50, `Bunny Game`, {
      fontSize: 48,
      fontStyle: 'bold',
      color: '#e86a17',
    }).setOrigin(.5).setAlign('center');

    this.add.text(width * .5, height * .5, `Press spacebar to start`, {
      fontSize: 24,
      color: '#e86a17',
    }).setOrigin(.5).setAlign('center');

    this.add.text(width * .5, height - 120, `Controls: \n Up: W, Down: S, Left: A, Right: D`, {
      fontSize: 24,
      color: '#e86a17',
      align: 'center',
    }).setOrigin(.5).setAlign('center');


    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('game');
    })
  }
}