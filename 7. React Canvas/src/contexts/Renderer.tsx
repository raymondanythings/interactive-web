import { forwardRef, useEffect, useRef, useState } from 'react'
import RenderingEngine from '../modules/RenderingEngine'

const Renderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [renderingEngine, setRenderingEngine] = useState(
    RenderingEngine.getInstance(canvasRef.current)
  )
  useEffect(() => {
    if (canvasRef.current) {
      const engine = RenderingEngine.getInstance(canvasRef.current)
    }
  }, [renderingEngine])
  return <canvas ref={canvasRef} />
}

export default Renderer
