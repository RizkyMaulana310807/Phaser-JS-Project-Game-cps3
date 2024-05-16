class gamePlay extends Phaser.Scene{
    constructor(){
        super('gameLayout');
    }
    create(){
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);
        this.character = this.add.image(100, 100, 'character');
        this.character.setScale(0.2)
    }
}