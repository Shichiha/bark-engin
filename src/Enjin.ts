export interface Vector3 {
  x: number
  y: number
  z: number
}

export interface Vector2 {
  x: number
  y: number
}

export interface Color {
  r: number
  g: number
  b: number
  a: number
}
export interface GameObject {
  position: Vector3
  size: Vector2
  color: Color
  type: 'rect' | 'arc'
  extra?: any
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
  DrawObject () {
    this.scene.objects.forEach(object => {
      this.ctx.fillStyle = `rgba(${object.color.r}, ${object.color.g}, ${object.color.b}, ${object.color.a})`
      if (object.type === 'rect') {
        this.ctx.fillRect(
          object.position.x,
          object.position.y,
          object.size.x,
          object.size.y
        )
      } else if (object.type === 'arc') {
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

  Draw () {
    this.DrawObject()
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
    this.context = context
  }
  draw () {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    this.renderer.Draw()
  }
}
