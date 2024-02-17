class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // add credits 
        this.add.image(0, 0, 'cred').setOrigin(0)

        // credits config
        let credConfig = {
            fontFamily: 'Courier',
            fontSize: '55px',
            color: '#c1fff2',
            align: 'center'
        }
        // add text for directions
        this.add.text(game.config.width/2 + 36, 743, 'Press [M] for Menu', credConfig).setOrigin(0.5)


        // define M key
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    }

    update() {
        // check for M input for menu
        if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.scene.start('titleScene')
            this.sound.play('st')
        }
    }
}