class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
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
        this.add.text(game.config.width/2 + 36, 743, 'Press [M] for Menu [C] for Credits [R] to Restart', ggConfig).setOrigin(0.5)

        // cursor keys
        cursors = this.input.keyboard.createCursorKeys()

        // define M R C keys
         this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
         this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
         this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
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