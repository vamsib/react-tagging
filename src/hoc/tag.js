import React, { Component } from 'react';
import { withHandlers, lifecycle } from 'recompose';

export function tagActions(actions) {

  function wrapAction(taggedActions, action) {
    taggedActions[action] = props => function() {
      actions[action].apply(null, [ props, ...arguments ]);
      props[action].apply(null, arguments);
    }
    return taggedActions;
  }

  return withHandlers((props) => {
    return Object.keys(actions).reduce(wrapAction, {});
  });

}

export function tagView(viewTracker) {
  return lifecycle({
    componentDidMount: viewTracker
  });
}
