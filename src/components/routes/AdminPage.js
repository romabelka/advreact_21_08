import React, { Component } from 'react'
import PeopleList from '../people/PeopleList'

class AdminPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <PeopleList/>
            </div>
        )
    }
}

export default AdminPage