import { useFormik } from 'formik';
import { FunctionComponent, useState } from 'react';

import {
  formValidator,
  initialValuesMapper,
  isDisabled,
  resultValuesMapper,
} from 'services/form';
import { submitCheckResults } from 'services/api';
import { useArrows, useToggle } from 'hooks';
import { Check, FormValues } from 'typings';
import { Button } from 'components/atoms';
import { ArrowKeys } from 'enums';

import { ToggleFormItem } from '../../molecules';

import styles from './VerificationForm.module.scss';

interface VerificationFormProps {
  formGroup: Check[];
}

export const VerificationForm: FunctionComponent<VerificationFormProps> = ({
  formGroup,
}) => {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeForm, setActiveForm] = useState(formGroup[0]);

  const form = useFormik({
    initialValues: initialValuesMapper(formGroup),
    validate: formValidator,
    validateOnMount: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      setFeedback('');
      try {
        await submitCheckResults(resultValuesMapper(values));
        setFeedback('Your application successfully submitted 🥳');
      } catch (error) {
        setFeedback('Unable to submit the application 😞');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleToggle = (id: string, value: boolean) => {
    if (!value) {
      handleDeclineSelect(id);
      return;
    }
    form.setFieldValue(id, value);
  };

  const handleToggleClick = (id: string, value: boolean) => {
    handleToggle(id, value);
    const newActiveFormInd = formGroup.findIndex((form) => form.id === id);
    setActiveForm(formGroup[newActiveFormInd]);
  };

  const handleDeclineSelect = (id: string) => {
    const currentValues = { ...form.values, [id]: false };
    const newValues: FormValues = initialValuesMapper(formGroup);

    for (const [key, value] of Object.entries(currentValues)) {
      newValues[key] = value;
      if (value === false) {
        break;
      }
    }
    form.setValues(newValues);
  };

  const handleArrows = (key: ArrowKeys) => {
    const activeFormInd = formGroup.findIndex(
      (form) => form.id === activeForm.id
    );

    if (key === ArrowKeys.UP && activeFormInd === 0) {
      return;
    }

    if (key === ArrowKeys.DOWN && activeFormInd === formGroup.length - 1) {
      return;
    }

    const { value } = form.getFieldProps(activeForm.id);

    if (!value && key === ArrowKeys.DOWN) {
      return;
    }
    const newActiveFormInd =
      key === ArrowKeys.DOWN ? activeFormInd + 1 : activeFormInd - 1;
    setActiveForm(formGroup[newActiveFormInd]);
  };

  useToggle(handleToggle, activeForm, form.values);
  useArrows(handleArrows, activeForm, form.values);

  return (
    <>
      {feedback && <h2>{feedback}</h2>}
      {formGroup.map(({ id, description }, ind) => (
        <ToggleFormItem
          key={id}
          id={id}
          isActive={id === activeForm.id}
          onToggleClick={handleToggleClick}
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
