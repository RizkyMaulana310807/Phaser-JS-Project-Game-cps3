class booting extends Phaser.Scene{
    constructor(){
        super('bootGame');
    }
    preload(){
        this.load.image("background", 'src/images/background.jpeg');
    }
    create(){
        this.add.text(20, 20, "Loading game ...");
        setTimeout(() => {
            this.scene.start("menuLayout");
        }, 2000);
    }
}