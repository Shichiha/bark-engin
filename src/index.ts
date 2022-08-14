import * as bark from './Enjin'

let Canvas = document.getElementById('canvas') as HTMLCanvasElement
let ctx = Canvas.getContext('2d') as CanvasRenderingContext2D

let Game = new bark.Game(60, ctx)
let go: bark.GameObject = { type: 'rect', position: { x: 239847239, y: 0, z: 0 }, size: { x: 100, y: 100 }, color: { r: 0, g: 0, b: 255, a: 1 } }
Game.scene.AddObject(go)
Game.draw()