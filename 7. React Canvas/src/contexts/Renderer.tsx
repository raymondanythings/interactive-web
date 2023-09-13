import { useState, createContext, PropsWithChildren } from 'react'
import RenderingEngine from '../modules/RenderingEngine'
const rendererContext = createContext<{ renderer: RenderingEngine | null }>({
  renderer: null,
})

interface RendererContextProps {
  // canvas: HTMLCanvasElement | null
}

const Renderer = ({ children }: PropsWithChildren<RendererContextProps>) => {
  console.log(children?.ref?.current, '<<children')
  const [canvas, setCanvas] = useState(null)
  return (
    <rendererContext.Provider
      value={{ renderer: canvas ? RenderingEngine.getInstance(canvas) : null }}
    >
      {children}
    </rendererContext.Provider>
  )
}

export default Renderer
