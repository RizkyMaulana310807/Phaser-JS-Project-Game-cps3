var positionPointer = '';
var outlinerBlinking;
function createClickableText(scene, x, y, text, font, fontS, color, onClick, blink) {
    var button = scene.add.text(x, y, text, { fontFamily: font, fontSize: fontS, color: color })
        .setInteractive()
        .on('pointerdown', onClick);

    button.setOrigin(0.5);

    if (blink) {
        function blinkText() {
            button.alpha = (button.alpha === 1) ? 0 : 1;
        }
        setInterval(blinkText, 500);
    }

    return button;
}


function createBlinkingText(scene, x, y, text, fontSize, fontFam, color, blinkInterval) {
    var textObject = scene.add.text(x, y, text, { fontFamily: fontFam, fontSize: fontSize, color: color });
    textObject.setOrigin(0.5);

    function blinkText() {
        textObject.alpha = (textObject.alpha === 1) ? 0 : 1;
    }

    setInterval(blinkText, blinkInterval);

    return textObject;
}
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
function rectangle(x, y, width, height, color, origin, interactive, blink) {
    var rect = this.add.rectangle(x, y, width, height, color);
    rect.setOrigin(origin.x, origin.y);
    if (interactive) {
        rect.setInteractive();
        rect.on('pointerdown', function () {
            console.log('rectangle clicked');
        });
    }
    if (blink) {
        function blinkRectangle() {
            rect.alpha = (rect.alpha === 1) ? 0 : 1;
        }
        setInterval(blinkRectangle, 500);
    }
    return rect;
}

class menu extends Phaser.Scene{
    constructor(){
        super("menuLayout");
    }

    create(){
        this.scene.start('gameLayout')
        
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
        // createAnimatedText(self, 736 / 2, -50, 'Anime Fight!!', 'pixemon trial', 50, 'blue', 1500, 500, 1000, 20, 1100, 900);
        // createAnimatedText(self, 736 / 2, -50, 'Anime Fight!!', 'pixemon trial', 50, '#ff0000', 1500, 500, 1000, 20, 1050, 900);
        createAnimatedText(self, 736 / 2, -50, 'Ready Player One!!', 'pixemon trial', 48, '#ffffff', 1500, 500, 1000, 20, 1000);
        
        // var playText = createBlinkingText(this, 732 / 2, 300, 'Press Space', 20, 'Bahnschrift', 'white', 800)
        var outlineBtn = this.add.image(732 / 2, 300, 'outline_space_button').setAlpha(100);
        var spaceBtn = this.add.image(732 / 2, 300, 'space_button').setAlpha(0);
        var jalankan = false;

        this.startText = this.add.text(732 / 2, 300 - 30, 'Start', { font: '16px Super Pixel', fill: '#ffffff' }).setOrigin(0.5).setAlpha(0).setInteractive().setDepth(10);
        this.creditText = this.add.text(732 / 2, 300, 'Credit', { font: '16px Super Pixel', fill: '#ffffff' }).setOrigin(0.5).setAlpha(0).setInteractive().setDepth(10);
        this.settingText = this.add.text(732 / 2, 300 + 30, 'Setting', { font: '16px Super Pixel', fill: '#ffffff' }).setOrigin(0.5).setAlpha(0).setInteractive().setDepth(10);

        this.kotak = this.add.graphics();
        this.kotak.fillStyle(0xffffff, 0.5);
        this.creditHover = this.kotak.fillRect(732 / 2 - 50, 300 - 10, 100, 25).setDepth(9).setAlpha(0);
        this.settingHover = this.kotak.fillRect(732 / 2 - 50, 300 - 10 + 30, 100, 25).setDepth(9).setAlpha(0);
        this.startHover = this.kotak.fillRect(732 / 2 - 50, 300 - 10 - 30, 100, 25).setDepth(9).setAlpha(0);

    
        
        
        // var creditText = createClickableText(this, 90, 506, 'Credit', 'bruce forever', 32, 'white', function(){
        //     console.log('Credit di tekan');
        // })
        outlinerBlinking = setInterval(() => {
            (outlineBtn.alpha === 1) ? outlineBtn.setAlpha(0) : outlineBtn.setAlpha(1);
        }, 250);
        
        // var camera1 = this.cameras.add(0, 0, 736, 532);
        // camera1.setOrigin(0.5);
        // camera1.setZoom(2);
        
        //stroke 
        // graphics.lineStyle(2, 0xffffff, 0.5);
    // graphics.strokeRect(100, 100, 200, 100);; 
    
        
        const keyboard = this.input.keyboard;
    
        keyboard.on('keydown-SPACE', function(){
            
            
            // console.log('SPACE di tekan');
            clearInterval(outlinerBlinking);
            outlineBtn.setAlpha(0);
            spaceBtn.setAlpha(1);
            let i = 0;
            let setBlink = setInterval(() => {
                (spaceBtn.alpha === 1) ? spaceBtn.setAlpha(0) : spaceBtn.setAlpha(1);
                if(i == 8){
                    clearInterval(setBlink);
                    spaceBtn.destroy();
                    outlineBtn.destroy();
                } else{
                    i++;
                }
            }, 125);
            
            // setTimeout(() => {
                // self.scene.start("gameLayout");
                this.jalankan = true
            // }, 1000);
            // if(jalankan){
                console.log('start')
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
                    console.log('end')
            // } 
            
        });
        
        this.startText.on('pointerover', () => {
            this.startHover.setAlpha(1)
        })
        this.startText.on('pointerout', () => {
            this.startHover.setAlpha(0)
        })
       
        this.tweens.add({
            targets: this.layer00,
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
        this.tweens.add({
            targets: this.layer02,
            y: 135,
            duration: 2500,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: this.layer03,
            y: 135,
            duration: 2500,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: this.layer04,
            y: 135,
            duration: 2000,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: this.layer05,
            y: 135,
            duration: 2000,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: this.layer06,
            y: 135,
            duration: 2000,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: this.layer07,
            y: 135,
            duration: 2000,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: this.layer08,
            y: 135,
            duration: 2000,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: this.layer09,
            y: 135,
            duration: 2000,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: this.layer10,
            y: 135,
            duration: 2000,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: this.layer11,
            y: 135,
            duration: 2000,
            ease: 'Power2'
        });
    }
    update(){
        
            this.layer00.tilePositionX += 6;
            this.layer01.tilePositionX += 6;
            this.layer02.tilePositionX += 5;
            this.layer03.tilePositionX += 5;
            this.layer04.tilePositionX += 5;
            this.layer05.tilePositionX += 4;
            this.layer06.tilePositionX += 3;
            this.layer07.tilePositionX += 3;
            this.layer08.tilePositionX += 2;
        
    }
}


// const menuConfig = {
//     type: Phaser.AUTO,
//     height: 532,
//     width: 736,
//     scene: menu
// };
// const menu_config = new Phaser.Game(menuConfig);