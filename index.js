// shichihachi bored
// todo: maybe add z axis to the game? (fake 3d)
// todo: zoom in/out
// tofix: low fps, slow movement :(

let gamecvs = document.getElementById('canvas')
let ctx = gamecvs.getContext('2d')

// Game Engine Logic
class GameObject {
  constructor (x, y, width, height, color, opacity) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.opacity = opacity
  }
}

class RectObj extends GameObject {
  draw () {
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.opacity
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.globalAlpha = 1
  }
}

class ArcObj extends GameObject {
  draw () {
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.opacity
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }
}

class Scene {
  constructor () {
    this.objects = []
  }
  add (object) {
    this.objects.push(object)
  }
  draw () {
    for (let i = 0; i < this.objects.length; i++) this.objects[i].draw()
  }
}

class Camera {
  constructor (x, y, width, height, depth) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.depth = depth
  }
  draw () {
    ctx.fillStyle = '#000000'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class GameEngine {
  constructor (fps) {
    this.fps = fps
    this.scene = new Scene()
    this.camera = new Camera(0, 0, gamecvs.width, gamecvs.height, gamecvs.depth)
    this.interval = setInterval(this.draw.bind(this), 1000 / this.fps)
  }
  draw () {
    this.camera.draw()
    this.scene.draw()
  }
}

class KeyLogic {
  constructor () {
    this.keys = {}
    document.addEventListener('keydown', e => {
      this.keys[e.keyCode] = true
    })
    document.addEventListener('keyup', e => {
      this.keys[e.keyCode] = false
    })
  }

  addKey (key, callback, type) {
    this.keys[key] = false
    document.addEventListener(type, e => {
      if (e.keyCode === key) callback()
    })
  }

  checkKey (key, callback) {
    if (this.keys[key]) callback()
  }
}

// Main Game Logic
gamecvs.width = window.innerWidth / 2
gamecvs.height = window.innerHeight / 2

console.log('structure define ok')
let engine = new GameEngine(60)
let player = new RectObj(
  gamecvs.width / 2,
  gamecvs.height / 2,
  20,
  20,
  '#00ff00',
  1
)
let test_arc = new ArcObj(
  gamecvs.width / 2,
  gamecvs.height / 2,
  20,
  '#ff0000',
  1
)

let test_hollow_arc = new ArcObj(
  gamecvs.width / 2,
  gamecvs.height / 2,
  20,
  '#000000',
  1
)

engine.scene.add(player)
engine.scene.add(test_arc)
console.log('engine define ok')

let kl = new KeyLogic()

const pspeed = 5
const gravity = 1
let gravityAcceleration = 0

function GameLogic () {
  let onground = player.y + player.height >= gamecvs.height - 1
  kl.checkKey(37, () => {
    player.x -= pspeed
  })
  kl.checkKey(39, () => {
    player.x += pspeed
  })
  kl.checkKey(40, () => {
    player.y += pspeed
  })
  kl.checkKey(38, () => {
    player.y -= pspeed
  })

  if (player.x < 0) player.x = 0
  if (player.y < 0) player.y = 0
  if (player.x > gamecvs.width - player.width)
    player.x = gamecvs.width - player.width
  if (player.y > gamecvs.height - player.height)
    player.y = gamecvs.height - player.height
  if (!onground) {
    gravityAcceleration += (player.y / gamecvs.height) * 0.9
    player.y += gravity * gravityAcceleration
  }
}

console.log('game logic define ok')
function maindraw () {
  engine.draw()
  GameLogic()
  console.log('drawing :)')
}
engine.interval = setInterval(maindraw, 1000 / engine.fps)
console.log('1 second has passed, end of defining stuff :D')
