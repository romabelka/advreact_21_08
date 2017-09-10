import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class TableEventCard extends Component {
    static propTypes = {};

    render() {
        console.log('TableEventCard',this.props);
        const {uid, title, where, month} = this.props.event;
        return (
                <div style={{border:'1px solid black'}} key={uid} onClick={()=>console.log('onClick')} className="test--event-list__row" >
                    <span>{title}</span>
                    <span>{where}</span>
                    <span>{month}</span>
                </div>
        )
    }
}
export default TableEventCard