import { FormValues, FormErrors } from 'typings';

export function formValidator(values: FormValues) {
  const errors: FormErrors = {};

  const hasFalsy = Object.values(values).some((value) => value === false);
  if (hasFalsy) {
    return errors;
  }

  const allSelected = Object.values(values).every((value) => value);
  if (allSelected) {
    return errors;
  }

  Object.keys(values).forEach((key) => {
    errors[key] = 'Required';
  });

  return errors;
}
