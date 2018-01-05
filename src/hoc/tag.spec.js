import React, { Component } from 'react';
import { tagActions, tagView } from './tag';
import { mount } from 'enzyme';

import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe('Tag HoC', function() {
  it('calls original action and tagged action when action is the event handler', function() {
      let TestComponent = (props) => (
        <a className="cta" onClick={props.onSomeAction}>click here</a>
      );
      let tagFn = jest.fn();
      let actionFn = jest.fn();
      let TaggedTestComponent = tagActions({
          onSomeAction: tagFn
      })(TestComponent);
      let wrapper = mount(
        <TaggedTestComponent onSomeAction={actionFn}/>);

      wrapper.find('.cta').simulate('click');

      expect(tagFn.mock.calls.length).toBe(1);
      expect(tagFn).toBeCalledWith({onSomeAction: actionFn},
        expect.anything());
      expect(actionFn.mock.calls.length).toBe(1);
      expect(actionFn).toBeCalledWith(expect.anything());
  });

  it('calls original action and tagged action when action is called from event handler', function() {
      let TestComponent = (props) => (
        <a className="cta" onClick={() => props.onSomeAction(1, 'a', {})}>click here</a>
      );
      let tagFn = jest.fn();
      let actionFn = jest.fn();
      let TaggedTestComponent = tagActions({
          onSomeAction: tagFn
      })(TestComponent);
      let wrapper = mount(
        <TaggedTestComponent onSomeAction={actionFn}/>);

      wrapper.find('.cta').simulate('click');

      expect(tagFn.mock.calls.length).toBe(1);
      expect(tagFn).toBeCalledWith({onSomeAction: actionFn},
        1, 'a', {});
      expect(actionFn.mock.calls.length).toBe(1);
      expect(actionFn).toBeCalledWith(1, 'a', {});
  });

  it('calls original action and tagged action when action is called from event handler with changed props', function() {
      let TestComponent = (props) => (
        <a className="cta" href={props.url} onClick={() => props.onSomeAction(1, 'a', {})}>click here</a>
      );
      let tagFn = jest.fn();
      let actionFn = jest.fn();
      let TaggedTestComponent = tagActions({
          onSomeAction: tagFn
      })(TestComponent);
      let wrapper = mount(
        <TaggedTestComponent url="https://google.com" onSomeAction={actionFn}/>);

      wrapper.find('.cta').simulate('click');

      expect(tagFn.mock.calls.length).toBe(1);
      expect(tagFn).toBeCalledWith({url: 'https://google.com', onSomeAction: actionFn}, 1, 'a', {});
      expect(actionFn.mock.calls.length).toBe(1);
      expect(actionFn).toBeCalledWith(1, 'a', {});

      wrapper.setProps({ url: 'https://yahoo.com' });
      wrapper.find('.cta').simulate('click');

      expect(tagFn).toHaveBeenLastCalledWith({url: 'https://yahoo.com', onSomeAction: actionFn}, 1, 'a', {});
  });

  it('calls origin componentDidMount after tracking component view', function() {
      let testFn = jest.fn();
      let TestComponent = class extends Component {
        constructor(props) {
          super(props);
          this.state = {
            foo: 'bar'
          }
        }

        componentDidMount() {
          testFn(this.state.foo);
        }

        render() {
          return (<div className='test'></div>);
        }
      };
      let tagFn = jest.fn();
      let TaggedTestComponent = tagView(tagFn)(TestComponent);
      let wrapper = mount(<TaggedTestComponent/>);
      expect(tagFn.mock.calls.length).toBe(1);
      expect(testFn.mock.calls.length).toBe(1);
      expect(testFn).toHaveBeenCalledWith('bar');
  });
});
