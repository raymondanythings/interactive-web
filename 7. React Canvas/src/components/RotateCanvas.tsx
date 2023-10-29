import {
  Engine,
  Render,
  Runner,
  Mouse,
  MouseConstraint,
  Composite,
  Bodies,
  IChamferableBodyDefinition,
  Events,
} from 'matter-js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import IconAFRAME from '../assets/icon_AFRAME.png'
import IconCSS from '../assets/icon_CSS.png'
import IconHTML from '../assets/icon_HTML.png'
import IconJS from '../assets/icon_JS.png'
import IconREACT from '../assets/icon_REACT.png'
import IconTHREE from '../assets/icon_THREE.png'

const data = {
  JS: {
    title: 'Javascript',
    level: 4,
    desc: '자바스크립트에 대한 설명이라고 할 수 있습니다. 자바스크립트에 대한 설명. 자바스크립트에 대한 설명.',
  },
  REACT: {
    title: 'React.js',
    level: 5,
    desc: 'React에 대한 설명이라고 할 수 있습니다. React에 대한 설명. React에 대한 설명.',
  },
  CSS: {
    title: 'CSS/SASS',
    level: 3,
    desc: 'CSS에 대한 설명이라고 할 수 있습니다. CSS에 대한 설명. CSS에 대한 설명.',
  },
  AFRAME: {
    title: 'Aframe.js',
    level: 4,
    desc: 'AFRAME에 대한 설명이라고 할 수 있습니다. AFRAME에 대한 설명. AFRAME에 대한 설명.',
  },
  THREE: {
    title: 'Three.js',
    level: 2,
    desc: 'THREE에 대한 설명이라고 할 수 있습니다. THREE에 대한 설명. THREE에 대한 설명.',
  },
  HTML: {
    title: 'HTML',
    level: 5,
    desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명. HTML에 대한 설명.',
  },
}

