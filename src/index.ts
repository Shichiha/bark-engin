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

  let Radius = 5
  let Color = {
    r: 5,
    g: 6,
    b: 217,
    a: 1
  }
  let object = new bark.GameObject(Position, Radius, Color, {
    accel: { x: 0, y: 0, z: 0 },
    potential: { x: 0, y: 0, z: 0 },
  })
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
      object.position.z += 10
    })
  } else if (kl.keys[40]) {
    Game.scene.objects.forEach(object => {
      object.position.z -= 10
    })
  }
  if (kl.keys[37]) {
    Game.renderer.Opts.PROJECTION_CENTER_X += 10

    console.log(Game.renderer.Opts.PROJECTION_CENTER_X)
  }
  if (kl.keys[39]) {
    Game.renderer.Opts.PROJECTION_CENTER_X -= 10
    console.log(Game.renderer.Opts.PROJECTION_CENTER_X)
  }

  let gravity = { x: 0, y: 0.1, z: 0 }
  Game.scene.objects.forEach(object => {
    object.extra.accel.y += 10 * gravity.y
    object.position.y = object.position.y + object.extra.accel.y
    object.extra.potential.y = object.extra.accel.y / 1.5
    if (object.position.y > Canvas.offsetHeight) {
      object.position.y = Canvas.offsetHeight
      object.extra.accel.y = -object.extra.potential.y
    }

  })
  Game.draw()
}, 1000 / Game.fps)
