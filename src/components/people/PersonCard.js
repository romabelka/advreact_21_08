import React, { Component } from 'react'
import {DragSource} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'

class PersonCard extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.connectPreview(getEmptyImage())
    }

    render() {
        const {person, style, connectDragSource, isDragging} = this.props
        const draggStyle = {
            backgroundColor: isDragging ? 'grey' : 'white'
        }
        return (
            <div style={{width: 200, height: 100, ...draggStyle, ...style}}>
                {connectDragSource(<h3>{person.firstName}&nbsp;{person.lastName}</h3>)}
                <p>{person.email}</p>
            </div>
        )
    }
}

const spec = {
    beginDrag(props) {
        return {
            uid: props.person.uid
        }
    },
    endDrag(props, monitor) {
        const personUid = props.person.uid
        const dropRes = monitor.getDropResult()
        const eventUid = dropRes && dropRes.eventUid

        console.log('---', 'endDrag', personUid, eventUid)
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})

export default DragSource('person', spec, collect)(PersonCard)