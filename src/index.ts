import * as bark from './Engine'

let Canvas = document.getElementById('canvas') as HTMLCanvasElement
let Game = new bark.Game(60, Canvas)
let dots = []
for (let i = 0; i < 2000; i++) {
  let Position = {
    x: (Math.random() - 0.5) * Canvas.offsetWidth,
    y: (Math.random() - 0.5) * Canvas.offsetHeight,
    z: Math.random() * 10000
  }

  let Radius = 10
  let Color = {
    r: 5,
    g: 6,
    b: 217,
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

let kl = new bark.KeyLogic()
setInterval(() => {
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
}, 1000 / Game.fps)
