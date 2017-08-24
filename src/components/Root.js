import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import AdminPage from './routes/AdminPage'
import AuthPage from './routes/AuthPage'

class Root extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <Route path="/admin" component={AdminPage}/>
                <Route path="/auth" component={AuthPage}/>
            </div>
        )
    }
}

export default Root