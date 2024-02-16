class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        // add title screen

        let titleScreen = this.add.sprite(0, 0, 'title').setOrigin(0, 0)

        titleScreen.anims.create({
            key: 'sway',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('title', {
                start:0,
                end: 1
            })
        })
        titleScreen.anims.play('sway')

        // title screen config
        let titleConfig = {
            fontFamily: 'Courier',
            fontSize: '55px',
            color: '#c1fff2',
            align: 'center'
        }
        // add text for directions
        this.add.text(game.config.width/2 + 36, 743, 'Tap [SPACE] to swim!', titleConfig).setOrigin(0.5)

        // cursor keys
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // check for SPACE input
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('playScene')
        }
    }
}