export interface Vector2 {
  x: number
  y: number
}

export interface Vector3 {
  x: number
  y: number
  z: number
}

export interface ExtendedVector3 extends Vector3 {
  w: number
  rx: number
  ry: number
  rz: number
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
  ctx: CanvasRenderingContext2D
  scene: Scene
  camera: Camera
  constructor (ctx: CanvasRenderingContext2D, Scene: Scene, camera: Camera) {
    this.ctx = ctx
    this.scene = Scene
    this.camera = camera
  }

  // projection from 3D to 2D
  // The camera is at (0, 0, 0) and the object is at (x, y, z), camera rotation is also 0,0,0
  World2Canvas (object: GameObject): Vector2 {
    let x = object.position.x - this.camera.position.x
    let y = object.position.y - this.camera.position.y
    let z = object.position.z - this.camera.position.z
    let canvasX =
      x * this.camera.position.rx +
      y * this.camera.position.ry +
      z * this.camera.position.rz
    let canvasY =
      x * this.camera.position.rx +
      y * this.camera.position.ry +
      z * this.camera.position.rz
    return {
      x: canvasX,
      y: canvasY
    }
  }

  // Draw the object in the canvas
  DrawObject (object: GameObject) {
    let canvasPosition = this.World2Canvas(object)
    this.ctx.fillStyle = `rgba(${object.color.r}, ${object.color.g}, ${object.color.b}, ${object.color.a})`
    if (object.type === 'rect') {
      this.ctx.fillRect(
        canvasPosition.x,
        canvasPosition.y,
        object.size.x,
        object.size.y
      )
    } else if (object.type === 'arc') {
      this.ctx.beginPath()
      this.ctx.arc(
        canvasPosition.x,
        canvasPosition.y,
        object.size.x,
        0,
        2 * Math.PI
      )
      this.ctx.fill()
    }
  }

  Draw () {
    this.scene.objects.forEach(object => {
      this.DrawObject(object)
    })
  }
}

export class Game {
  fps: number = 60
  scene: Scene
  camera: Camera
  renderer: Renderer
  context: CanvasRenderingContext2D
  constructor (fps: number, context: CanvasRenderingContext2D) {
    this.fps = fps
    this.scene = new Scene([])
    this.renderer = new Renderer(
      context,
      this.scene,
      new Camera({ x: 0, y: 0, z: 0, w: 1, rx: 0, ry: 0, rz: 0 })
    )
    this.context = context
  }
  draw () {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    )
    this.renderer.Draw()
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
