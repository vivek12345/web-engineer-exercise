import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const appearances = {
  success: 'bg-teal-100 border-teal-500 rounded-b text-teal-900',
  error: 'bg-red-100 border border-red-400 text-red-700',
  info: 'bg-blue-100 border border-blue-500 text-blue-700',
  warning: 'bg-orange-100 border border-orange-500 text-orange-700'
};

const Alert = props => {
  const { appearance, children, className, full, ...rest } = props;

  const getStylesOnTypes = useCallback(() => {
    return appearances[appearance];
  }, [appearance]);

  const styleClassNames = cx(
    'px-4 py-3 rounded relative',
    getStylesOnTypes(appearance),
    {
      'w-full': full
    },
    className
  );
  return (
    <div className={styleClassNames} role="alert" {...rest}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  appearance: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  full: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  rest: PropTypes.object
};

Alert.defaultProps = {
  appearance: 'info',
  full: false,
  className: '',
  children: []
};

export { Alert };
