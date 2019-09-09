import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from './Form';
import { Button } from './Button';
import { utils } from '../helpers';
import { api } from '../helpers/ApiLibrary';
import { BACKEND_URL, ERROR_MESSAGES } from '../constants';

const AppsEdit = props => {
  const { selectedApp, handleSuccess } = props;
  const [error, toggleError] = useState(false);
  const [requesting, toggleRequesting] = useState(false);

  const handleUpdate = async values => {
    toggleRequesting(true);
    const url = `${BACKEND_URL}/apps/${selectedApp.id}`;

    const [err, response] = await utils.to(
      api.request(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json'
        },
        body: JSON.stringify(values)
      })
    );
    toggleRequesting(false);
    if (err) {
      toggleError(ERROR_MESSAGES.UPDATE_ERROR);
    } else {
      if (response) {
        if (!response.ok) toggleError(ERROR_MESSAGES.UPDATE_ERROR);
        handleSuccess();
      }
    }
  };
  return (
    <Form
      id="edit-app"
      onSubmit={handleUpdate}
      initialValues={{
        name: selectedApp && selectedApp.name,
        logo: selectedApp && selectedApp.logo
      }}
    >
      <div className="mb-4 mt-8">
        <Form.Input
          label="Name"
          name="name"
          id="name"
          type="text"
          placeholder="App Name"
          required={true}
        />
      </div>
      <div className="mb-4 mt-8">
        <Form.Input
          label="Logo"
          name="logo"
          id="logo"
          type="text"
          placeholder="Logo Image Url"
          required={true}
        />
      </div>
      <div className="mt-1">
        {error ? <span className="text-red-600">{error}</span> : null}
      </div>
      <div className="flex mt-12 flex-row-reverse">
        <Button
          type="submit"
          appearance="primary"
          size="sm"
          loading={requesting}
        >
          Update
        </Button>
      </div>
    </Form>
  );
};

AppsEdit.propTypes = {
  selectedApp: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  }),
  handleSuccess: PropTypes.func
};

AppsEdit.defaultProps = {
  handleSuccess: () => {}
};

export { AppsEdit };
