export class Vector2 {
  x: number
  y: number
  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export class Vector3 extends Vector2 {
  z: number
  constructor (x: number, y: number, z: number) {
    super(x, y)
    this.z = z
  }
}

export interface Color {
  r: number
  g: number
  b: number
  a: number
}

export interface GameObject {
  position: Vector3
  radius: number
  color: Color
  extra?: any
}

export class Scene {
  objects: GameObject[] = []
  constructor (objects: GameObject[]) {
    this.objects = objects
  }
}

export class Opts {
  FOV: number
  PROJECTION_CENTER_X: number
  PROJECTION_CENTER_Y: number
  constructor (
    FOV: number,
    PROJECTION_CENTER_X: number,
    PROJECTION_CENTER_Y: number
  ) {
    this.FOV = FOV
    this.PROJECTION_CENTER_X = PROJECTION_CENTER_X
    this.PROJECTION_CENTER_Y = PROJECTION_CENTER_Y
  }
}
export class Renderer {
  Canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  scene: Scene
  Opts: Opts

  constructor (Canvas: HTMLCanvasElement, Scene: Scene) {
    this.Canvas = Canvas
    this.scene = Scene
    this.ctx = Canvas.getContext('2d') as CanvasRenderingContext2D
    this.Opts = new Opts(
      this.Canvas.width * 1,
      this.Canvas.width / 2,
      this.Canvas.height / 2
    )
  }

  project (object: GameObject) {
    let sizeProjection = this.Opts.FOV / (this.Opts.FOV + object.position.z)
    const xProject =
      object.position.x * sizeProjection + this.Opts.PROJECTION_CENTER_X
    const yProject =
      object.position.y * sizeProjection + this.Opts.PROJECTION_CENTER_Y
    return [xProject, yProject, sizeProjection]
  }

  draw (object: GameObject) {
    let [xProjected, yProjected, scaleProjected] = this.project(object)
    this.ctx.globalAlpha = Math.abs(1 - object.position.z / this.Opts.FOV)
    if (object.position.z < -this.Opts.FOV + object.radius) {
      return
    }
    this.ctx.fillStyle = `rgba(${object.color.r}, ${object.color.g}, ${object.color.b}, ${object.color.a})`
    this.ctx.fillRect(
      xProjected - object.radius,
      yProjected - object.radius,
      object.radius * 2 * scaleProjected,
      object.radius * 2 * scaleProjected
    )
  }
  render () {
    this.scene.objects.forEach(object => {
      this.draw(object)
    })
  }
}

export class Game {
  fps: number = 60
  scene: Scene
  renderer: Renderer
  Canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  constructor (fps: number, Canvas: HTMLCanvasElement) {
    this.fps = fps
    this.scene = new Scene([])
    this.renderer = new Renderer(Canvas, this.scene)
    this.Canvas = Canvas
    this.context = Canvas.getContext('2d') as CanvasRenderingContext2D
  }
  draw () {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    )
    this.scene.objects.sort((a, b) => a.position.z - b.position.z).forEach(object => {
      this.renderer.draw(object)
    })
  }
}
export class KeyLogic {
  keys: { [key: string]: boolean } = {}
  constructor () {
    this.keys = {}
    document.addEventListener('keydown', e => { this.keys[e.keyCode] = true  })
    document.addEventListener('keyup'  , e => { this.keys[e.keyCode] = false })
  }
}
