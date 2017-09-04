import React, { Component } from 'react'
import {connect} from 'react-redux'
import {moduleName, fetchAll} from '../../ducks/events'

class EventList extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAll()
    }

    render() {
        console.log('---', this.props.events)
        return (
            <div>

            </div>
        )
    }
}

export default connect(state => ({
    events: state[moduleName].entities
}), {fetchAll})(EventList)