import Phaser from "phaser";

import Hero from "../entities/Hero";

import heroRunning from "../assets/img/hero/run.png";
import heroPivot from "../assets/img/hero/pivot.png";
import heroIdle from "../assets/img/hero/idle.png";
import heroJumping from "../assets/img/hero/jump.png";
import heroSpinJumping from "../assets/img/hero/spinjump.png";
import heroFalling from "../assets/img/hero/fall.png";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.setBaseURL("http://localhost:8000/");

    this.load.spritesheet("hero-idle-sheet", heroIdle, {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-run-sheet", heroRunning, {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-pivot-sheet", heroPivot, {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-jump-sheet", heroJumping, {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-flip-sheet", heroSpinJumping, {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-fall-sheet", heroFalling, {
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
    this.anims.create({
      key: "hero-idle",
      frames: this.anims.generateFrameNumbers("hero-idle-sheet"),
    });

    this.anims.create({
      key: "hero-pivoting",
      frames: this.anims.generateFrameNumbers("hero-pivot-sheet"),
    });

    this.anims.create({
      key: "hero-jumping",
      frames: this.anims.generateFrameNumbers("hero-jump-sheet"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-flipping",
      frames: this.anims.generateFrameNumbers("hero-flip-sheet"),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "hero-falling",
      frames: this.anims.generateFrameNumbers("hero-fall-sheet"),
      frameRate: 10,
      repeat: -1,
    });

    this.hero = new Hero(this, 200, 150);

    const platform = this.add.rectangle(220, 240, 260, 10, 0xb79ced);
    this.physics.add.existing(platform, true);
    this.physics.add.collider(this.hero, platform);
  }

  update() {}
}

export default Game;

//this.image.load('my-image', 'images/my-image.png').
