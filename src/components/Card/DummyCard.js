import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './DummyCard.css';

const DummyCard = ({ className }) => {
  const containerStyles = cx(
    'max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden',
    className
  );
  const dummyContentTitleStyling = cx(
    'leading-tight w-full xl:w-3/5 h-2',
    'animated-background'
  );
  const dummyMetaStyling = cx(
    'leading-tight w-full xl:w-4/5 h-2 mt-2',
    'animated-background'
  );
  return (
    <div className={containerStyles}>
      <div className="sm:flex sm:items-center px-6 py-4">
        <div className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24 w-16 sm:w-24 rounded-full animated-background" />
        <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left w-full">
          <p className={dummyContentTitleStyling}></p>
          <p className={dummyMetaStyling}></p>
        </div>
      </div>
    </div>
  );
};

DummyCard.propTypes = {
  className: PropTypes.string
};

export { DummyCard };
