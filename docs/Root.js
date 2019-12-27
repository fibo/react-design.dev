import React from 'react'
import { Design, DesignNotFound } from 'react-design.dev'
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import Page1 from './Page1.js'

export default function Root () {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Design} exact path={'/'} />

        <Route component={DesignNotFound} exact path={'/design-not-found'} />

        <Route component={Page1} exact path={Page1.path} />

        <Redirect from='*' to={'/design-not-found'} />
      </Switch>
    </BrowserRouter>
  )
}
