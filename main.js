import StartGameScene from './scenes/StartGameScene.js';
import FirstScene from './scenes/FirstScene.js';
import GameOverScene from './scenes/GameOverScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  scene: [StartGameScene, FirstScene, GameOverScene],
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