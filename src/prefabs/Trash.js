class Trash extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, sprite) {
        super (scene, game.config.width + 150, Phaser.Math.Between(75, 750), sprite)

        this.parentScene = scene
        
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setVelocityX(velocity)
        this.setImmovable()
        this.newTrash = true
    }

    update() {
        if(this.newTrash && this.x < centerX) {
            this.parentScene.addTrash(this.parent, this.velocity)
            this.newTrash = false
        }

        if(this.x < -this.width) {
            this.destroy()
        }
    }
}