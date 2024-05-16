
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


function createBlinkingText(scene, x, y, text, fontSize, color, blinkInterval) {
    var textObject = scene.add.text(x, y, text, { fontFamily: 'Arial', fontSize: fontSize, color: color });
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
class menu extends Phaser.Scene{
    constructor(){
        super("menuLayout");
    }

    rectangle(x, y, width, height, color, origin, interactive, blink) {
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

    create(){
        var self = this;
        createAnimatedText(self, 736 / 2, -50, 'Gamerz!', 'pixemon trial', 50, 'blue', 1500, 500, 1000, 20, 1100, 900);
        createAnimatedText(self, 736 / 2, -50, 'Gamerz!', 'pixemon trial', 50, '#ff0000', 1500, 500, 1000, 20, 1050, 900);
        createAnimatedText(self, 736 / 2, -50, 'Gamerz!', 'pixemon trial', 48, '#ffffff', 1500, 500, 1000, 20, 1000);
        

        var outlineRectPlay = this.rectangle(736 / 2, 300, 185, 55, 0x000000, {x: 0.5, y: 0.5}, false);
        var rectPlay = this.rectangle(736 / 2, 300, 180, 50, 0xff0000, {x: 0.5, y: 0.5}, true);
        rectPlay.on('pointerover', function(){
            console.log('button hovered');
            outlineRectPlay.fillColor = '0xffff00'
        })
        rectPlay.on('pointerout', function(){
            console.log('button out');
            outlineRectPlay.fillColor = '0x000000'
        })
        var buttonPlay = createClickableText(this, 736 / 2, 300, 'Play','modern warfare', 48, '#ffffff', function () {
            console.log('Button clicked!');
            setTimeout(function(){
            self.scene.start("gameLayout");

            }, 2000);
        });
        buttonPlay.on('pointerover', function(){
            console.log('text hovered');
            outlineRectPlay.fillColor = '0xffff00'
        })
        buttonPlay.on('pointerout', function(){
            console.log('text out');
            outlineRectPlay.fillColor = '0x000000'

        })
        // this.rectangle(90, 506.5, 180, 50, 0xff0000, {x: 0.5, y: 0.5}, true);
        var credit = this.add.rectangle(90, 506.5, 185, 50, 0xff0000);
        var creditText = createClickableText(this, 90, 506, 'Credit', 'bruce forever', 32, 'white', function(){
            console.log('Credit di tekan');
        })
        credit.setInteractive();
        credit.on('pointerover', function(){
            console.log('pointer hovered');
            credit.fillColor = '0xffff00'; 
            creditText.tint = '0xff0000'
        })
        credit.on('pointerout', function(){
            console.log('pointer out');
            credit.fillColor = '0xff0000';
            creditText.tint = '0xffffff';
        })
        creditText.on('pointerover', function(){
            console.log('text hovered');
            credit.fillColor = '0xffff00'; 
            creditText.tint = '0xff0000'
        })
        creditText.on('pointerout', function (){
            console.log('text out');
            credit.fillColor = '0xff0000';
            creditText.tint = '0xffffff';
        })
        
        
        
    }
    update(){
        var positionPointer = '';

        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT))) {
            console.log("Left arrow pressed");
        } else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT))){
            console.log('Right arrow pressed');
        } else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN))){
            console.log('Down arrow pressed');
            switch(positionPointer){
                case '':
                    positionPointer = 'Play Button';
                    break;
                case 'Play Button':
                    positionPointer = 'Credit Button';
                    break;
                case 'Credit Button':
                    positionPointer = 'Play Button';
                    break;
                default:
                    positionPointer = '';
                    break;
            }
        } else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP))){
            console.log('Up arrow pressed');
            switch(positionPointer){
                case '':
                    positionPointer = 'Play Button';
                    break;
                case 'Play Button':
                    positionPointer = 'Credit Button';
                    break;
                case 'Credit Button':
                    positionPointer = 'Play Button';
                    break;
                default:
                    positionPointer = '';
                    break;
            }
        }
    }
}
