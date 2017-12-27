import React, { Component } from 'react';
import { withHandlers } from 'recompose'

export function tag(tagHandlers) {

  return withHandlers((function (tagHandlers) {
    return (props) => {
      let handlers = {}
      Object.keys(tagHandlers).forEach(function(handlerName) {
        handlers[handlerName] = props => function() {
          tagHandlers[handlerName].apply(null, [ props, ...arguments ]);
          props[handlerName].apply(null, arguments);
        }
      })
      return handlers;
    };
  })(tagHandlers));

}
