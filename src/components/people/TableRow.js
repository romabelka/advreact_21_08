import React, {Component} from 'react'
import {defaultTableRowRenderer} from 'react-virtualized'
import {TransitionMotion, spring} from 'react-motion'
import {connect} from 'react-redux'

import {peopleListSelector} from '../../ducks/people'

class TableRow extends Component {
  willEnter = () => ({
    opacity: 0,
    borderWidth: 0,
  })


  getStyles() {
    return this.props.people.map(person => ({
      style: {
        opacity: spring(1, {stiffness: 20}),
        borderWidth: spring(15),
      },
      key: person.uid
    }))
  }

  render() {
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
      >

        {(interpolated) => <div>
          {
            interpolated.map(config => <div style={config.style} key={config.key}>

              {defaultTableRowRenderer(this.props)}

            </div>)
          }
        </div>
        }


      </TransitionMotion>
    )
  }
}

export default connect(state => ({
  people: peopleListSelector(state)
}))(TableRow)


