import { useRef, useEffect, PropsWithChildren } from 'react'
import image1 from '../assets/nudake-1.jpg'
import image2 from '../assets/nudake-2.jpg'
import image3 from '../assets/nudake-3.jpg'
import {
  drawImageCenter,
  getAngle,
  getDistance,
  getScrupedPercent,
} from '../utils/utils'
import throttle from 'lodash/throttle'
const Nudake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageSrcs = [image1, image2, image3]

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const canvasParent = canvas.parentElement
      const ctx = canvas.getContext('2d')
      const loadedImages = []

      let currentIndex = 0

      let prevPose = { x: 0, y: 0 }

      const preloadImages = () =>
        new Promise<void>((resolve) => {
          let loaded = 0
          imageSrcs.forEach((src) => {
            const img = new Image()
            img.src = src
            img.onload = () => {
              loaded += 1
              loadedImages.push(img)
              if (loaded === imageSrcs.length) return resolve()
            }
          })
        })

      let canvasWidth: number, canvasHeight: number
      const resize = async () => {
        canvasWidth = canvasParent!.clientWidth
        canvasHeight = canvasParent!.clientHeight
        canvas.style.width = canvasWidth + 'px'
        canvas.style.height = canvasHeight + 'px'
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        await preloadImages()
        drawImage()
      }

      const drawImage = () => {
        ctx?.clearRect(0, 0, canvasWidth, canvasHeight)
        const image = new Image()
        image.src = imageSrcs[currentIndex]
        image.onload = () => {
          if (ctx) {
            ctx.globalCompositeOperation = 'source-over'
            drawImageCenter(canvas, ctx, image)
            const nextImage = imageSrcs[(currentIndex + 1) % imageSrcs.length]
            if (canvasParent) {
              canvasParent.style.backgroundImage = `url(${nextImage})`
            }
          }
        }
      }

      const drawCircles = (e: MouseEvent) => {
        const nextPos = { x: e.offsetX, y: e.offsetY }
        const dist = getDistance(prevPose, nextPos)
        const angle = getAngle(prevPose, nextPos)

        for (let i = 0; i < dist; i++) {
          const x = prevPose.x + Math.cos(angle) * i
          const y = prevPose.y + Math.sin(angle) * i
          if (ctx) {
            ctx.globalCompositeOperation = 'destination-out'
          }
          ctx?.beginPath()
          ctx?.arc(x, y, 50, 0, Math.PI * 2)
          ctx?.fill()
          ctx?.closePath()
        }

        prevPose = nextPos
      }

      const checkPercent = throttle(() => {
        if (ctx) {
          const percent = getScrupedPercent(ctx, canvasWidth, canvasHeight)
          if (percent > 50) {
            currentIndex = (currentIndex + 1) % imageSrcs.length
            drawImage()
          }
        }
      }, 500)

      const onMouseMove = (e: MouseEvent) => {
        drawCircles(e)
        checkPercent()
      }

      const onMouseDown = (e: MouseEvent) => {
        console.log('omMouseDown')
        canvas.addEventListener('mouseup', onMouseUp)
        canvas.addEventListener('mouseleave', onMouseUp)
        canvas.addEventListener('mousemove', onMouseMove)
        prevPose = { x: e.offsetX, y: e.offsetY }
      }
      const onMouseUp = () => {
        console.log('omMouseUp')
        canvas.removeEventListener('mouseup', onMouseUp)
        canvas.removeEventListener('mouseleave', onMouseUp)
        canvas.removeEventListener('mousemove', onMouseMove)
      }

      canvas.addEventListener('mousedown', onMouseDown)

      window.addEventListener('resize', resize)
      resize()

      return () => {
        window.removeEventListener('resize', resize)
        canvas.removeEventListener('mousedown', onMouseDown)
      }
    }
  }, [])
  return (
    <div className="w-full h-full flex items-center justify-center relative border-2 border-solid border-red-500 bg-no-repeat bg-center bg-cover">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
export default Nudake
