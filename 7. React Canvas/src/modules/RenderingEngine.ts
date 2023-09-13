export default class RenderingEngine {
  static ctx: CanvasRenderingContext2D | null | undefined
  static canvasWidth: number
  static instance: RenderingEngine
  private constructor(private readonly canvas: HTMLCanvasElement) {
    RenderingEngine.instance = new RenderingEngine(this.canvas)
    RenderingEngine.ctx = this.canvas.getContext('2d')
  }

  static getInstance(canvas: HTMLCanvasElement | null) {
    if (!canvas) return null
    if (RenderingEngine.instance) return RenderingEngine.instance
    return new RenderingEngine(canvas)
  }

  public resize() {}
}
