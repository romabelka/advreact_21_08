import React, { Component } from 'react'
import {selectedEventsSelector} from '../../ducks/events'
import {connect} from 'react-redux'
import SelectedEventCard from './SelectedEventCard'

class SelectedEvents extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                {this.props.events.map(event => <SelectedEventCard event = {event} key = {event.uid}/>)}
            </div>
        )
    }
}

export default connect(state => ({
    events: selectedEventsSelector(state)
}))(SelectedEvents)