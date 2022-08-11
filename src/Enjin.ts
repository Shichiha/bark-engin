interface Vector3 {
  x: number
  y: number
  z: number
}

interface Vector2 {
  x: number
  y: number
}

interface GameObject {
  position: Vector3
  size: Vector2
  color: number
  type: 'rect' | 'arc'
}

interface RectObject extends GameObject {
  type: 'rect'
}

interface ArcObject extends GameObject {
  type: 'arc'
}

class Scene {
  objects: GameObject[] = []
  constructor (objects: GameObject[]) {
    this.objects = objects
  }
}

class Renderer {
  ctx: CanvasRenderingContext2D
  scene: Scene
  constructor (ctx: CanvasRenderingContext2D, Scene: Scene) {
    this.ctx = ctx
    this.scene = Scene
  }
  Draw() {
    this.scene.objects.forEach(object => {
      if (object.type === 'rect') {
        this.ctx.fillStyle = `rgb(${object.color}, ${object.color}, ${object.color})`
        this.ctx.fillRect(
          object.position.x,
          object.position.y,
          object.size.x,
          object.size.y
        )
      } else if (object.type === 'arc') {
        this.ctx.fillStyle = `rgb(${object.color}, ${object.color}, ${object.color})`
        this.ctx.beginPath()
        this.ctx.arc(
          object.position.x,
          object.position.y,
          object.size.x,
          0,
          2 * Math.PI
        )
        this.ctx.fill()
      }
    }
    )
  }
}

let Canvas = document.getElementById('canvas') as HTMLCanvasElement;
let ctx = Canvas.getContext('2d') as CanvasRenderingContext2D;
let objects: GameObject[] = [
  {
    position: { x: 0, y: 0, z: 0 },
    size: { x: 100, y: 100 },
    color: 255,
    type: 'rect'
  }
]

class GameEngine {
  fps: number = 60
  scene: Scene
  renderer: Renderer
  context: CanvasRenderingContext2D
  constructor (fps, context) {
    this.fps = fps
    this.scene = new Scene([]);
    this.renderer = new Renderer(context, this.scene) 
  }
  draw () {
    this.renderer.Draw()
  }
}

let game = new GameEngine(1, ctx)
game.scene.objects = objects

function mainGame () {
    game.draw()
}

setInterval(mainGame, 1000 / game.fps)