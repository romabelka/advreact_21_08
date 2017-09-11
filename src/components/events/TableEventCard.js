import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {DragSource} from 'react-dnd'

class TableEventCard extends Component {
    static propTypes = {};

    render() {

        const {connectDragSource,isDragging, event: {uid, title, where, month}} = this.props;
        const dragStyle = {
            backgroundColor:isDragging?'gray':'white'
        }
        return this.props.connectDragSource(
                <div style={{border:'1px solid black',...dragStyle}} key={uid} onClick={()=>console.log('onClick')} className="test--event-list__row" >
                    <span>{title}</span>
                    <span>{where}</span>
                    <span>{month}</span>
                </div>
        )
    }
}

const spec = {
    beginDrag(props) {
        return {
            uid:props.event.uid
        }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})

export default DragSource('event', spec, collect)(TableEventCard)