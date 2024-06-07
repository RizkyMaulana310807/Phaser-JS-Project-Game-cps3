var player = {
    hp: 100, // hit points
    mp: 50,  // mana points
    defense: 10, // pertahanan
    attack: 20, // serangan
    poisonResistance: 11 // kekebalan terhadap racun
};
var wizard = {
    hp: 100,
    mp: 50,
    defense: 15,
    attack: 300,
    poisonResistance: 15
}



var audioPlayer = true;
var rect;
class booting extends Phaser.Scene{
    constructor(){
        super('bootGame');
    }
    preload(){
        console.log("star load")
        this.load.image('ichika', 'src/images/ichika.jpeg');
        this.load.image("background", 'src/images/bg.png');
        this.load.image('platform', 'src/images/platform.png');
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
        this.load.spritesheet('character', 'src/images/HeroKnight.png', {
            frameWidth: 100,
            frameHeight: 55
        });

        this.load.spritesheet('deadEye', 'src/images/creature/deadeye/Attack3.png', {
            frameWidth: 150,
            frameHeight: 32
        });
        this.load.spritesheet('wizardIdle', 'src/images/wizard/Idle.png', {
            frameWidth: 57,
            frameHeight: 84
        });
        this.load.spritesheet('wizardAttack1', 'src/images/wizard/Attack1.png', {
            frameWidth: 231,
            frameHeight: 136
        })
        this.load.image('space_button', 'src/images/icon_ui/keyboard_space.png');
        this.load.image('outline_space_button', 'src/images/icon_ui/keyboard_space_outline.png');
        this.load.audio('SwingSFX', ['src/sound/swing.ogg', 'src/sound.swing.mp3']);
        console.log("end load")
    };
    create(){
        this.scene.start('menuLayout')

        const keyCodes = this.input.keyboard;
        var self = this;

        // this.ichika = this.add.image(0, 0, 735, 516, 'space_button');
        // this.ichika.setOrigin(0.5)
        // this.ichika.setDepth(8);
        
        this.greeting = this.add.text(736 / 2, 532 / 2 - 150, "Welcome to the arena", { fontFamily: 'Modern Warfare', fontSize: 32, color: '#00ff22' });
        this.greeting.setAlpha(0);
        this.greeting.setOrigin(0.5);
        this.greeting.setDepth(10);
        
        this.confirmation = this.add.text(736 / 2, 532 / 2 - 50, "Dengarkan Audio?", { fontFamily: 'Modern Warfare', fontSize: 12, color: '#00ff22'});
        this.confirmation.setOrigin(0.5);
        this.confirmation.setAlpha(0);
        this.confirmation.setDepth(10)

        this.confirm = this.add.text(736 / 2, 532 / 2, "Y / N", { fontFamily: 'Modern Warfare', fontSize: 12, color: '#00ff22'});
        this.confirm.setOrigin(0.5);
        this.confirm.setAlpha(0);
        this.confirm.setDepth(10)
        
        this.graphics = this.add.graphics();
        this.rect = this.graphics.fillStyle(0xffffff, 0.5);
        this.rect.setAlpha(0)
        // 736 / 2 - 18, 532 / 2 - 7, 15, 15
        this.graphics.fillRect(736 / 2 + 4, 532 / 2 - 7, 15, 15);
        // this.rect.setOrigin(0.5);
        this.rect.setDepth(9)
        
        this.orig = 'R'
        keyCodes.on('keydown-LEFT', () => {
            if(this.orig == 'R'){
                console.log(this.orig)
                this.tweens.add({
                    targets: this.rect,
                    x: - 22,
                    duration: 250,
                    ease: 'ease'
                });
                this.orig = 'L'

            }else{
                console.log('Eror');
            }
        });
        keyCodes.on('keydown-RIGHT', () => {
            if(this.orig == 'L'){
                console.log(this.orig)
                this.tweens.add({
                    targets: this.rect,
                    x: + 0,
                    duration: 250,
                    ease: 'ease'
                });
                this.orig = 'R'
            }else{
                console.log('Eror');
            }
        });
        keyCodes.on('keydown-ENTER', () => {
            switch(this.orig){
                case 'R':
                    console.log(this.orig, "Sound disabled");
                    audioPlayer = false;
                    this.scene.start('menuLayout');
                    
                    break
                case 'L':
                    console.log(this.orig, "Sound enabled");
                    audioPlayer = true;
                    this.scene.start('menuLayout');

                    break;
                default:
                    console.log(this.orig, "Default")
                    audioPlayer = true
                    break
            }       
            
        })


        this.tweens.add({
            targets: this.rect,
            alpha: 0.5,
            duration: 4000,
            delay: 1500,
            ease: 'easeIn'
        })
        this.tweens.add({
            targets: this.greeting,
            alpha: 1,
            duration: 2000,
            ease: 'ease'
        });
        this.tweens.add({
            targets: this.confirmation,
            alpha: 1,
            delay: 500,
            duration: 3000,
            ease: 'ease'
        });
        this.tweens.add({
            targets: this.confirm,
            alpha: 1,
            delay: 1000,
            duration: 4000,
            ease: 'ease'
        });
    

    };
    update(){

    }
    
}

// const loadConfig = {
//     type: Phaser.AUTO,
//     height: 532,
//     width: 736, 
//     scene: booting
// };
// const load_config = new Phaser.Game(loadConfig);