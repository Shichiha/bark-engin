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

class Renderer {
  ctx: CanvasRenderingContext2D
  objects: GameObject[] = []
  constructor (ctx: CanvasRenderingContext2D, objects: GameObject[]) {
    this.ctx = ctx,
    this.objects = objects
  }
  public DrawRect (object: RectObject) {
    this.ctx.fillStyle = `rgb(${object.color}, ${object.color}, ${object.color})`
    this.ctx.fillRect(
      object.position.x,
      object.position.y,
      object.size.x,
      object.size.y
    )
  }

  public DrawArc (object: ArcObject) {
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

  public Draw (objects: GameObject[]) {
    objects.forEach(object => {
      if (object.type === 'rect') {
        this.DrawRect(object as RectObject)
      } else if (object.type === 'arc') {
        this.DrawArc(object as ArcObject)
      }
    })
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
let renderer = new Renderer(ctx, objects)
renderer.Draw(objects)

