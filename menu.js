class menu extends Phaser.Scene{
    constructor(){
        super("menuLayout");
    }
    
    create(){
        this.background = this.add.tileSprite(0, 0, 736, 532, "background");
        this.background.setOrigin(0, 0);
    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT))) {
            // Handle left arrow key press
            console.log("Left arrow pressed");
            this.background.x -= 5;
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT))) {
            // Handle right arrow key press
            console.log("Right arrow pressed");
            this.background.x += 5;
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP))) {
            // Handle up arrow key press
            console.log("Up arrow pressed");
            this.background.y -= 5;
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN))) {
            // Handle down arrow key press
            console.log("Down arrow pressed");
            this.background.y += 5;
        }
    }
}