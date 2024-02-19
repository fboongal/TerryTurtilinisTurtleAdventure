class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
    this.physics.world.gravity.y = 300
    }

    create() {

        // play and loop background music
        this.bgm = this.sound.add('bgm', {
            volume: 1,
            loop: true
        })
        
        if(!this.musicPlayed) {
            this.bgm.play()
            this.musicPlayed = true
        }

        if (this.musicPlayed && this.scene.isActive('playScene')) {
            this.musicPlayed = false
        }

        // define speeds, "i am speed" -Lightning McQueen
        this.jellySpeed = -300
        this.trashSpeed = -400

        // add background, foreground, bubbles
        this.bg = this.add.tileSprite(0, 0, 1500, 800, 'bg').setOrigin(0)
        this.bbb = this.add.tileSprite(0, 0, 1500, 800, 'bbb').setOrigin(0)
        this.fg = this.add.tileSprite(0, 0, 1500, 800, 'fg').setOrigin(0)
        this.bb = this.add.tileSprite(0, 0, 1500, 800, 'bb').setOrigin(0)

        // define jelly
        this.jelly = 0

        // terry turtilini anims
        this.anims.create({
            key: 'swim',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('terry', {
                start:0,
                end: 1
            })
        })
        this.anims.create({
            key: 'hurt',
            frameRate: 0,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('terry', {
                start:2,
                end: 2
            })
        })

        // terry turtillini!!
        terry = this.physics.add.sprite(150, centerY, 'terry').setOrigin(0.5)
        terry.setSize(158, 65)
        terry.setOffset(10, 0)
        terry.anims.play('swim')
        terry.body.setCollideWorldBounds(true)
        terry.setImmovable()
        terry.setMaxVelocity(0, 600)
        terry.setDragY(10)
        terry.destroyed = false
        
        // add jelly group
        this.jellyGroup = this.add.group({
            runChildUpdate: true
        })
        // add trash group
        this.trashGroup = this.add.group({
            runChildUpdate: true
        })

        // spawn jellies after 1.5 secs when play begins
        this.time.delayedCall(1500, () => {
            this.addJelly()
        })
        // spawn trash after 8 secs when play begins
        this.time.delayedCall(8000, () => {
            this.addTrash()
        })

        // add score board for jellies consumed
        this.jellyCount = 0
        
        this.add.image(centerX, 45, 'ribbon')
    

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
        this.score = this.add.text(centerX, 10,`Jellies Eaten: ${this.jellyCount}`, scoreConfig).setOrigin(0.5, 0)

        // more trash every 15.5 secs
       this.timer = this.time.addEvent({
        delay: 15500,
        callback: this.moreTrash,
        callbackScope: this,
        loop: true
       })
       // define trash multiplier
       this.trashMulti = 1

       // jelly frenzy!! every 30 secs
       this.jellyFrenzy = this.time.addEvent({
        delay: 30000,
        callback: this.moreJelly,
        callbackScope: this,
        loop: true
       })
       // define jelly mutiplier
       this.jellyMulti = 1
       // define frenzy multiplier
       this.frenzyMulti = 1
       this.frenzy = false

        cursors = this.input.keyboard.createCursorKeys()
    }
    // spawn jellies
    addJelly() {
        let speedVary = Phaser.Math.Between(0, 50)
        this.jelly = new Jelly(this, this.jellySpeed - speedVary).setScale(this.frenzyMulti)
        this.jellyGroup.add(this.jelly)

        this.jelly.body.setAllowGravity(false)

        // jelly anims
        this.anims.create({
            key: 'pulse',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('jelly', {
                start:0,
                end: 1
                })
            })

        this.jelly.anims.play('pulse')

        // define jelly frenzy
        if(this.frenzy){
            this.frenzyMulti = Phaser.Math.FloatBetween(1, 2)
        }
    }
    // spawn trash
    addTrash() {
        let speedVary = Phaser.Math.Between(50, 100)
        let random = Phaser.Math.Between(0, 2)
        if(random == 0){
            this.sprite = 't1'
        }
        else {
            this.sprite = 't2'
        }
        this.trash = new Trash(this, this.trashSpeed - speedVary, this.sprite).setScale(2)
        this.trashGroup.add(this.trash)

        this.trash.body.setAllowGravity(false)
        this.trash.body.setSize(36, 33)
    }

    update() {

        // background, foreground, bubble scrolling
        this.bg.tilePositionX += .5
        this.fg.tilePositionX += 1
        this.bbb.tilePositionX += 1.3
        this.bb.tilePositionX += 3
        
        // terry swimming physics
        if(!terry.destroyed) {
            if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
                terry.body.setVelocityY(-230) 
                this.sound.play('swim', {
                    volume: 0.7
                })
            }

            this.physics.world.collide(terry, this.trashGroup, this.trashCollision, null, this)
            this.physics.world.collide(terry, this.jellyGroup, this.jellyCollision, null, this)
        }
    }

    // terry eats jelly
    jellyCollision(terry, jelly) {
        this.sound.play('eat', {
            volume: 2
        })
        jelly.alpha = 0
        jelly.destroy()
        this.jellyCount ++ 
        this.score.text = `Jellies Eaten: ${this.jellyCount}`
    
    }
    // terry caught in trash
    trashCollision() {
        this.sound.play('hit', {
            volume: 10
        })
        terry.anims.play('hurt')
        terry.destroyed = true

        this.time.delayedCall(1500, () => {this.scene.start('gameOverScene', this.jellyCount)
        })

    }
    // more trash for higher difficulty, capped at x2 trash
    moreTrash() {
        if(this.trashMulti < 2) {
            this.trashMulti += 0.1
            console.log('more trash')
        }
    }
    // more jellies for jelly frenzy
    moreJelly() {
        this.jellyMulti *= 2
        this.frenzy = true

        console.log('jelly frenzy!!')
        this.jellyFrenzy = this.time.addEvent({
            delay: Phaser.Math.Between(3000, 8000),
            callback: this.stopJelly,
            callbackScope: this,
            loop: false
           })
    }
    // stop jelly frenzy
    stopJelly() {
        this.jellyMulti = 1
        this.frenzyMulti = 1
        this.frenzy = false
    }

}   