import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import AdminPage from './routes/AdminPage'
import AuthPage from './routes/AuthPage'
import People from './people/People'
import ProtectedRoute from './common/ProtectedRoute'

class Root extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <ProtectedRoute path="/admin" component={AdminPage}/>
                <Route path="/auth" component={AuthPage}/>
                <ProtectedRoute path="/people" component={People}/>
            </div>
        )
    }
}

export default Root