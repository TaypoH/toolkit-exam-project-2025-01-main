import React from 'react';
import classNames from 'classnames';
import { IMaskInput } from 'react-imask';
import { useField } from 'formik';

const PayInput = props => {
  const { label, changeFocus, classes, isInputMask, mask, autocomplete } = props;
  const [field, meta, helpers] = useField(props.name);
  const { touched, error } = meta;

  if (field.name === 'sum') {
    return (
      <div className={classes.container}>
        <input
          {...field}
          value={field.value || ''}
          autoComplete={autocomplete}
          placeholder={label}
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
        />
        {touched && error && (
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }
  if (isInputMask) {
    return (
      <div className={classes.container}>
        <IMaskInput
          mask={mask}
          unmask={false}
          name={field.name}
          id={field.name}
          value={field.value || ''}
          autoComplete={autocomplete}
          placeholder={label}
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
          onFocus={() => changeFocus(field.name)}
          onAccept={(value) => {
            helpers.setValue(value);
          }}
          onBlur={field.onBlur}
        />
        {touched && error && (
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <input
        {...field}
        value={field.value || ''}
        autoComplete={autocomplete}
        placeholder={label}
        className={classNames(classes.input, {
          [classes.notValid]: touched && error,
        })}
        onFocus={() => changeFocus(field.name)}
      />
      {touched && error && (
        <span className={classes.error}>{error.message}!</span>
      )}
    </div>
  );
};

export default PayInput;
