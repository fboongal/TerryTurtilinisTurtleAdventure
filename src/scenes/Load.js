class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load sprites
        this.load.path = './assets/'
        // this.load.image('terry', 'img/terry.png')
        //this.load.image('jelly', 'img/jelly.png')
        this.load.image('bg', 'img/ocean blue.png')
        this.load.image('fg', 'img/corals.png')
        this.load.image('bb', 'img/bubbles.png')
        this.load.image('bbb', 'img/bubbles2.png')
        this.load.image('t1', 'img/bag.png' )
        this.load.image('t2', 'img/rings.png')
        
        
        this.load.spritesheet('jelly', 'img/jelly.png', {
            frameWidth: 80,
            frameHeight: 45
        })
        this.load.spritesheet('terry', 'img/terry ani.png', {
            frameWidth: 168,
            frameHeight: 96
        })
    }

    create() {
        this.scene.start('playScene')
    }
}