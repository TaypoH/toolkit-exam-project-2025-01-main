import React from 'react';
import { Field } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  return (
    <Field name={rest.name}>
      {props => {
        const { form } = props;

        const getFileName = () => {
          const file = form.values[rest.name];
          if (file) {
            return file.name;
          }
          return '';
        };

        return (
          <div className={fileUploadContainer}>
            <label htmlFor='fileInput' className={labelClass}>
              Choose file
            </label>
            <span id='fileNameContainer' className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              className={fileInput}
              id='fileInput'
              type='file'
              name={rest.name}
              onChange={event => {
                form.setFieldValue(rest.name, event.currentTarget.files[0]);
              }}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
