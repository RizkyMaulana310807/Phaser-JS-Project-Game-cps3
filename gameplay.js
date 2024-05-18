class gamePlay extends Phaser.Scene{
    platforms;
    character;
    cursors;
    constructor(){
        super('gameLayout');
    }
    preload(){
        this.load.image("background", 'src/images/bg.png');
        this.load.spritesheet('character', 'src/images/player.png', {
            frameWidth: 38, 
            frameHeight: 41
        });
        this.load.image('platform', 'src/images/platform.png');
    }
    create(){
        this.background = this.add.tileSprite(0, 0, config.width * 2, config.height * 2, 'background');
        this.background.setOrigin(0, 0);
        this.background.setScale(0.5)

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(35, 400, 'platform').setOrigin(0, 0).setScale(0.5).refreshBody();

        this.character = this.physics.add.sprite(100, 100, 'character').setScale(2)
        this.character.setBounce(0.2);
        this.character.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.character, this.platforms);

        this.anims.create({
            key: 'left', 
            frames: this.anims.generateFrameNumbers('character', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
    }

    update(){
        const {left, right, up, down} = this.cursors;
        if(left.isDown){
            this.character.setVelocityX(-160);
            this.character.anims.play('left', true);
        }else if(right.isDown){
            this.character.setVelocityX(160);
        }else if(up.isDown){
            this.character.setVelocityY(-160);
        }else if(down.isDown){
            this.character.setVelocityY(600);
        }else {
            this.character.setVelocityX(0);
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