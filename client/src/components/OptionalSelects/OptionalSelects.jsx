import React, { useEffect } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import CONSTANTS from '../../constants';
import SelectInput from '../SelectInput/SelectInput';
import FormInput from '../FormInput/FormInput';
import styles from '../ContestForm/ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';
import ButtonGroupOptions from '../ButtonGroup/ButtonGroupOptions';
import ButtonGroup from '../ButtonGroup/ButtonGroup';

const OptionalSelects = props => {
  const { values, setFieldValue } = useFormikContext();
  useEffect(() => {
    if (
      props.contestType === CONSTANTS.NAME_CONTEST &&
      !values.domainPreference
    ) {
      const recommendedOption = ButtonGroupOptions.find(opt => opt.recommended);
      if (recommendedOption) {
        setFieldValue('domainPreference', recommendedOption.value);
      }
    }
  }, [props.contestType, values.domainPreference, setFieldValue]);

  if (props.isFetching) {
    return <Spinner />;
  }
  switch (props.contestType) {
    case CONSTANTS.NAME_CONTEST: {
      return (
        <>
          <SelectInput
            name='typeOfName'
            header='type of company'
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={props.dataForContest.data.typeOfName}
          />
          <SelectInput
            name='styleName'
            header='Style name'
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={props.dataForContest.data.nameStyle}
          />
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              Do you want a matching domain (.com URL) with your name?
            </span>
            <Field name='domainPreference'>
              {({ field, form }) => (
                <ButtonGroup
                  value={field.value}
                  onChange={val => form.setFieldValue('domainPreference', val)}
                  error={
                    form.touched.domainPreference &&
                    form.errors.domainPreference
                  }
                />
              )}
            </Field>
            <div className={styles.briefNote}>
              If you want a matching domain, our platform will only accept those
              name suggestions where the domain is available.
            </div>
            <ErrorMessage
              name='domainPreference'
              component='div'
              className={styles.warning}
            />
          </div>
        </>
      );
    }
    case CONSTANTS.LOGO_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name='nameVenture'
              type='text'
              label='name of venture'
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name='brandStyle'
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header='Brand Style'
            optionsArray={props.dataForContest.data.brandStyle}
          />
        </>
      );
    }
    case CONSTANTS.TAGLINE_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name='nameVenture'
              type='text'
              label='name of venture'
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name='typeOfTagline'
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header='Type tagline'
            optionsArray={props.dataForContest.data.typeOfTagline}
          />
        </>
      );
    }
  }
};

export default OptionalSelects;
