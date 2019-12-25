import React, { useEffect, useState } from 'react'

export function Design () {
  const [scale, setScale] = useState(0.85)

  // Disable scroll.
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <div
      onWheel={event => {
        event.preventDefault()

        setScale(scale + event.deltaY * -0.001)
        // Restrict scale
    // scale = Math.min(Math.max(.125, scale), 4)
      }}
      style={{
        background: 'transparent',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100vh',
        width: '100vw'
      }}
    >

      <div
        style={{
          background: 'magenta',
          position: 'absolute',
          left: 100,
          top: 100,
          height: 812 * scale,
          width: 375 * scale
        }}
      >
        <iframe
          src='/page1'
          height={812 * scale}
          width={375 * scale}
          style={{
            position: 'relative',
            height: 812,
            width: 375,
            border: 0,
            transform: `scale(${scale})`,
            transformOrigin: '0 0'
          }}
        />
      </div>
    </div>
  )
}

export function DesignPage ({ children }) {
  return (
    <div
      style={{
        background: 'transparent',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100vh',
        width: '100vw'
      }}
    >
      {children}
    </div>
  )
}

export function DesignNotFound () {
  return <div>Not found</div>
}
