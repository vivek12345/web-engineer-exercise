import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, DummyCard } from './Card';
import { Button } from './Button';
import { Alert } from './Alert';
import { Modal } from './Modal';
import { utils } from '../helpers';
import { AppsEdit } from './AppsEdit';
import { ERROR_MESSAGES } from '../constants';

const renderDummyCards = () => {
  return [1, 2, 3].map(item => {
    return <DummyCard key={item} className="mb-5 w-4/5" />;
  });
};

const Apps = ({ error, requesting, items, fetchApps }) => {
  const [showModal, toggleModal] = useState(false);
  const [selectedItem, selectEditableItem] = useState(null);

  const closeModal = () => {
    toggleModal(false);
  };

  const openModal = e => {
    e.preventDefault();
    e.stopPropagation();
    toggleModal(true);
  };

  const handleEditClick = (e, selectedItem) => {
    e.preventDefault();
    e.stopPropagation();
    selectEditableItem(selectedItem);
    openModal(e);
  };

  const handleEditSuccess = async () => {
    closeModal();
    await utils.to(fetchApps());
  };

  useEffect(() => {
    async function fetchMyApps() {
      await utils.to(fetchApps());
    }
    fetchMyApps();
  }, []);

  const renderCards = () => {
    return items.map(({ id, name, logo }) => {
      return (
        <li key={id} className="app mb-5 w-4/5">
          <Link to={`/apps/${id}`}>
            <Card>
              <Card.Meta
                avatar={{
                  src: logo,
                  alt: name
                }}
                title={name}
              >
                <div className="mt-4">
                  <Button
                    appearance="transparent"
                    size="xs"
                    onClick={e => handleEditClick(e, { id, name, logo })}
                    className="edit-app-btn"
                  >
                    Edit
                  </Button>
                </div>
              </Card.Meta>
            </Card>
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="apps-container flex flex-wrap justify-around mt-32">
      {error ? (
        <Alert appearance={'error'} className="max-w-sm mx-auto mb-5">
          <span>{ERROR_MESSAGES.GENERIC_ERROR}</span>
        </Alert>
      ) : null}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={'Edit App'}
        className="app-edit-container"
      >
        <AppsEdit
          selectedApp={selectedItem}
          handleSuccess={handleEditSuccess}
        />
      </Modal>
      <ul id="apps" className="list-none flex flex-wrap justify-around">
        {requesting ? renderDummyCards() : renderCards()}
      </ul>
    </div>
  );
};

Apps.propTypes = {
  error: PropTypes.bool,
  requesting: PropTypes.bool,
  items: PropTypes.array,
  fetchApps: PropTypes.func.isRequired
};

Apps.defaultProps = {
  error: false,
  requesting: false,
  items: []
};

export default Apps;
