class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        // add GAME OVER text
        /*
        this.add.bitmapText(centerX, centerY, 'gem', `Disintegration averted for ${level}s`, 48).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer, 'gem', `This browser's best: ${highScore}s`, 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer*2, 'gem', `Press UP ARROW to Restart`, 36).setOrigin(0.5);
        */
        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
    }
}