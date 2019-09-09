import React, { useCallback } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { Loader } from './Loader';

const appearances = {
  primary: 'bg-gray-800 hover:bg-grey-900 text-white',
  secondary: 'bg-indigo-600 hover:bg-blue-dark text-white',
  transparent:
    'bg-transparent hover:bg-blue-500 hover:text-white text-blue-700 border border-blue-500 hover:border-transparent'
};

const sizes = {
  xs: 'py-1 px-4 w-16 h-8 text-xs',
  sm: 'py-1 px-4 w-32 h-8 text-sm',
  md: 'py-2 px-4 w-48 h-10 text-md',
  lg: 'py-2 px-4 w-64 h-12 text-lg'
};

const Button = props => {
  const {
    appearance,
    size,
    full,
    type,
    className,
    onClick,
    children,
    disabled,
    loading,
    ...rest
  } = props;

  const isDisabled = disabled || loading;

  const commonStyles = 'rounded focus:outline-none focus:shadow-outline';

  const getStylesOnAppearance = useCallback(() => {
    return appearances[appearance];
  }, [appearance]);

  const getStylesOnSizes = useCallback(() => {
    return sizes[size];
  }, [size]);

  const styleClassNames = cx(
    className,
    commonStyles,
    getStylesOnAppearance(),
    getStylesOnSizes(),
    {
      'w-full': full,
      'opacity-50 cursor-not-allowed': isDisabled
    }
  );

  return (
    <button
      className={styleClassNames}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

Button.propTypes = {
  appearance: PropTypes.oneOf(['primary', 'secondary', 'transparent']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  full: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  rest: PropTypes.object
};

Button.defaultProps = {
  appearance: 'primary',
  size: 'md',
  full: false,
  type: 'button',
  className: '',
  onClick: () => {},
  children: [],
  disabled: false,
  loading: false
};

export { Button };
