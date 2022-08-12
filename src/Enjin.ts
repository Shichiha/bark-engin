export interface Vector3 {
  x: number
  y: number
  z: number
}

export interface Vector2 {
  x: number
  y: number
}

export interface GameObject {
  position: Vector3
  size: Vector2
  color: number
  type: 'rect' | 'arc'
}

export interface RectObject extends GameObject {
  type: 'rect'
}

export interface ArcObject extends GameObject {
  type: 'arc'
}

export class Scene {
  objects: GameObject[] = []
  constructor (objects: GameObject[]) {
    this.objects = objects
  }
}

export class Renderer {
  ctx: CanvasRenderingContext2D
  scene: Scene
  constructor (ctx: CanvasRenderingContext2D, Scene: Scene) {
    this.ctx = ctx
    this.scene = Scene
  }
  Draw () {
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
    })
  }
}

export class Game {
  fps: number = 60
  scene: Scene
  renderer: Renderer
  context: CanvasRenderingContext2D
  constructor (fps: number, context: CanvasRenderingContext2D) {
    this.fps = fps
    this.scene = new Scene([])
    this.renderer = new Renderer(context, this.scene)
  }
  draw () {
    this.renderer.Draw()
  }
}
