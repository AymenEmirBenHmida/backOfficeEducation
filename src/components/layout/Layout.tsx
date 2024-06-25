import { LayoutProps } from '@/src/interfaces/LayoutProps'
import React from 'react'
import Header from '../header/Header'

const Layout : React.FC<LayoutProps>= ({children})=> {

  return (
    <div>
        <Header></Header>
        <div>
            {/* sidebar */}
            <div>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout