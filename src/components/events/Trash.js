import React, { Component } from 'react'
import {DropTarget} from 'react-dnd'
import {connect} from 'react-redux'
import {deleteEvent, stateSelector} from '../../ducks/events'
import Loader from '../common/Loader'
import {Motion, spring, presets} from 'react-motion'

class Trash extends Component {
    static propTypes = {

    };

    render() {
        const {connectDropTarget, isOver, loading} = this.props
        const style = {
            border: `1px solid ${isOver ? 'green' : 'black'}`,
            width: 100, height: 100,
            position: 'fixed',
            top: 0, right: 0
        }
        return <Motion
            defaultStyle={{opacity: 0}}
            style={{opacity: spring(1, {
                damping: presets.noWobble.damping * 4,
                stiffness: presets.noWobble.stiffness / 2
            })}}
        >
            {interpolatedStyle => connectDropTarget(
                <div style = {{...style, ...interpolatedStyle}}>
                    Trash
                    {loading && <Loader/>}
                </div>
            )}
        </Motion>
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
})

const spec = {
    drop(props, monitor) {
        const item = monitor.getItem()
        props.deleteEvent(item.uid)
    }
}

export default connect(state => ({
    loading: stateSelector(state).loading
}), { deleteEvent })(DropTarget('event', spec, collect)(Trash))