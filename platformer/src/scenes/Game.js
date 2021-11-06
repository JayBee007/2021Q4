import Phaser from "phaser";

import heroRun from "../assets/img/hero/run.png";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.setBaseURL("http://localhost:8000/");
    this.load.spritesheet("hero-run-sheet", heroRun, {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create() {
    this.anims.create({
      key: "hero-running",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("hero-run-sheet", {
        start: 0,
        end: 5,
      }),
      repeat: -1,
    });

    this.player = this.physics.add.sprite(200, 150, "hero-run-sheet");
    this.player.anims.play("hero-running");
    this.player.body.setCollideWorldBounds(true);
    this.player.body.setSize(12, 40);
    this.player.body.setOffset(12, 23);
  }

  update() {}
}

export default Game;

//this.image.load('my-image', 'images/my-image.png').
