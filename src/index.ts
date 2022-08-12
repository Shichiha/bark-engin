import * as bark from './Enjin'

let Canvas = document.getElementById('canvas') as HTMLCanvasElement
let ctx = Canvas.getContext('2d') as CanvasRenderingContext2D

let objects: bark.GameObject[] = []
for (let i = 0; i < 10; i++) {
    objects.push({
        position: {
            x: Math.random() * (Canvas.width - 100) + 50,
            y: Math.random() * (Canvas.height - 100) + 50,
            z: 0
        },
        size: {
            x: Math.random() * 10 ? 5 : 10,
            y: Math.random() * 10 ? 5 : 10

        },
        color: 255,
        type: 'arc'
    })
}

let game = new bark.Game(60, ctx)
game.scene.objects = objects

function mainGame () {
  game.draw()
  objects.forEach(object => {
    object.position.x += 1
    object.position.y += 1
    
  });
}

setInterval(mainGame, 1000 / game.fps)
