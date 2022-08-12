import * as bark from './Enjin'

let Canvas = document.getElementById('canvas') as HTMLCanvasElement
let ctx = Canvas.getContext('2d') as CanvasRenderingContext2D

let objects: bark.GameObject[] = []
for (let i = 0; i < 5; i++) {
  objects.push({
    position: {
      x: Math.random() * Canvas.width,
      y: Math.random() * Canvas.height,
      z: 0
    },
    size: {
      x: Math.random() * 30,
      y: Math.random() * 30
    },
    color: 255,
    type: 'arc',
    extra: {
      gravityAccel: 1
    }
  })
}

let game = new bark.Game(60, ctx)
game.scene.objects = objects
let gravity = -2
function mainGame () {
  game.draw()
  objects.forEach(object => {
    object.position.y -= gravity * object.extra.gravityAccel
    let onground = object.position.y + object.size.y > Canvas.height
    if (onground) {
      object.extra.gravityAccel += -0.5
    } else {
      object.extra.gravityAccel += 0.1
    }

    if (object.position.y < 0) object.position.y = 0
    if (object.position.x < 0) object.position.x = 0
    if (object.position.x > Canvas.width) object.position.x = Canvas.width
    if (object.position.y > Canvas.height) object.position.y = Canvas.height
  })
}

Canvas.addEventListener('click', () => {
  gravity = -gravity
} )
setInterval(mainGame, 1000 / game.fps)
