class Jelly extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super (scene, game.config.width + 150, Phaser.Math.Between(75, 750), 'jelly')

        this.parentScene = scene
        
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setVelocityX(velocity)
        this.setImmovable()
        this.newJelly = true
    }

    update() {
        if(this.newJelly && this.x < centerX/2) {
            this.parentScene.addJelly(this.parent, this.velocity)
            this.newJelly = false
        }

        if(this.x < -this.width) {
            this.destroy()
        }
    }
}