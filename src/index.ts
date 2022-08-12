import * as bark from './Enjin'

let Canvas = document.getElementById('canvas') as HTMLCanvasElement
let ctx = Canvas.getContext('2d') as CanvasRenderingContext2D
let objects: bark.GameObject[] = [
  {
    position: { x: 0, y: 0, z: 0 },
    size: { x: 100, y: 100 },
    color: 255,
    type: 'rect'
  }
]

let game = new bark.Game(1, ctx)
game.scene.objects = objects

function mainGame () {
  game.draw()
}

setInterval(mainGame, 1000 / game.fps)
