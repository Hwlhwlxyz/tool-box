import Link from 'next/link'
import { slide as Menu } from 'react-burger-menu'
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from 'react';

export default function Layout({ children }:any) {
  const [isServer, setIsServer] = useState(true)
const [marginLeftNumber, setmarginLeftNumber] = useState('10px');
const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    setIsServer(typeof window === 'undefined')
    console.log('ClientSide: isServer', isServer)
  }, [])
  function handleOnOpen(): void {
    setmarginLeftNumber('300px')
    setMenuOpen(true)
  }

  function handleOnClose(): void {
    setmarginLeftNumber('0')
    setMenuOpen(false)
  }

  return (<div id="outer-container">
      {!isServer&&<Menu 
      noOverlay noTransition className='bm-menu-wrap' 
      pageWrapId={'page-wrap'} outerContainerId={ "outer-container" } 
      onOpen={ handleOnOpen }
      onClose={ handleOnClose }
      isOpen={ menuOpen }
      >
        <Link id="home" className="menu-item" href="/">Home</Link>
        <Link id="json" className="menu-item" href="/tools/jsonviewer">Json Viewer</Link>
        <Link id="encode" className="menu-item" href="/tools/encode">Encode Decode</Link>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
      </Menu>}
      <main id="page-wrap" className={styles.main}
      style={{marginLeft: marginLeftNumber}}
      
      >{children}</main>
    </div>
  )
}