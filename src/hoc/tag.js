import React, { Component } from 'react';

export function tag(tagHandlers) {

  tagHandlers = tagHandlers || {}

  return function (WrappedComponent) {

    class WithTracking extends Component {

      constructor(props) {
        super(props)
      }

      render() {
        let trackingProps = {...this.props} 
        Object.keys(tagHandlers).map((key) => {
          if (this.props[key] && typeof this.props[key] === 'function') {
            trackingProps[key] = function() {
              tagHandlers[key].apply(null, [this.props, ...arguments])
              this.props[key].apply(null, arguments)
            }.bind(this)
          } 
          if (!this.props[key]) {
            trackingProps[key]  =  function() {
              tagHandlers[key].apply(null, [this.props, ...arguments])
            }.bind(this)
          }
        })
        return (<WrappedComponent {...trackingProps}/>)
      }

    }

    WithTracking.displayName = `withTracking(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

    return WithTracking
  }
}
