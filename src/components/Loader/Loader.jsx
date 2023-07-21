import { PropTypes } from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import { createPortal } from 'react-dom';

const loaderRoot = document.querySelector('#loader-root');

export const Loader = () => {
  const loaderParams = {
    color: '#142369',
    width: '100px',
    ariaLabel: 'three-dots-loading',
  };

  const loaderWrapperStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '110',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#6161613c',
    backdropFilter: 'blur(3px)',
  };

  return createPortal(
    <ThreeDots
      {...loaderParams}
      wrapperStyle={loaderWrapperStyle}
      visible={true}
    />,
    loaderRoot
  );
};

Loader.propTypes = {
  size: PropTypes.string,
};
