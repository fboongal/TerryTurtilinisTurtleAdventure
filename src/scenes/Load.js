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

        // load title screen
        this.load.spritesheet('title', 'img/title.png', {
            frameWidth: 1500,
            frameHeight: 800
        })

        // load audio

        // hit: https://freesound.org/people/jeckkech/sounds/391666/
        this.load.audio('hit', 'audio/hit.wav')
        // eat: https://freesound.org/people/DneproMan/sounds/334714/
        this.load.audio('eat', 'audio/eat.wav')
        // swim: https://freesound.org/people/jeckkech/sounds/391666/
        this.load.audio('swim', 'audio/swim.wav')
        // bg music: https://freesound.org/people/Bertsz/sounds/545457/
        this.load.audio('bgm', 'audio/terryBGMusic.wav')
        // start: https://freesound.org/people/Nightflame/sounds/188642/
        this.load.audio('st', 'audio/drip.wav')
    }

    create() {
        this.scene.start('titleScene')
    }
}