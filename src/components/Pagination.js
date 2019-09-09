import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Pagination = props => {
  const { limit, onPageChanged, offset, items } = props;
  const isPrevBtnDisabled = offset <= 0;
  const isNextBtnDisabled = items.length < limit;

  const onClick = type => {
    if (isPrevBtnDisabled && type === 'prev') return false;
    if (isNextBtnDisabled && type === 'next') return false;
    let newOffset = type === 'prev' ? offset - limit : offset + limit;
    onPageChanged(limit, newOffset);
  };
  const paginationItemStyleClasses = cx(
    'block cursor-pointer hover:text-white hover:bg-blue-600 text-blue-600 border-r border-grey-light px-3 py-2'
  );

  let prevBtnClassName = `${paginationItemStyleClasses}`;
  let nextBtnClassName = `${paginationItemStyleClasses}`;

  if (isPrevBtnDisabled) {
    prevBtnClassName = `${prevBtnClassName} previous opacity-50 cursor-not-allowed disabled`;
  }

  if (isNextBtnDisabled) {
    nextBtnClassName = `${nextBtnClassName} next opacity-50 cursor-not-allowed disabled`;
  }

  return (
    <ul className="nav flex list-reset border border-grey-light rounded overflow-hidden">
      <li onClick={() => onClick('prev')}>
        <span className={prevBtnClassName}>Previous</span>
      </li>
      <li onClick={() => onClick('next')}>
        <span className={nextBtnClassName}>Next</span>
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  offset: PropTypes.number,
  limit: PropTypes.number,
  items: PropTypes.array,
  onPageChanged: PropTypes.func
};
Pagination.defaultProps = {
  offset: 0,
  limit: 25,
  items: [],
  onPageChanged: () => {}
};

export { Pagination };
