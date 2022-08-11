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

class BarkEngine {
  public WorldToScreen (position: Vector3): Vector2 {
    return {
      x: position.x,
      y: position.y
    }
  }
}

class Scene {
  ctx: CanvasRenderingContext2D

  constructor (ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
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

  public Clear () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
}
