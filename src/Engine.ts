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

export class Constants {
    FOV: number
    PROJECTION_CENTER_X: number
    PROJECTION_CENTER_Y: number
    constructor (FOV: number, PROJECTION_CENTER_X: number, PROJECTION_CENTER_Y: number) {
    this.FOV = FOV
    this.PROJECTION_CENTER_X = PROJECTION_CENTER_X
    this.PROJECTION_CENTER_Y = PROJECTION_CENTER_Y
  }
}
export class Renderer {
  Canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  scene: Scene
  camera: Camera
  Constants: Constants

  constructor (Canvas: HTMLCanvasElement, Scene: Scene, camera: Camera) {
    this.Canvas = Canvas
    this.scene = Scene
    this.camera = camera
    this.ctx = Canvas.getContext('2d') as CanvasRenderingContext2D
    this.Constants = new Constants(this.Canvas.width * 1,
      this.Canvas.width / 2,
      this.Canvas.height / 2)
  }

  project (object: GameObject) {
    

    let sizeProjection = this.Constants.FOV / (this.Constants.FOV + object.position.z)
    const xProject = (object.position.x * sizeProjection) + this.Constants.PROJECTION_CENTER_X;
    const yProject = (object.position.y * sizeProjection) + this.Constants.PROJECTION_CENTER_Y;
    let Array = [xProject, yProject, sizeProjection]

    return Array
  }

  draw (object: GameObject) {
    let [xProjected, yProjected, scaleProjected] = this.project(object)
    this.ctx.globalAlpha = (xProjected < 0 || xProjected > this.Canvas.width || yProjected < 0 || yProjected > this.Canvas.height) ? 0 : Math.abs(1 - object.position.z / this.Canvas.width)
    if (object.position.z < -this.Constants.FOV + object.radius) {
      return;
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
    this.scene.objects
      .sort((a, b) => {
        return a.position.z - b.position.z
      })
      .forEach(object => {
        this.renderer.draw(object)
      })
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
