import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';

const FormContext = React.createContext();

const Form = props => {
  const { initialValues, onSubmit, id, ...rest } = props;
  const [values, setValues] = useState(initialValues);
  // TO-DO handle client side validation errors
  /* eslint-disable no-unused-vars */
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const handleChange = async (name, value) => {
    setValues({ ...values, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(values);
  };

  return (
    <form id={id} onSubmit={handleSubmit} {...rest}>
      <FormContext.Provider
        value={{
          values,
          errors,
          touched,
          actions: {
            handleChange
          }
        }}
      >
        {props.children}
      </FormContext.Provider>
    </form>
  );
};

Form.Input = Input;

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  rest: PropTypes.object
};

export { Form };
export { FormContext };
