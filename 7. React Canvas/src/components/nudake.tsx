import { useRef, useEffect, PropsWithChildren } from 'react'
import Renderer from '../contexts/Renderer'

const Nudake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const canvasParent = canvas.parentElement
      const ctx = canvas.getContext('2d')
      let canvasWidth: number, canvasHeight: number
      const resize = () => {
        canvasWidth = canvasParent!.clientWidth
        canvasHeight = canvasParent!.clientHeight
        canvas.style.width = canvasWidth + 'px'
        canvas.style.height = canvasHeight + 'px'
        canvas.width = canvasWidth
        canvas.height = canvasHeight
      }

      let x: number = 0
      let y: number = 0
      let vx: number = 20
      let vy: number = 20
      const size = 200
      let frameId: number

      const frame = () => {
        frameId = requestAnimationFrame(frame)
        ctx?.clearRect(0, 0, canvasWidth, canvasHeight)

        if (x < 0) {
          x = 0
          vx *= -1
        } else if (x > canvasWidth - size) {
          x = canvasWidth - size
          vx *= -1
        } else if (y < 0) {
          y = 0
          vy *= -1
        } else if (y > canvasHeight - size) {
          y = canvasHeight - size
          vy *= -1
        }
        x += vx
        y += vy

        ctx?.fillRect(x, y, size, size)
      }
      window.addEventListener('resize', resize)
      resize()
      requestAnimationFrame(frame)
      return () => {
        window.removeEventListener('resize', resize)
        cancelAnimationFrame(frameId)
      }
    }
  }, [])
  return (
    <div className="w-full h-full flex items-center justify-center relative border-2 border-solid border-red-500">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
export default Nudake
