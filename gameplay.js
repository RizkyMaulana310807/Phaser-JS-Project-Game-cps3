class gamePlay extends Phaser.Scene {
    platforms;
    character;
    cursors;
    playerJumped = true;
    animPlaying = false;
    keys;
    playerIsTouchedDown = false;

    
    constructor() {
        super('gameLayout');
        }
        createHpBar(monster) {
            let bar = this.add.graphics();
            bar.fillStyle(0x000000, 1);
            bar.fillRect(monster.x - 20, monster.y - 70, 40, 8);
            bar.fillStyle(0xff0000, 1);
            bar.fillRect(monster.x - 20, monster.y - 70, 40 * (monster.hp / 100), 8);
            // bar.destroy();
            // monster.hpBar = bar;
        }
        
        

    create() {
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(300, 525, 'platform');
        this.layer11 = this.add.tileSprite(300, 135, 928, 793, 'layer11');
        this.layer10 = this.add.tileSprite(300, 135, 928, 793, 'layer10');
        this.layer09 = this.add.tileSprite(300, 135, 928, 793, 'layer9');
        this.layer08 = this.add.tileSprite(300, 135, 928, 793, 'layer8');
        this.layer07 = this.add.tileSprite(300, 135, 928, 793, 'layer7');
        this.layer06 = this.add.tileSprite(300, 135, 928, 793, 'layer6');
        this.layer05 = this.add.tileSprite(300, 135, 928, 793, 'layer5');
        this.layer04 = this.add.tileSprite(300, 135, 928, 793, 'layer4');
        this.layer03 = this.add.tileSprite(300, 135, 928, 793, 'layer3');
        this.layer02 = this.add.tileSprite(300, 135, 928, 793, 'layer2');
        this.layer01 = this.add.tileSprite(300, 500, 928, 68,  'layer1');
        this.layer00 = this.add.tileSprite(300, 135, 928, 793, 'layer0');

        this.character = this.physics.add.sprite(100, 380, 'character').setScale(3);
        this.character.setCollideWorldBounds(true);
        this.deadEye = this.physics.add.sprite(600, 100, 'deadEye').setScale(3);
        // this.deadEye.setGravity(-300)
        this.deadEye.flipX = true;
        this.deadEye.setCollideWorldBounds(true);
        this.wizard = this.physics.add.sprite(600, 200, 'wizardIdle').setScale(1.5);
        this.wizard.flipX = true;
        this.wizard.setCollideWorldBounds(true);

        this.character.body.setSize(21, 40);
        this.character.body.setOffset((this.character.width - 21) / 2, (this.character.height - 40) / 2 + 5)
        
        this.character.setDepth(10);
        this.wizard.setDepth(9);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D,F,R,T,G,H,Y,J,U,I,K,L,O,P');

        
        //player anims
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('character', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7 ] }),
            frameRate: 10,
            repeat: -1
        }); 
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('character', {start: 8, end: 17}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'backward',
            frames: this.anims.generateFrameNumbers('character', {start: 17, end: 8}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'attack1',
            frames: this.anims.generateFrameNumbers('character', {start: 18, end: 23}),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'attack2',
            frames: this.anims.generateFrameNumbers('character', {start: 24, end: 29 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'attack3',
            frames: this.anims.generateFrameNumbers('character', {start: 30, end: 37}),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('character', {start: 38, end: 40}),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('character', {start: 41, end: 44}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('character', {start: 45, end: 47}),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('character', {start: 48, end: 57}),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'block_idle',
            frames: this.anims.generateFrameNumbers('character', {start: 58, end: 65}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'blocking',
            frames: this.anims.generateFrameNumbers('character', {start: 67, end: 70}),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key:  'rolling',
            frames: this.anims.generateFrameNumbers('character', {start: 71, end: 79}),
            frameRate: 10,
            repeat: -1
        });

        //wizard anims
        this.anims.create({
            key: 'wizIdle',
            frames: this.anims.generateFrameNumbers('wizardIdle', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'wizAttack1',
            frames: this.anims.generateFrameNumbers('wizardAttack1', {start: 0, end: 7}),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'deadAttack',
            frames: this.anims.generateFrameNumbers('deadEye', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.wizard.anims.play('wizIdle', true)
        this.deadEye.anims.play('deadAttack', true)
        
        this.physics.add.collider(this.character, this.platforms, this.touchedDown);
        this.physics.add.collider(this.wizard, this.platforms);
        this.physics.add.collider(this.wizard, this.character, playerCollisionEnemy);
    
        function playerCollisionEnemy(){
            // console.log('collide');
        }
        
        this.music = this.sound.add('SwingSFX');
        this.character.on('animationcomplete', this.onAnimationComplete, this);
        setInterval(() => {
        this.deadEye.setVelocityY(-225)
            
        }, 1000);
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(2, 0xff0000); // Garis warna merah

    // Fungsi untuk menggambar kotak di sekitar area collision
    const drawCollisionBox = () => {
        this.graphics.clear(); // Bersihkan grafik sebelumnya
        this.graphics.strokeRect(
            this.character.body.x,
            this.character.body.y,
            this.character.body.width,
            this.character.body.height
        );
    };

    // Panggil fungsi pertama kali untuk menggambar kotak
    drawCollisionBox();

    // Panggil fungsi setiap frame untuk menggambar ulang kotak
    this.events.on('update', drawCollisionBox);

        // setInterval(() => {
        // this.createHpBar(this.character);
        // }, 2000);
        
    }
    touchedDown(){
        // console.log('down')
        this.playerIsTouchedDown = true;
    }
    onAnimationComplete(animation, frame) {
        if (animation.key === 'attack1' || animation.key === 'attack2' || animation.key === 'attack3' || animation.key === 'block_idle') {
            this.animPlaying = false;
        }
        this.character.anims.play('idle', true);
    }
    update() {
        const { left, right, up, down, shift, space } = this.cursors;
        const hitPlatform = this.character.body.touching.down;
        
        if (this.animPlaying) {
            this.character.setVelocityX(0);
            return;
        }
        if (this.keys.A.isDown) {
            this.character.setVelocityX(-60);
            this.layer00.tilePositionX -= 2;
            this.layer01.tilePositionX -= 2;
            this.layer02.tilePositionX -= 1;
            this.layer03.tilePositionX -= 1;
            this.layer04.tilePositionX -= 1;
            this.layer05.tilePositionX -= 0.5;
            this.layer06.tilePositionX -= 0.3;
            this.layer07.tilePositionX -= 0.2;
            this.layer08.tilePositionX -= 0.2;
            if (!this.animPlaying) {
                this.character.anims.play('backward', true);
            }
            this.playerJumped = true;
        } else if (this.keys.D.isDown) {
            // console.log('pressed d')
            this.character.setVelocityX(160);
            this.layer00.tilePositionX += 6;
            this.layer01.tilePositionX += 6;
            this.layer02.tilePositionX += 5;
            this.layer03.tilePositionX += 5;
            this.layer04.tilePositionX += 5;
            this.layer05.tilePositionX += 4;
            this.layer06.tilePositionX += 3;
            this.layer07.tilePositionX += 3;
            this.layer08.tilePositionX += 2;
            if (!this.animPlaying) {
                this.character.anims.play('run', true);
            }
            this.playerJumped = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W))) {
            this.character.setVelocityY(-160); 
            // if (!this.animPlaying) {
                this.character.anims.play('jump', true);
            // }
            this.playerJumped = false;
        } else if (this.keys.S.isDown) {
            this.character.setVelocityY(600);
            this.playerJumped = true;
        }else if (shift.isDown) {
            this.character.setVelocityX(0);
                this.character.anims.play('blocking', true);
        } else if (this.keys.F.isDown && !this.animPlaying) {
            this.character.anims.play('attack2', true);
            this.music.play();
            this.animPlaying = true;
            this.character.setVelocityX(0); 
            return;
        } else if(this.keys.R.isDown && !this.animPlaying){
            this.character.anims.play('attack1', true);
            this.music.play();

            this.animPlaying = true;
            this.character.setVelocityX(0);
            return;
        } else if(this.keys.T.isDown && !this.animPlaying){
            this.character.anims.play('attack3', true);
            this.animPlaying = true;
            this.music.play();

            this.character.setVelocityX(0);
        } else if(this.keys.P.isDown && !this.animPlaying){
            // this.character.anims.play('rolling', true);
            this.wizard.anims.play('wizAttack1', true);
            // this.animPlaying = true;
            // this.character.setVelocityX(300);
        }else {
            this.character.setVelocityX(0);
            if (!this.animPlaying) {
                // console.log(true)
                    this.character.anims.play('idle', true);
            }
        }        
    }
}
