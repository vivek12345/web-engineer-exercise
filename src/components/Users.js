import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, DummyCard } from './Card';
import { Pagination } from './Pagination';
import { utils } from '../helpers';
import { ERROR_MESSAGES } from '../constants';
import { Alert } from './Alert';

const renderDummyCards = () => {
  return [1, 2, 3, 4, 5, 6, 7].map(item => {
    return <DummyCard key={item} className="mb-5 w-4/5 xl:w-4/12" />;
  });
};

const renderCards = items => {
  return items.map(({ id, name, email, avatar }) => {
    return (
      <li key={id} className="user mb-5 w-4/5 xl:w-4/12">
        <Card>
          <Card.Meta
            avatar={{
              src: avatar,
              alt: name
            }}
            title={`${name}`}
          >
            <p className="text-sm leading-tight text-gray-600">
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          </Card.Meta>
        </Card>
      </li>
    );
  });
};

const Users = ({ error, requesting, items, fetchUsers, appId }) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    async function fetchFirstPageUsers() {
      await utils.to(
        fetchUsers({
          limit: 25,
          offset: offset
        })
      );
    }
    fetchFirstPageUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId, offset]);

  const handlePagination = async (limit, offset) => {
    setOffset(offset);
  };

  return (
    <div className="users-container mt-32">
      {error ? (
        <Alert appearance={'error'} className="max-w-sm mx-auto mb-5">
          <span>{ERROR_MESSAGES.GENERIC_ERROR}</span>
        </Alert>
      ) : null}
      <div className="flex max-w-sm mx-auto justify-center items-center mb-5">
        <Pagination
          onPageChanged={handlePagination}
          offset={offset}
          items={items}
        />
      </div>

      <div className="flex flex-wrap justify-around">
        {requesting ? (
          renderDummyCards()
        ) : items.length === 0 ? (
          <Alert appearance={'info'} className="max-w-sm mx-auto mb-5">
            <span>{'Reached the end of user list. No new users found'}</span>
          </Alert>
        ) : (
          <ul id="users" className="flex flex-wrap justify-around">
            {renderCards(items)}
          </ul>
        )}
      </div>

      <div className="flex max-w-sm mx-auto justify-center items-center mb-5 mt-5">
        <Pagination
          onPageChanged={handlePagination}
          offset={offset}
          items={items}
        />
      </div>
    </div>
  );
};

Users.propTypes = {
  error: PropTypes.bool,
  requesting: PropTypes.bool,
  items: PropTypes.array,
  fetchUsers: PropTypes.func.isRequired,
  appId: PropTypes.string.isRequired
};

Users.defaultProps = {
  error: false,
  requesting: false,
  items: []
};

export default Users;
