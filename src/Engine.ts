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

export class ExtendedVector3 extends Vector3 {
  w: number
  rx: number
  ry: number
  rz: number
  constructor (
    x: number,
    y: number,
    z: number,
    w: number,
    rx: number,
    ry: number,
    rz: number
  ) {
    super(x, y, z)
    this.w = w
    this.rx = rx
    this.ry = ry
    this.rz = rz
  }
}

export interface Color {
  r: number
  g: number
  b: number
  a: number
}

export class GameObject {
  position: Vector3
  radius: number
  color: Color
  extra?: any
  constructor (position: Vector3, radius: number, color: Color, extra?: any) {
    this.position = position
    this.radius = radius
    this.color = color
    this.extra = extra
  }
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
  AddObject (object: GameObject) {
    this.objects.push(object)
  }
}

export class Camera {
  position: ExtendedVector3
  constructor (position: ExtendedVector3) {
    this.position = position
  }
}

export class Renderer {
  Canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  scene: Scene
  camera: Camera
  width: number
  height: number
  PERSPECTIVE: number

  constructor (Canvas: HTMLCanvasElement, Scene: Scene, camera: Camera) {
    this.Canvas = Canvas
    this.scene = Scene
    this.camera = camera
    this.ctx = Canvas.getContext('2d') as CanvasRenderingContext2D
    this.PERSPECTIVE = this.width * 0.8
  }
  onResize () {
    this.width = this.Canvas.offsetWidth
    this.height = this.Canvas.offsetHeight

    if (window.devicePixelRatio > 1) {
      this.Canvas.width = this.Canvas.clientWidth * 2
      this.Canvas.height = this.Canvas.clientHeight * 2
      this.ctx.scale(2, 2)
    } else {
      this.Canvas.width = this.width
      this.Canvas.height = this.height
    }
  }

  project (object: GameObject) {
    let PROJECTION_CENTER_X = this.width / 2
    let PROJECTION_CENTER_Y = this.height / 2
    let scaleProjected =
      this.PERSPECTIVE / (this.PERSPECTIVE + object.position.z)
    let xProjected = object.position.x * scaleProjected + PROJECTION_CENTER_X
    let yProjected = object.position.y * scaleProjected + PROJECTION_CENTER_Y
    let Array = [xProjected, yProjected, scaleProjected]
    return Array
  }

  draw (object: GameObject) {
    let [xProjected, yProjected, scaleProjected] = this.project(object)
    this.ctx.globalAlpha = Math.abs(1 - object.position.z / this.width)
    this.ctx.fillRect(
      xProjected - object.radius,
      yProjected - object.radius,
      object.radius * 2 * scaleProjected,
      object.radius * 2 * scaleProjected
    )
  }
  render () {
    for (let object of this.scene.objects) {
      this.draw(object)
    }
  }
}

export class Game {
  fps: number = 60
  scene: Scene
  camera: Camera
  renderer: Renderer
  Canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  constructor (fps: number, Canvas: HTMLCanvasElement) {
    this.fps = fps
    this.scene = new Scene([])
    this.renderer = new Renderer(
      Canvas,
      this.scene,
      new Camera({ x: 0, y: 0, z: 0, w: 1, rx: 0, ry: 0, rz: 0 })
    )
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
    this.renderer.render()
  }
}

export class KeyLogic {
  keys: { [key: string]: boolean } = {}
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
