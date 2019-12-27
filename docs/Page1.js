import React from 'react'
import { DesignPage } from 'react-design.dev'

export default function Page1 () {
  return (
    <DesignPage style={{ padding: '1rem' }}>
      <h1>React design</h1>

      <p>
        This page is rendered as an <code>iframe</code> inside an <em>infinite paper</em>.
        You can zoom using mouse wheel and translate with mouse dragging.
      </p>
    </DesignPage>
  )
}

Page1.path = '/page1'
