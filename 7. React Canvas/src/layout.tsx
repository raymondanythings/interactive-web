import { Fragment, PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      {children}
      <footer>
        <div className="email">raymondanything@gmail.com</div>
      </footer>
    </Fragment>
  )
}
export default Layout
