var positionPointer = '';
var outlinerBlinking;


function createAnimatedText(scene, x, y, text, fontFamily, fontSize, color, bounceDuration, bounceDelay, colorChangeDuration, moveXAmount, moveDuration) {
    var newText = scene.add.text(x, y, text, { fontFamily: fontFamily, fontSize: fontSize, color: color });
    newText.setOrigin(0.5, 0.5);

    scene.tweens.add({
        targets: newText,
        y: y + 200,
        duration: bounceDuration,
        ease: 'Bounce.easeOut',
        delay: bounceDelay,
        onComplete: function () {

            scene.tweens.add({
                targets: newText,
                duration: colorChangeDuration,
                color: { from: '#ffffff', to: '#ff0000' },
                yoyo: true,
                repeat: -1
            });

            scene.tweens.add({
                targets: newText,
                x: '+=' + moveXAmount,
                duration: moveDuration,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
        },
        onCompleteScope: scene
    });

    return newText;
}

class menu extends Phaser.Scene{
    constructor(){
        super("menuLayout");
    }

    create(){
        this.scene.stop('bootGame');
        this.bgm = this.sound.add('bgm');
        this.clickFx = this.sound.add('clickFx');

        
        if(audioPlayer){
            var musicConfig = {
                mute: false,
                volume: 0.5,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            };
            
            this.bgm.play(musicConfig);
        } else{
            console.log("Something else ...")
        }
        
        var self = this;
        this.layer11 = this.add.tileSprite(300, 45, 928, 793, 'layer11');
        this.layer10 = this.add.tileSprite(300, 45, 928, 793, 'layer10');
        this.layer09 = this.add.tileSprite(300, 45, 928, 793, 'layer9');
        this.layer08 = this.add.tileSprite(300, 70, 928, 793, 'layer8');
        this.layer07 = this.add.tileSprite(300, 70, 928, 793, 'layer7');
        this.layer06 = this.add.tileSprite(300, 70, 928, 793, 'layer6');
        this.layer05 = this.add.tileSprite(300, 400, 928, 793, 'layer5');
        this.layer04 = this.add.tileSprite(300, 400, 928, 793, 'layer4');
        this.layer03 = this.add.tileSprite(300, 400, 928, 793, 'layer3');
        this.layer02 = this.add.tileSprite(300, 400, 928, 793, 'layer2');
        this.layer01 = this.add.tileSprite(300, 600, 928, 68, 'layer1');
        this.layer00 = this.add.tileSprite(300, 200, 928, 793, 'layer0');
        createAnimatedText(self, 736 / 2, -50, 'Ready Player One!!', 'pixemon trial', 48, '#ffffff', 1500, 500, 1000, 20, 1000);
        
  

        this.startText = this.add.text(732 / 2, 300 - 30, 'Start', { font: '16px Super Pixel', fill: '#ffffff' }).setOrigin(0.5).setAlpha(0).setInteractive().setDepth(10);
        // this.creditText = this.add.text(732 / 2, 300, 'Credit', { font: '16px Super Pixel', fill: '#ffffff' }).setOrigin(0.5).setAlpha(0).setInteractive().setDepth(10);
        // this.settingText = this.add.text(732 / 2, 300 + 30, 'Setting', { font: '16px Super Pixel', fill: '#ffffff' }).setOrigin(0.5).setAlpha(0).setInteractive().setDepth(10);

        // this.kotak1 = this.add.graphics();
        // this.kotak1.fillStyle(0xffffff, 0.5);
        // this.creditHover = this.kotak1.fillRect(732 / 2 - 50, 300 - 10, 100, 25).setDepth(9).setAlpha(0);
        // this.kotak2 = this.add.graphics();
        // this.kotak2.fillStyle(0xffffff, 0.5);
        // this.settingHover = this.kotak2.fillRect(732 / 2 - 50, 300 - 10 + 30, 100, 25).setDepth(9).setAlpha(0);
        this.kotak3 = this.add.graphics();
        this.kotak3.fillStyle(0xffffff, 0.5);
        this.startHover = this.kotak3.fillRect(732 / 2 - 50, 300 - 10 - 30, 100, 25).setDepth(9).setAlpha(0);
        const keyboard = this.input.keyboard;
    
        
                    self.tweens.add({
                        targets: self.startText,
                        alpha: 1,
                        ease: 'ease',
                        delay: 1000,
                        duration: 1000
                    })
                    self.tweens.add({
                        targets: self.creditText,
                        alpha: 1,
                        ease: 'ease',
                        delay: 1000,
                        duration: 1000
                    })
                    self.tweens.add({
                        targets: self.settingText,
                        alpha: 1,
                        ease: 'ease',
                        delay: 1000,
                        duration: 1000
                    })
    
        this.startText.on('pointerover', () => {
            this.startHover.setAlpha(1)
        })
        this.startText.on('pointerout', () => {
            this.startHover.setAlpha(0)
        })
        this.startText.on('pointerdown', () => {
            this.clickFx.play()
            this.scene.start('gameLayout')
        })

        // this.settingText.on('pointerover', () => {
        //     this.settingHover.setAlpha(1)
        // })
        // this.settingText.on('pointerout', () => {
        //     this.settingHover.setAlpha(0)
        // })
        // this.settingText.on('pointerdown', () => {
        //     this.clickFx.play()
        //     // this.scene.start('gameLayout')
        // })

        // this.creditText.on('pointerover', () => {
        //     this.creditHover.setAlpha(1)
        // })
        // this.creditText.on('pointerout', () => {
        //     this.creditHover.setAlpha(0)
        // })
        // this.creditText.on('pointerdown', () => {
        //     this.clickFx.play()
        //     // this.scene.start('gameLayout')
        // })
       
        this.tweens.add({
            targets: [this.layer00, this.layer02, this.layer03, this.layer04, this.layer05, this,this.layer06, this.layer07, this.layer08, this.layer09, this,this.layer10, this,this.layer11],
            y: 135,
            duration: 1500,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: this.layer01,
            y: 500,
            duration: 1500,
            ease: 'Power2'
        });
        
    }
    update(){
    }
}


// const menuConfig = {
//     type: Phaser.AUTO,
//     height: 532,
//     width: 736,
//     scene: menu
// };
// const menu_config = new Phaser.Game(menuConfig);

