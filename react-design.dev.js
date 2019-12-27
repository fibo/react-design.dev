import React, { useEffect, useState } from 'react'

export function Design () {
  const [origin, setOrigin] = useState({ x: 10, y: 0 })
  const [scale, setScale] = useState(0.85)
  const [pointerCoordinates, setPointerCoordinates] = useState()
  const [isDragging, setIsDragging] = useState(false)

  // Disable scroll.
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <div
      onMouseDown={({ clientX: x, clientY: y }) => {
        setPointerCoordinates({ x, y })
        setIsDragging(true)
      }}
      onMouseMove={({ clientX: x, clientY: y }) => {
        if (isDragging) {
          // 1. Translate origin.
          setOrigin({
            x: origin.x - pointerCoordinates.x + x,
            y: origin.y - pointerCoordinates.y + y
          })
          // 2. Update pointer coordinates.
          setPointerCoordinates({ x, y })
        }
      }}
      onMouseUp={event => {
        setIsDragging(false)
      }}
      onWheel={event => {
        setScale(scale - event.deltaY * 0.001)
      }}
      style={{
        background: '#fefefe',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100vh',
        width: '100vw'
      }}
    >

      <div
        style={{
          position: 'absolute',
          left: origin.x + 100,
          top: origin.y + 100,
          height: 812 * scale,
          width: 375 * scale,
          boxShadow: '1px 1px 7px 1px rgba(0, 0, 0, 0.17)'
        }}
      >
        <iframe
          src='/page1'
          height={812 * scale}
          width={375 * scale}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
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

export function DesignPage ({ children, className, style = {} }) {
  return (
    <div
      className={className}
      style={{
        background: 'transparent',
        color: '#121212',
        ...style,
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
