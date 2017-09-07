import React, { Component } from 'react'
import {DragSource} from 'react-dnd'

class PersonCard extends Component {
    static propTypes = {

    };

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
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})

export default DragSource('person', spec, collect)(PersonCard)