import Phaser from "phaser";

import Hero from "../entities/Hero";

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
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "hero-running",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("hero-run-sheet", {
        start: 0,
        end: 5,
      }),
      repeat: -1,
    });

    this.hero = new Hero(this, 200, 150);
  }

  update() {}
}

export default Game;

//this.image.load('my-image', 'images/my-image.png').
