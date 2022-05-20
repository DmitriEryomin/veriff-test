import { useFormik } from 'formik';
import { FunctionComponent, useEffect, useState } from 'react';

import {
  formValidator,
  initialValuesMapper,
  isDisabled,
  resultValuesMapper,
} from 'services/form';
import { submitCheckResults } from 'services/api';
import { Check, FormValues } from 'typings';
import { Button } from 'components/atoms';

import { ToggleFormItem } from '../../molecules';

import styles from './VerificationForm.module.scss';

interface VerificationFormProps {
  formGroup: Check[];
}

export const VerificationForm: FunctionComponent<VerificationFormProps> = ({
  formGroup,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeForm, setActiveForm] = useState(formGroup[0]);

  const form = useFormik({
    initialValues: initialValuesMapper(formGroup),
    validate: formValidator,
    validateOnMount: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await submitCheckResults(resultValuesMapper(values));
        console.log(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleToggle = (id: string, value: boolean) => {
    if (!value) {
      const newValues: FormValues = { ...form.values, [id]: value };
      handleDeclineSelect(newValues);
      return;
    }

    form.setFieldValue(id, value);
  };

  const handleDeclineSelect = (values: FormValues) => {
    const newValues: FormValues = initialValuesMapper(formGroup);

    for (const [key, value] of Object.entries(values)) {
      newValues[key] = value;
      if (value === false) {
        break;
      }
    }
    form.setValues(newValues);
  };

  const handleArrowPress = (key: 'ArrowDown' | 'ArrowUp') => {
    console.log(key);
  };

  useEffect(() => {
    document.addEventListener('keydown', ({ key }) => {
      switch (key) {
        case '1':
          form.setFieldValue(activeForm.id, true);
          break;
        case '2':
          form.setFieldValue(activeForm.id, false);
          break;
        case 'ArrowDown':
        case 'ArrowUp':
          handleArrowPress(key);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <>
      {formGroup.map(({ id, description }, ind) => (
        <ToggleFormItem
          key={id}
          id={id}
          isActive={id === activeForm.id}
          onToggle={handleToggle}
          description={description}
          value={form.values[id]}
          disabled={isDisabled(form.values, ind)}
        />
      ))}
      <Button
        className={styles.submitButton}
        disabled={!form.isValid || isLoading}
        onClick={form.submitForm}
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
    </>
  );
};
