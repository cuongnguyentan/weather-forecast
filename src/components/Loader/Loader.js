import React from 'react';
import { useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';

import './Loader.scss';

const DURATION = 300;

const defaultStyle = {
  transition: `opacity ${DURATION}ms ease-in-out`,
  opacity: 0,
  display: 'none',
};

const transitionStyles = {
  entering: { opacity: 0, display: 'block' },
  entered: { opacity: 1, display: 'block' },
  exiting: { opacity: 0, display: 'block' },
  exited: { opacity: 0, display: 'none' },
};

const Loader = () => {
  const isLoading = useSelector(state => state.loader.isLoading);

  return (
    <Transition in={isLoading} timeout={DURATION}>
      {state => (
        <div
          id="loader"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          <div className="spinner">
            <div className="rect1" />
            <div className="rect2" />
            <div className="rect3" />
            <div className="rect4" />
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Loader;
