import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Card = props => {
  const { children, className, ...rest } = props;

  const styles = cx(
    'max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden',
    className
  );
  return (
    <div className={styles} {...rest}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  rest: PropTypes.object,
  className: PropTypes.string
};

const CardMeta = props => {
  const { avatar, title, subTitle, children, ...rest } = props;
  return (
    <div className="sm:flex sm:items-center px-6 py-4" {...rest}>
      {avatar ? (
        <div className="relative w-16 mx-auto sm:mx-0 sm:w-24 pb-16 sm:pb-24">
          <img
            className="absolute h-full w-full object-cover rounded-full"
            src={avatar.src}
            alt={avatar.alt}
          />
        </div>
      ) : null}
      {title || subTitle ? (
        <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          {title ? <p className="text-xl leading-tight">{title}</p> : null}
          {subTitle ? (
            <p className="text-sm leading-tight text-gray-600">{subTitle}</p>
          ) : null}
          {children}
        </div>
      ) : null}
    </div>
  );
};

CardMeta.propTypes = {
  avatar: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  rest: PropTypes.object
};

Card.Meta = CardMeta;

export { Card };
