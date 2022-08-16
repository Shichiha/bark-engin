import * as bark from './Enjin'

let Canvas = document.getElementById('canvas') as HTMLCanvasElement
let ctx = Canvas.getContext('2d') as CanvasRenderingContext2D

let Game = new bark.Game(60, Canvas)
let dots = []
// this.x = (Math.random() - 0.5) * width; // Give a random x position
// this.y = (Math.random() - 0.5) * height; // Give a random y position
// this.z = Math.random() * width; // Give a random z position
for (let i = 0; i < 100; i++) {
  let Position = {
    x: (Math.random() - 1) * Canvas.offsetWidth,
    y: (Math.random() - 1) * Canvas.offsetHeight,
    z: Math.random() * Game.renderer.width
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
setInterval(() => {
  Game.draw();
}, 1000 / Game.fps)
