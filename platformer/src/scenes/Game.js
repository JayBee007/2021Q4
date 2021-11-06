import Phaser from "phaser";

import Hero from "../entities/Hero";

import heroRunning from "../assets/img/hero/run.png";
import heroPivot from "../assets/img/hero/pivot.png";
import heroIdle from "../assets/img/hero/idle.png";
import heroJumping from "../assets/img/hero/jump.png";
import heroSpinJumping from "../assets/img/hero/spinjump.png";
import heroFalling from "../assets/img/hero/fall.png";
import heroBonk from "../assets/img/hero/bonk.png";

import world1Sheet from "../assets/img/tileset/world-1.png";
import levelOne from "../assets/tilemaps/level-1.json";
import clouds from "../assets/img/tileset/clouds.png";
class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.setBaseURL("http://localhost:8000/");

    this.load.tilemapTiledJSON("level-1", levelOne);

    this.load.spritesheet("world-1-sheet", world1Sheet, {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 2,
    });
    this.load.image("clouds-sheet", clouds);

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

    this.load.spritesheet("hero-die-sheet", heroBonk, {
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

    this.anims.create({
      key: "hero-dead",
      frames: this.anims.generateFrameNumbers("hero-die-sheet"),
    });

    this.addMap();

    this.addHero();

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    // const platform = this.add.rectangle(220, 240, 260, 10, 0xb79ced);
    // this.physics.add.existing(platform, true);
    // this.physics.add.collider(this.hero, platform);
  }

  addHero() {
    this.hero = new Hero(this, this.spawnPos.x, this.spawnPos.y);

    this.cameras.main.startFollow(this.hero);

    this.children.moveTo(
      this.hero,
      this.children.getIndex(this.map.getLayer("Foreground").tilemapLayer)
    );
    const groundCollider = this.physics.add.collider(
      this.hero,
      this.map.getLayer("Ground").tilemapLayer
    );
    const spikesCollider = this.physics.add.overlap(
      this.hero,
      this.spikeGroup,
      () => {
        this.hero.kill();
      }
    );

    this.hero.on("died", () => {
      groundCollider.destroy();
      spikesCollider.destroy();
      this.hero.body.setCollideWorldBounds(false);
      this.cameras.main.stopFollow();
    });
  }
  addMap() {
    this.map = this.make.tilemap({ key: "level-1" });
    const groundTiles = this.map.addTilesetImage("world-1", "world-1-sheet");

    const backgroundTiles = this.map.addTilesetImage("clouds", "clouds-sheet");

    const backgroundLayer = this.map.createLayer("Background", backgroundTiles);
    backgroundLayer.setScrollFactor(0.6);

    const groundLayer = this.map.createLayer("Ground", groundTiles);
    groundLayer.setCollision([1, 2, 4], true);

    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    this.physics.world.setBoundsCollision(true, true, false, true);

    this.spikeGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    this.map.getObjectLayer("Objects").objects.forEach((object) => {
      if (object.name === "Start") {
        this.spawnPos = { x: object.x, y: object.y };
      }

      if (object.gid === 7) {
        const spike = this.spikeGroup.create(
          object.x,
          object.y,
          "world-1-sheet",
          object.gid - 1
        );
        spike.setOrigin(0, 1);
        spike.setSize(object.width - 10, object.height - 10);
        spike.setOffset(5, 10);
      }
    });

    this.map.createLayer("Foreground", groundTiles);
  }

  update(time, delta) {
    const cameraBottom = this.cameras.main.getWorldPoint(
      0,
      this.cameras.main.height
    ).y;

    if (this.hero.isDead() && this.hero.getBounds().top > cameraBottom + 100) {
      this.hero.destroy();
      this.addHero();
    }
  }
}

export default Game;

//this.image.load('my-image', 'images/my-image.png').
