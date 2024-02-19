class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create(jellyCount) {
        // add game over screen
        let gameOverScreen = this.add.sprite(0, 0, 'gameover').setOrigin(0, 0)

        gameOverScreen.anims.create({
            key: 'gg',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gameover', {
                start:0,
                end: 1
            })
        })
        gameOverScreen.anims.play('gg')

        // game over config
        let ggConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            color: '#c1fff2',
            align: 'center'
        }
        // add text for directions
        this.add.text(game.config.width/2 + 36, 750, 'Press [M] for Menu [C] for Credits [R] to Restart', ggConfig).setOrigin(0.5)

        // define M R C keys
         this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
         this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
         this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

         // add score board for jellies consumed
         this.add.image(centerX, 45, 'dribbon')

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            color: '#c1fff2',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 650
        }
    
        // score board text
        this.add.text(centerX, 10, `Jellies Eaten: ${jellyCount}`, scoreConfig).setOrigin(0.5, 0)
        console.log(jellyCount)
    }

    update() {
        // check for M input for menu
        if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.scene.start('titleScene')
            this.sound.play('st')
        }

        // check for R input for restart
        if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
            this.scene.start('playScene')
            this.sound.play('st')
        }

        // check for C input for restart
        if (Phaser.Input.Keyboard.JustDown(this.keyC)) {
            this.scene.start('creditsScene')
            this.sound.play('st')
        }
    }
}


