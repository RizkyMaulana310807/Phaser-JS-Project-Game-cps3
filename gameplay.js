class gamePlay extends Phaser.Scene{
    platforms;
    character;
    cursors;
    playerJumped = true;
    constructor(){
        super('gameLayout');
    }
    preload(){

        //load untuk paralax
        this.load.image("layer0", 'src/images/layer0.png');
        this.load.image("layer1", 'src/images/layer1.png');
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

        


        //end paralax load
        this.load.image("background", 'src/images/bg.png');
        this.load.spritesheet('character', 'src/Sprite(Character)/HeroKnight.png', {
            frameWidth: 100, 
            frameHeight: 55
        });
        this.load.image('platform', 'src/images/platform.png');
    }
    create(){
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
        // this.layer01 = this.add.tileSprite(300, 135, 928, 793, 'layer1');
        // this.layer01 = this.add.tileSprite(300, 135, 928, 793, 'layer1');
        this.layer01 = this.physics.add.staticGroup();
        this.layer01.create(300, 135, 'layer1');


        this.layer00 = this.add.tileSprite(300, 135, 928, 793, 'layer0');
        
        this.character = this.physics.add.sprite(100, 100, 'character').setScale(4)
        // this.character.body.setGravity(1000);
        // this.character.setBounce(0.2);
        this.character.setCollideWorldBounds(true);
        this.physics.add.collider(this.layer01 ,this.character);

        

        
        // this.background = this.add.tileSprite(0, 0, config.width * 2, config.height * 2, 'background');
        // this.background.setOrigin(0, 0);
        // this.background.setScale(0.5)
        
        // this.platforms = this.physics.add.staticGroup();
        // this.platforms.create(35, 400, 'platform').setOrigin(0, 0).setScale(0.5).refreshBody();
        
        // this.character.setBounce(0.2);

        this.cursors = this.input.keyboard.createCursorKeys();


        this.anims.create({
            key: 'run', 
            frames: this.anims.generateFrameNumbers('character', {start: 8, end: 13}),
            frameRate: 7,
            repeat: 0
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('character', {start: 0, end: 7}),
            frameRate : 7,
            repeat: -1         
        })
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('character', {start: 24, end: 34}),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('character', {start: 38, end: 40}),
            frameRate: 3,
            repeat: 0
        })
        // this.playerJumped = true
    }

    update(){
        const {left, right, up, down, shift} = this.cursors;
        if(left.isDown){
            this.character.setVelocityX(-60);
            this.layer00.tilePositionX -= 2
            this.layer01.tilePositionX -= 2
            this.layer02.tilePositionX -= 1
            this.layer03.tilePositionX -= 1
            this.layer04.tilePositionX -= 1
            this.layer05.tilePositionX -= 0.5
            this.layer06.tilePositionX -= 0.3
            this.layer07.tilePositionX -= 0.2
            this.layer08.tilePositionX -= 0.2
            this.playerJumped = true;

        }else if(right.isDown){
            this.character.setVelocityX(160);
            this.character.anims.play('run', true);            
            this.layer00.tilePositionX += 6
            this.layer01.tilePositionX += 6
            this.layer02.tilePositionX += 5
            this.layer03.tilePositionX += 5
            this.layer04.tilePositionX += 5
            this.layer05.tilePositionX += 4
            this.layer06.tilePositionX += 3
            this.layer07.tilePositionX += 3
            this.layer08.tilePositionX += 2
            this.playerJumped = true;

        }else if(up.isDown && this.playerJumped){
            this.character.setVelocityY(-160);
            this.character.anims.play('jump', true);
            this.playerJumped = false;
        }else if(down.isDown){
            this.character.setVelocityY(600);
            this.playerJumped = true;

        }else if(shift.isDown){ 
            this.character.anims.play('attack', true);
            // console.log('Shift clicked');
        }else {
            this.character.setVelocityX(0);
            this.character.anims.play('idle', true);
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