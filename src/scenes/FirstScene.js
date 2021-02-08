export default class FirstScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init() {
    this.score = 0;
  }

  score = 0;

  scoreText;

  player;

  cursors;

  carrots;

  snakes;

  preload() {
    this.load.image('rabbit', '../../assets/rabbit.png');
    this.load.image('sky', '../../assets/sky.png');
    this.load.image('ground', '../../assets/ground.png');
    this.load.image('carrot', '../../assets/carrot.png');
    this.load.image('snake', '../../assets/snake.png');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    const ground = this.physics.add.staticImage(0, 536, 'ground').setScale(10, 1).setOrigin(0, 0);
    ground.body.updateFromGameObject()
    this.player = this.physics.add.sprite(this.scale.width / 2, this.scale.height - 105, 'rabbit').setScale(.2).setOrigin(.5);

    this.physics.add.collider(this.player, ground);

    this.cursors = this.input.keyboard.addKeys(
      {
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
      });

    this.carrots = this.physics.add.group({
      key: 'carrot',
      repeat: 11,
    });

    this.carrots.children.iterate(carrot => {
      carrot.x = Phaser.Math.FloatBetween(0, 550);
      carrot.y = Phaser.Math.FloatBetween(-100, -1000);
    });

    this.physics.add.overlap(this.player, this.carrots, this.eatCarrot, null, this);

    this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {
      fontSize: 48,
      color: '#e86a17',
      fontStyle: 'bold',
    });

    this.snakes = this.physics.add.group({
      key: 'snake',
      repeat: 3,
    });

    this.snakes.children.iterate(snake => {
      snake.setScale(.2);
      snake.x = Phaser.Math.FloatBetween(0, 550);
      snake.y = Phaser.Math.FloatBetween(-100, -1000);
    });

    this.physics.add.overlap(this.player, this.snakes, this.getDead, null, this);
  }

  update() {
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown && !this.player.body.touching.down) {
      this.player.setVelocityY(150);
    }
    
    if (this.cursors.left.isDown && this.player.x > 35) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown && this.player.x < (this.scale.width - 35)) {
      this.player.setVelocityX(300);
    } else {
      this.player.setVelocityX(0);
    }

    this.carrots.children.iterate(child => {
      if (child.y > this.scale.width) {
        child.y = Phaser.Math.FloatBetween(-100, -1000);
        child.setVelocityY(0);
      }
      if (child.active === false) {
        child.enableBody(true, Phaser.Math.FloatBetween(0, 550), Phaser.Math.FloatBetween(-100, -1000), true, true);
        child.setVelocityY(0);
      }
    })

    this.snakes.children.iterate(child => {
      if (child.y > this.scale.width) {
        child.y = Phaser.Math.FloatBetween(-100, -1000);
        child.body.setVelocityY(this.score * 7);
      }
      if (child.active === false) {
        child.enableBody(true, Phaser.Math.FloatBetween(0, 550), Phaser.Math.FloatBetween(-100, -1000), true, true);
        child.setVelocityY(0);
      }
    })
  }

  eatCarrot(player, carrots) {
    carrots.disableBody(true, true);
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  getDead(player, snake) {
    this.scene.start('game-over', { score: this.score });
  }
};