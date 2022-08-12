import * as bark from './Enjin'

let Canvas = document.getElementById('canvas') as HTMLCanvasElement
let ctx = Canvas.getContext('2d') as CanvasRenderingContext2D

let objects: bark.GameObject[] = []
for (let i = 0; i < 50; i++) {
  objects.push({
    position: {
      x: Math.random() * Canvas.width,
      y: Math.random() * Canvas.height,
      z: 0
    },
    size: {
      x: Math.random() * 10,
      y: Math.random() * 10
    },
    color: 255,
    type: 'arc'
  })
}

let game = new bark.Game(60, ctx)
game.scene.objects = objects
let gravity = -2

function mainGame () {
  game.draw()
  objects.forEach(object => {
    object.position.y += Math.random() * 4 - 2 * gravity
    object.position.x += Math.random() * 4 - 2
    if (object.position.y > Canvas.height) {
      object.position.y = 0
    }
    if (object.position.x > Canvas.width) object.position.x = -Canvas.width
    if (object.position.x < -Canvas.width) object.position.x = Canvas.width
    object.size.x = Math.random() * 5
    object.size.y = Math.random() * 5
  })
}

setInterval(mainGame, 1000 / game.fps)
