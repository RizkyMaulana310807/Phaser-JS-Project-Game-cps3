const config = {
    type: Phaser.AUTO,
    height: 532,
    width: 736,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [booting , menu, gamePlay]
};

const game = new Phaser.Game(config);