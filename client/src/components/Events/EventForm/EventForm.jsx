import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './EventForm.module.sass';
import validationSchems from '../../../utils/validators/validationSchems';

const EventForm = ({ onAdd }) => (
  <Formik
    initialValues={{ name: '', date: '', remindAt: '' }}
    validationSchema={validationSchems.EventFormSchema}
    onSubmit={(values, { resetForm }) => {
      onAdd({ ...values, id: Date.now() });
      resetForm();
    }}
  >
    {({ isSubmitting }) => (
      <Form className={styles.form} autoComplete='off'>
        <label className={styles.label}>
          <span className={styles.labelText}>Event name</span>
          <Field
            name='name'
            type='text'
            className={styles.input}
            autoComplete='off'
          />
          <ErrorMessage name='name' component='div' className={styles.error} />
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>Date and time</span>
          <Field
            name='date'
            type='datetime-local'
            className={styles.input}
            autoComplete='off'
          />
          <ErrorMessage name='date' component='div' className={styles.error} />
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>Reminder date and time</span>
          <Field
            name='remindAt'
            type='datetime-local'
            className={styles.input}
            autoComplete='off'
          />
          <ErrorMessage
            name='remindAt'
            component='div'
            className={styles.error}
          />
        </label>
        <button
          type='submit'
          disabled={isSubmitting}
          className={styles.submitBtn}
        >
          Add event
        </button>
      </Form>
    )}
  </Formik>
);

export default EventForm;
