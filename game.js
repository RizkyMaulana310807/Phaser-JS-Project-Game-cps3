window.onload = function(){
    var config = {
        height : 532,
        width : 736,
        backgroundColor : 0x000000,
        scene: [booting, menu, gamePlay],
        pixelArt: true,
        pyhsics: {
            default: 'arcade',
            arcade:{
                debug: false
            }
        }
    }

    var game = new Phaser.Game(config);
    var self = this
    self.scene.start("menuLayout");

}