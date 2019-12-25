import React from 'react'
import { DesignPage } from 'react-design'

export default function Page1 () {
  return (
    <DesignPage>
      <div
        style={{
          background: '#121212',
          color: '#eee'
        }}
      >
        Page 1
      </div>
    </DesignPage>
  )
}

Page1.path = '/page1'
