class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
    this.physics.world.gravity.y = 300
    }

    create() {

        this.jellySpeed = -300
        this.trashSpeed = -450

        // background, foreground, bubbles
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

        terry = this.physics.add.sprite(150, centerY, 'terry').setOrigin(0.5)
        terry.anims.play('swim')
        terry.body.setCollideWorldBounds(true)
        terry.setImmovable()
        terry.setMaxVelocity(0, 600)
        terry.setDragY(10)
        terry.destroyed = false
        
        this.jellyGroup = this.add.group({
            runChildUpdate: true
        })

        this.trashGroup = this.add.group({
            runChildUpdate: true
        })

        this.time.delayedCall(2500, () => {
            this.addJelly()
        })
        this.time.delayedCall(8000, () => {
            this.addTrash()
        })

        cursors = this.input.keyboard.createCursorKeys()
    }

    addJelly() {
        let speedVary = Phaser.Math.Between(0, 50)
        this.jelly = new Jelly(this, this.jellySpeed - speedVary)
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
    }

    addTrash() {
        let speedVary = Phaser.Math.Between(10,100)
        let random = Phaser.Math.Between(0,2)
        if(random == 0){
            this.sprite = 't1'
        }
        else {
            this.sprite = 't2'
        }
        this.trash = new Trash(this, this.trashSpeed - speedVary, this.sprite).setScale(2)
        this.trashGroup.add(this.trash)

        this.trash.body.setAllowGravity(false)
    }
    update() {

        // background, foreground, bubble
        this.bg.tilePositionX += .5
        this.fg.tilePositionX += 1
        this.bbb.tilePositionX += 1.7
        this.bb.tilePositionX += 3

        // anims
       
        
        if(!terry.destroyed) {
          /*  if(cursors.up.isDown) {
                terry.body.velocity.y -= terryVelocity
            } else if(cursors.down.isDown) {
                terry.body.velocity.y += terryVelocity
            } 
            */

            if(Phaser.Input.Keyboard.JustDown(cursors.up)) {
                terry.body.setVelocityY(-250) 
            }

            this.physics.world.collide(terry, this.trashGroup, this.terryCollision, null, this)
            this.physics.world.collide(terry, this.jellyGroup, this.jellyCollision, null, this)
        }
    }

    jellyCollision(terry, jelly) {
        //this.jelly.destroyed = true
        jelly.alpha = 0
    }
    terryCollision() {
        terry.destroyed = true

    }
    
}