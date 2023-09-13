import { useRef, useEffect, PropsWithChildren } from 'react'
import Renderer from '../contexts/Renderer'

const Nudake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const canvasParent = canvas.parentElement
      const ctx = canvas.getContext('2d')
    }
  }, [])
  return (
    <div className="w-full h-full flex items-center justify-center relative border-2 border-solid border-red-500">
      <Renderer>
        <canvas ref={canvasRef} className="absolute"></canvas>
      </Renderer>
    </div>
  )
}
export default Nudake

const NudakeContext = ({ children }: PropsWithChildren) => {
  return <Renderer>{children}</Renderer>
}
