export default class RenderingEngine {
  static ctx: CanvasRenderingContext2D | null | undefined
  static canvasWidth: number
  static instance: RenderingEngine
  private constructor(private readonly canvas: HTMLCanvasElement) {
    RenderingEngine.ctx = this.canvas.getContext('2d')
  }

  static getInstance(canvas: HTMLCanvasElement | null) {
    if (!canvas) return null
    if (!RenderingEngine.instance)
      RenderingEngine.instance = new RenderingEngine(canvas)
    return RenderingEngine.instance
  }

  public resize() {}
}
