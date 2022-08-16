import * as bark from './Engine'

let Canvas = document.getElementById('canvas') as HTMLCanvasElement
let ctx = Canvas.getContext('2d') as CanvasRenderingContext2D

let Game = new bark.Game(60, Canvas)
let dots = []
for (let i = 0; i < 100; i++) {
  let Position = {
    x: (Math.random() - 0.5) * Canvas.offsetWidth,
    y: (Math.random() - 0.5) * Canvas.offsetHeight,
    z: Math.random() * Game.Canvas.height
  }

  let Radius = 10
  let Color = {
    r: 255,
    g: 255,
    b: 255,
    a: 1
  }
  let object = new bark.GameObject(Position, Radius, Color)
  dots.push(object)
}

Game.scene.objects = dots
function lerp (a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerpVector3 (a: bark.Vector3, b: bark.Vector3, t: number) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    z: lerp(a.z, b.z, t)
  }
}

let kl = new bark.KeyLogic
setInterval(() => {
//   key "up"
    if (kl.keys[38]) {
    Game.scene.objects.forEach(object => {
        object.position.z += 100
    })
    } else if (kl.keys[40]) {
    Game.scene.objects.forEach(object => {
        object.position.z -= 100
    })
    
    }
  Game.draw()
  console.log('Drawing')
}, 1000 / Game.fps)
