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

class Collision {
  checkCollision (obj1, obj2) {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.height + obj1.y > obj2.y
    )
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
}

// Main Game Logic
gamecvs.width = window.innerWidth / 2
gamecvs.height = window.innerHeight / 2

let engine = new GameEngine(60)
let player = new RectObj(
  gamecvs.width / 2,
  gamecvs.height / 2,
  20,
  20,
  '#00ff00',
  1
)
let test_cube = new RectObj(0, 450, 20, 20, '#ff0000', 1)

engine.scene.add(player)
engine.scene.add(test_cube)

let kl = new KeyLogic()

const pspeed = 5
const gravity = 1
let gravityAcceleration = 0

let collision = new Collision()

function GameLogic () {
  let onground = player.y + player.height >= gamecvs.height - 1
  if (kl.keys[37]) {
    player.x -= pspeed
  }
  if (kl.keys[39]) {
    player.x += pspeed
  }
  if (kl.keys[40]) {
    player.y += pspeed
  }
  if (kl.keys[38] && onground) {
    player.y -= pspeed
  }

  if (player.x < 0) player.x = 0
  if (player.y < 0) player.y = 0
  if (player.x > gamecvs.width - player.width)
    player.x = gamecvs.width - player.width
  if (player.y > gamecvs.height - player.height)
    player.y = gamecvs.height - player.height
  if (collision.checkCollision(player, test_cube)) {
    player.y -= 1
    onground = true
  }
  if (!onground) {
    gravityAcceleration += (player.y / gamecvs.height) * 0.9
    player.y += gravity * gravityAcceleration
  } else {
    gravityAcceleration = -10
  }
}

function maindraw () {
  engine.draw()
  GameLogic()
}
engine.interval = setInterval(maindraw, 1000 / engine.fps)
console.log('end')
