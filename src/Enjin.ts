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
    color: 123,
    type: 'rect'
  },
  {
    position: { x: 200, y: 200, z: 0 },
    size: { x: 100, y: 100 },
    color: 234,
    type: 'arc'
  }
]
let scene = new Scene(objects)
let renderer = new Renderer(ctx, scene)
renderer.Draw()