const RotateCanvas = () => {
  const [selected, setSelected] = useState(data['JS'])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const options = useMemo(
    () => ({
      width: 1000,
      height: 1000,
    }),
    []
  )

  const initMouse = ({
    canvas,
    engine,
  }: {
    canvas: HTMLCanvasElement
    engine: Engine
  }) => {
    const mouse = Mouse.create(canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
    })

    Composite.add(engine.world, mouseConstraint)

    canvas.removeEventListener('mousewheel', mouse.mousewheel)
    canvas.removeEventListener('DOMMouseScroll', mouse.mousewheel)

    return {
      mouse,
      mouseConstraint,
      clear: () => {
        Mouse.clearSourceEvents(mouse)
      },
    }
  }

  const initScene = useCallback(
    (canvas: HTMLCanvasElement) => {
      const engine = Engine.create()
      const render = Render.create({
        canvas,
        engine,
        options: {
          ...options,
          wireframes: false,
          background: '#1b1b19',
        },
      })
      const runner = Runner.create()
      Render.run(render)
      Runner.run(runner, engine)
      return {
        engine,
        render,
        runner,
        clear: () => {
          Composite.clear(engine.world, false)
          Runner.stop(runner)
          Render.stop(render)
          Engine.clear(engine)
        },
      }
    },
    [options]
  )

  const initGround = useCallback(
    (engine: Engine) => {
      const segments = 100
      const deg = (Math.PI * 2) / segments
      const width = 50
      const radius = options.width / 2 + width / 2
      const height = radius * Math.tan(deg / 2) * 2

      for (let i = 0; i < segments; i++) {
        const theta = deg * i
        const x = radius * Math.cos(theta) + options.width / 2
        const y = radius * Math.sin(theta) + options.height / 2
        addRect({
          x,
          y,
          w: width,
          h: height,
          option: { isStatic: true, angle: theta },
          engine,
        })
      }
    },
    [options.height, options.width]
  )

  const addRect = ({
    x,
    y,
    w,
    h,
    option = {},
    engine,
  }: {
    x: number
    y: number
    w: number
    h: number
    option?: IChamferableBodyDefinition
    engine: Engine
  }) => {
    const box = Bodies.rectangle(x, y, w, h, option)
    Composite.add(engine.world, box)
  }

  const initImageBoxes = useCallback(
    (engine: Engine) => {
      const { width, height } = options
      const scale = 0.7
      const size = 250 * scale
      const t1 = { w: 250 * scale, h: 250 * scale }
      const t2 = { w: 732 * scale, h: 144 * scale }

      addRect({
        x: width / 2,
        y: height / 2,
        ...t1,
        engine,
        option: {
          label: 'JS',
          chamfer: {
            radius: 20,
          },
          render: {
            sprite: {
              texture: IconJS,
              xScale: scale,
              yScale: scale,
            },
          },
        },
      })

      addRect({
        x: width / 2 - size,
        y: height / 2,
        ...t1,
        engine,
        option: {
          label: 'CSS',
          chamfer: {
            radius: 20,
          },
          render: {
            sprite: {
              texture: IconCSS,
              xScale: scale,
              yScale: scale,
            },
          },
        },
      })
      addRect({
        x: width / 2 + t1.w,
        y: height / 2,
        ...t1,
        engine,
        option: {
          label: 'HTML',
          chamfer: {
            radius: 20,
          },
          render: {
            sprite: {
              texture: IconHTML,
              xScale: scale,
              yScale: scale,
            },
          },
        },
      })
      addRect({
        x: width / 2,
        y: height / 2 + t1.h,
        ...t1,
        engine,
        option: {
          label: 'THREE',
          chamfer: {
            radius: 20,
          },
          render: {
            sprite: {
              texture: IconTHREE,
              xScale: scale,
              yScale: scale,
            },
          },
        },
      })
      addRect({
        x: width / 2 - t1.w,
        y: height / 2 + t1.h,
        ...t1,
        engine,
        option: {
          label: 'REACT',
          chamfer: {
            radius: 75,
          },
          render: {
            sprite: {
              texture: IconREACT,
              xScale: scale,
              yScale: scale,
            },
          },
        },
      })
      addRect({
        x: width / 2,
        y: height / 2 - t2.h,
        ...t2,
        engine,
        option: {
          label: 'AFRAME',
          chamfer: {
            radius: 20,
          },
          render: {
            sprite: {
              texture: IconAFRAME,
              xScale: scale,
              yScale: scale,
            },
          },
        },
      })
    },
    [options]
  )

  const initIntersectionObserver = ({
    canvas,
    runner,
    render,
  }: {
    canvas: HTMLCanvasElement
    runner: Runner
    render: Render
  }) => {
    const options = {
      threshold: 0.1,
    }
    const observer = new IntersectionObserver((entries) => {
      const canvasEntry = entries[0]

      if (canvasEntry.isIntersecting) {
        runner.enabled = true
        Render.run(render)
      } else {
        runner.enabled = false
        Render.stop(render)
      }
    }, options)
    observer.observe(canvas)
    return {
      claer: () => observer.unobserve(canvas),
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const gravityPower = 0.8
      let gravityDeg = 0
      const scene = initScene(canvas)
      const { engine, runner, render } = scene
      const mouseControl = initMouse({ canvas, engine })
      const { mouse, mouseConstraint } = mouseControl

      initGround(engine)
      initImageBoxes(engine)
      const observer = initIntersectionObserver({ canvas, runner, render })

      Events.on(mouseConstraint, 'mousedown', () => {
        const newSelected =
          data[mouseConstraint.body?.label as keyof typeof data]

        if (newSelected) setSelected(newSelected)
      })
      Events.on(runner, 'tick', () => {
        gravityDeg += 1
        engine.gravity.x = gravityPower * Math.cos((Math.PI / 180) * gravityDeg)
        engine.gravity.y = gravityPower * Math.sin((Math.PI / 180) * gravityDeg)
      })
      canvas.addEventListener('mousewheel', () =>
        addRect({
          x: mouse.position.x,
          y: mouse.position.y,
          w: 50,
          h: 50,
          engine,
        })
      )
      return () => {
        canvas.removeEventListener('mousewheel', () =>
          addRect({
            x: mouse.position.x,
            y: mouse.position.y,
            w: 50,
            h: 50,
            engine,
          })
        )

        observer.claer()
        scene.clear()
        mouseControl.clear()
      }
    }
  }, [initGround, initImageBoxes, initScene])

  return (
    <div className="rotate-canvas-wrapper">
      <canvas ref={canvasRef}></canvas>
      <aside>
        <h1>{selected.title}</h1>
        <h2>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                style={{ filter: `grayscale(${selected.level <= i ? 1 : 0})` }}
              >
                ⭐
              </span>
            ))}
        </h2>
        <p>{selected.desc}</p>
      </aside>
    </div>
  )
}

export default RotateCanvas
