import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return <Fragment>{children}</Fragment>;
}

ScrollToTop.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.node
}

export default withRouter(ScrollToTop);
