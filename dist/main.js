;(() => {
  'use strict'
  var t = function (t) {
      ;(this.objects = []), (this.objects = t)
    },
    c = (function () {
      function t (t, c) {
        ;(this.ctx = t), (this.scene = c)
      }
      return (
        (t.prototype.Draw = function () {
          var t = this
          this.scene.objects.forEach(function (c) {
            'rect' === c.type
              ? ((t.ctx.fillStyle = 'rgb('
                  .concat(c.color, ', ')
                  .concat(c.color, ', ')
                  .concat(c.color, ')')),
                t.ctx.fillRect(c.position.x, c.position.y, c.size.x, c.size.y))
              : 'arc' === c.type &&
                ((t.ctx.fillStyle = 'rgb('
                  .concat(c.color, ', ')
                  .concat(c.color, ', ')
                  .concat(c.color, ')')),
                t.ctx.beginPath(),
                t.ctx.arc(c.position.x, c.position.y, c.size.x, 0, 2 * Math.PI),
                t.ctx.fill())
          })
        }),
        t
      )
    })(),
    e = new ((function () {
      function e (e, o) {
        ;(this.fps = 60),
          (this.fps = e),
          (this.scene = new t([])),
          (this.renderer = new c(o, this.scene))
      }
      return (
        (e.prototype.draw = function () {
          this.renderer.Draw()
        }),
        e
      )
    })())(1, document.getElementById('canvas').getContext('2d'))
  ;(e.scene.objects = [
    {
      position: { x: 0, y: 0, z: 0 },
      size: { x: 100, y: 100 },
      color: 255,
      type: 'rect'
    }
  ]),
    setInterval(function () {
      e.draw()
    }, 1e3 / e.fps)
})()
