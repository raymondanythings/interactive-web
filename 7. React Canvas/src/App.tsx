import ArrowImg from './assets/arrow.svg'
import RotateCanvas from './components/RotateCanvas'
import Nudake from './components/nudake'
function App() {
  return (
    <div className="app">
      <section className="section">
        <header>
          <h1>test1`2</h1>
          <ul>
            <li>instagram</li>
            <li>twitter</li>
            <li>codpen</li>
          </ul>
        </header>
        <main>
          <div>
            <Nudake />
          </div>
        </main>
      </section>
      <section className="content-title">What is Lorem Ipsum?</section>
      <section className="content-main">
        <aside>
          <div className="">1914 translation by H. Rackham</div>
          <div className="">
            <img src={ArrowImg} />
            <img src={ArrowImg} />
          </div>
        </aside>
        <article>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </article>
      </section>
      <section className="content-canvas">
        <RotateCanvas />
      </section>
    </div>
  )
}

export default App
