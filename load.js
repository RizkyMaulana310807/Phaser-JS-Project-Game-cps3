class booting extends Phaser.Scene{
    constructor(){
        super('bootGame');
    }
    preload(){
        this.load.image("background", 'src/images/bg.png');
        this.load.image('character', 'src/images/character.png');
        this.load.image('platform', 'src/images/platform.png');
    }
    create(){
        var self = this;
        // this.add.text(20, 20, "Loading game ...", { fontFamily: 'Cascadia', fontSize: 11, color: '#ffffff' });
        // setTimeout(() => {
        // this.add.text(20, 40, "Load asset ...", { fontFamily: 'Cascadia', fontSize: 11, color: '#ffffff' });
        // }, 1000);
        // setTimeout(() => {
            self.scene.start("menuLayout");
        // }, 2000);
    }
}