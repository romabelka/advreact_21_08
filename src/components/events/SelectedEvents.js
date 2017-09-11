import React, { Component } from 'react'
import {selectedEventsSelector} from '../../ducks/events'
import {connect} from 'react-redux'
import SelectedEventCard from './SelectedEventCard'
import {TransitionMotion, spring} from 'react-motion'

class SelectedEvents extends Component {
    static propTypes = {

    };

    render() {
        return <TransitionMotion
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}
        >
            {(interpolated) => <div>
                {
                    interpolated.map(config => <div style = {config.style} key = {config.key}>
                        <SelectedEventCard event = {config.data}/>
                    </div>)
                }
                </div>
            }
        </TransitionMotion>
    }

    willLeave = () => ({
        opacity: spring(0, {stiffness: 100})
    })

    willEnter = () => ({
        opacity: 0
    })

    getStyles() {
        return this.props.events.map(event => ({
            style: {
                opacity: spring(1, {stiffness: 50})
            },
            key: event.uid,
            data: event
        }))
    }
}

export default connect(state => ({
    events: selectedEventsSelector(state)
}))(SelectedEvents)