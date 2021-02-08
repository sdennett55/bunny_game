import FirstScene from './scenes/FirstScene.js';
import GameOverScene from './scenes/GameOverScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  scene: [FirstScene, GameOverScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 100
      },
      debug: false,
    }
  }
})