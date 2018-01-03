import React, { Component } from 'react';
import { withHandlers } from 'recompose';

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
