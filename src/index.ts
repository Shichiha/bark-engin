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

async function tween(a: bark.Vector3, b: bark.Vector3, duration: number) {
  let start = Date.now()
  let end = start + duration
  while (Date.now() < end) {
    let t = (Date.now() - start) / duration
    a.x = (1 - t) * a.x + t * b.x
    a.y = (1 - t) * a.y + t * b.y
    a.z = (1 - t) * a.z + t * b.z
    await new Promise(resolve => setTimeout(resolve, 1000 / Game.fps))
  }
}

Game.scene.objects = dots
window.addEventListener('resize', () => {
  Game.renderer.calculateArea()
})
Game.renderer.calculateArea()
setInterval(() => {
  let newPos = []
  for (let object of Game.scene.objects) {
    let Position = {
    //   tween
        x: (Math.random() - 0.5) * Canvas.offsetWidth,
        y: (Math.random() - 0.5) * Canvas.offsetHeight,
        z: Math.random() * Game.Canvas.height
    }
    newPos.push(Position)
  }
  for (let i = 0; i < Game.scene.objects.length; i++) {
    tween(Game.scene.objects[i].position, newPos[i], 60000)
  }
  Game.draw()
  console.log('Drawing')
}, 1000 / Game.fps)
