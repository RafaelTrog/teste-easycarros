import React from 'react'
import { Router, Switch, Route } from 'react-router'
import { history } from '../history'
import Login from './Login'
import NotFound from './NotFound'

const Root = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

export default Root