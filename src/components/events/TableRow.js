import React, { Component } from 'react'
import {DragSource} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import {defaultTableRowRenderer} from 'react-virtualized'

class TableRow extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.connectPreview(getEmptyImage())
    }

    render() {
        const {connectDragSource, ...rest} = this.props
        return connectDragSource(defaultTableRowRenderer(rest))
    }
}

const spec = {
    beginDrag(props) {
        return {
            uid: props.rowData.uid
        }
    }
}

const collect = (connect) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview()
})

export default DragSource('event', spec, collect)(TableRow)