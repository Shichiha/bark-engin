import * as bark from './Enjin'

let Canvas = document.getElementById('canvas') as HTMLCanvasElement
let ctx = Canvas.getContext('2d') as CanvasRenderingContext2D

let objects: bark.GameObject[] = []
for (let i = 0; i < 2000; i++) {
  objects.push({
    position: {
      x: Math.random() * Canvas.width,
      y: Math.random() * Canvas.height,
    },
    size: {
      x: Math.random() * 5,
      y: Math.random() * 5
    },
    color: { r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255, a: 1 },
    type: 'arc',
    extra: {
      gravity: 30
    }
  })
}

let game = new bark.Game(60, ctx)
game.scene.objects = objects
let gravity = 50
function mainGame () {
  game.draw()
  game.scene.objects.forEach(object => {
    object.position.y += Math.sin(object.position.x / 100) * object.extra.gravity
    object.position.x += Math.cos(object.position.y / 100) * object.extra.gravity
  })
}
setInterval(mainGame, 1000 / game.fps)
