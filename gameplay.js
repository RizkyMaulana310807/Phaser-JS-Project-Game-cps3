class gamePlay extends Phaser.Scene {
    platforms;
    character;
    cursors;
    playerJumped = true;
    animPlaying = false;
    keys;

    constructor() {
        super('gameLayout');
    }

    preload() {
        this.load.image("layer0", 'src/images/layer0.png');
        this.load.image("layer1", 'src/images/platforms.png');
        this.load.image("platform", 'src/images/platforms.png');
        this.load.image("layer2", 'src/images/layer2.png');
        this.load.image("layer3", 'src/images/layer3.png');
        this.load.image("layer4", 'src/images/layer4.png');
        this.load.image("layer5", 'src/images/layer5.png');
        this.load.image("layer6", 'src/images/layer6.png');
        this.load.image("layer7", 'src/images/layer7.png');
        this.load.image("layer8", 'src/images/layer8.png');
        this.load.image("layer9", 'src/images/layer9.png');
        this.load.image("layer10", 'src/images/layer10.png');
        this.load.image("layer11", 'src/images/layer11.png');
        this.load.image("background", 'src/images/bg.png');
        this.load.spritesheet('character', 'src/Sprite(Character)/HeroKnight.png', {
            frameWidth: 100,
            frameHeight: 55
        });
    }

    create() {
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(300, 510, 'platform');
        this.layer11 = this.add.tileSprite(300, 135, 928, 793, 'layer11');
        this.layer10 = this.add.tileSprite(300, 135, 928, 793, 'layer10');
        this.layer09 = this.add.tileSprite(300, 135, 928, 793, 'layer9');
        this.layer08 = this.add.tileSprite(300, 135, 928, 793, 'layer8');
        this.layer07 = this.add.tileSprite(300, 135, 928, 793, 'layer7');
        this.layer06 = this.add.tileSprite(300, 135, 928, 793, 'layer6');
        this.layer05 = this.add.tileSprite(300, 135, 928, 793, 'layer5');
        this.layer04 = this.add.tileSprite(300, 135, 928, 793, 'layer4');
        this.layer03 = this.add.tileSprite(300, 135, 928, 793, 'layer3');
        this.layer02 = this.add.tileSprite(300, 135, 928, 793, 'layer2');
        this.layer01 = this.add.tileSprite(300, 500, 928, 68, 'layer1');
        this.layer00 = this.add.tileSprite(300, 135, 928, 793, 'layer0');

        this.character = this.physics.add.sprite(100, 390, 'character').setScale(3);
        this.character.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D,F,R,T,G,H,Y,J,U,I,K,L,O,P');

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('character', { start: 8, end: 13 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'attack1',
            frames: this.anims.generateFrameNumbers('character', { start: 18, end: 23 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'attack2',
            frames: this.anims.generateFrameNumbers('character', { start: 24, end: 34 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('character', { start: 38, end: 40 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'blocking',
            frames: this.anims.generateFrameNumbers('character', { start: 58, end: 60 }),
            frameRate: 10,
            repeat: 0
        });

        this.physics.add.collider(this.character, this.platforms);
        this.character.on('animationcomplete', this.onAnimationComplete, this);
    }

    onAnimationComplete(animation, frame) {
        if (animation.key === 'attack1' || animation.key === 'attack2') {
            this.animPlaying = false;
        }
        this.character.anims.play('idle', true);
    }

    update() {
        const { left, right, up, down, shift, space } = this.cursors;

        
        if (this.keys.F.isDown && !this.animPlaying) {
            this.character.anims.play('attack2', true);
            this.animPlaying = true;
            this.character.setVelocityX(0); 
            return;
        } else if(this.keys.R.isDown && !this.animPlaying){
            this.character.anims.play('attack1', true);
            this.animPlaying = true;
            this.character.setVelocityX(0);
            return;
        } else if (space.isDown && !this.animPlaying){
            this.character.setVelocityY(-160);
            this.character.anims.play('jump', true);
            this.animPlaying = true;
            return;
        }

        if (this.animPlaying) {
            this.character.setVelocityX(0);
            return;
        }

        if (this.keys.A.isDown) {
            this.character.setVelocityX(-60);
            this.layer00.tilePositionX -= 2;
            this.layer01.tilePositionX -= 2;
            this.layer02.tilePositionX -= 1;
            this.layer03.tilePositionX -= 1;
            this.layer04.tilePositionX -= 1;
            this.layer05.tilePositionX -= 0.5;
            this.layer06.tilePositionX -= 0.3;
            this.layer07.tilePositionX -= 0.2;
            this.layer08.tilePositionX -= 0.2;
            if (!this.animPlaying) {
                this.character.anims.play('run', true);
            }
            this.playerJumped = true;
        } else if (this.keys.D.isDown) {
            this.character.setVelocityX(160);
            this.layer00.tilePositionX += 6;
            this.layer01.tilePositionX += 6;
            this.layer02.tilePositionX += 5;
            this.layer03.tilePositionX += 5;
            this.layer04.tilePositionX += 5;
            this.layer05.tilePositionX += 4;
            this.layer06.tilePositionX += 3;
            this.layer07.tilePositionX += 3;
            this.layer08.tilePositionX += 2;
            // console.log(this.character.imagePositionY);
            if (!this.animPlaying) {
                this.character.anims.play('run', true);
            }
            this.playerJumped = true;
        } else if (this.keys.W.isDown && this.playerJumped) {
            this.character.setVelocityY(-160);
            if (!this.animPlaying) {
                this.character.anims.play('jump', true);
            }
            this.playerJumped = false;
        } else if (this.keys.S.isDown) {
            this.character.setVelocityY(600);
            this.playerJumped = true;
        }
        //  else if (shift.isDown) {
        //     this.character.setVelocityX(0);
        //     if (!this.animPlaying) {
        //         this.character.anims.play('blocking', true);
        //     }
        //     this.animPlaying = true;
        // } 
        else {
            this.character.setVelocityX(0);
            if (!this.animPlaying) {
                this.character.anims.play('idle', true);
            }
        }
    }
    
}

const config = {
    type: Phaser.AUTO,
    height: 532,
    width: 736,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    }, 
    scene: gamePlay
};
const game = new Phaser.Game(config);