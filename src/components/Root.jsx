import React from 'react'
import { Router, Switch, Route } from 'react-router'
import { history } from '../history'

import Login from './Login'
import List from './List'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute'

const Root = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" exact component={Login} />
                <PrivateRoute path="/consulta" exact component={List} />
                {/* <Route render={NotFound} /> */}
            </Switch>
        </Router>
    )
}

export default Root