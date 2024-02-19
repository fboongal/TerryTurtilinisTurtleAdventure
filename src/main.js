// Name: Franchesca Boongaling
// Game Title: Terry Turtilini's Turtle Adventure!
// Hours Spent: 25
// Technical Creative Tilt: Jelly Frenzy! I really like the event that happens every 30 seconds and a swarm of jelly fish of various sizes appear on screen! It varies between 3 & 8 seconds to last!
// Visual Creative Tilt: I am really saistfied with my game's over all aesthetic! A cutesy chill game where you play as a turtle and eat scrumptious jellies. I had a lot of fun with the color scheme and creating the animated title and gameover screens (as well as the turtle and moon jellies!) and putting them into motion to make something I am very proud of. I also thing the music and audio choices I found really suit the game and ties it together.

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 800,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    scene: [ Load, Title, Play, Credits, GameOver ]
}

let game = new Phaser.Game(config)

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height

const terryVelocity = 200
let terry = null
let cursors


