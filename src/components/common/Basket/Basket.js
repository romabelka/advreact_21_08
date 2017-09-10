import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Basket extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div style={{width:'200px',height:'100px    ',backgroundColor:'#a68585'}}>
                Drag event here to delete!
            </div>
        )
    }
}

export default Basket