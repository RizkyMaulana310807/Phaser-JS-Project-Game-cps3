window.onload = function(){
    var config = {
        height : 532,
        width : 736,
        backgroundColor : 0x000000,
        scene: [booting, menu]
    }
    var game = new Phaser.Game(config);
}