import React, { useContext } from 'react';
import { FormContext } from './Form';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Input = props => {
  const {
    name,
    id,
    className,
    placeholder,
    type = 'text',
    label,
    required,
    hidden,
    ...rest
  } = props;

  const {
    values,
    errors,
    touched,
    actions: { handleChange }
  } = useContext(FormContext);

  const hasError = errors[name] && touched[name];
  const error = errors[name];
  const value = values[name];

  const [state, setState] = React.useState(value || '');

  const onChange = e => {
    e.preventDefault();
    e.stopPropagation();
    const name = e && e.currentTarget && e.currentTarget.name;
    const value = e && e.currentTarget && e.currentTarget.value;
    setState(value);
    handleChange(name, value);
  };

  const styleClass = cx(
    className,
    'text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none h-10',
    {
      'border border-red-500': hasError,
      'focus:shadow-outline': !hasError,
      'hidden-field': hidden
    }
  );

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-semibold mb-2"
        htmlFor={id}
      >
        {required ? <span className="text-red-600">*</span> : null}
        {label}
      </label>
      <input
        className={styleClass}
        type={type}
        value={state}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        aria-required={required}
        {...rest}
      />
      {hasError ? <span className="text-red-600 mt-6">{error}</span> : null}
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  hidden: PropTypes.bool
};
Input.defaultProps = {
  className: '',
  placeholder: '',
  type: 'text',
  label: '',
  required: false,
  hidden: false
};

export { Input };
