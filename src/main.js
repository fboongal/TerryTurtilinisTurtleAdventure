// Name: Franchesca Boongaling
// Game Title: Terry Turtilini's Turtle Adventure!
// Hours Spent: 12
// Creative Tilt:

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 800,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Title, Play, GameOver ]
}

let game = new Phaser.Game(config)

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height

const terryVelocity = 200
let terry = null
let cursors