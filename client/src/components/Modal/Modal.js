import React, { Component } from 'react'

export default class Modal extends Component {
  render() {
    return (
        <div>
            {this.props.children}
        </div>
    )
  }
}
