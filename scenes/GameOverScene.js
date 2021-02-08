export default class GameOverScene extends Phaser.Scene {
  init(data) {
    this.score = data.score;
  }

  constructor(score) {
    super('game-over');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    

    this.add.text(width * .5, height * .5 - 50, `Game Over`, {
      fontSize: 48,
      fontStyle: 'bold',
    }).setOrigin(.5).setAlign('center');

    this.add.text(width * .5, height * .5, `Final Score: ${this.score}`, {
      fontSize: 24,
    }).setOrigin(.5).setAlign('center');

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('game');
    })
  }
}