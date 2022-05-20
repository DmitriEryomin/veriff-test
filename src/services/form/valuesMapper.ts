import { Check, FormValues, FormRequestItem } from 'typings';

export function initialValuesMapper(formGroup: Check[]) {
  return formGroup.reduce((acc: FormValues, check) => {
    acc[check.id] = null;
    return acc;
  }, {});
}

export function resultValuesMapper(values: FormValues): FormRequestItem[] {
  return Object.entries(values).reduce(
    (acc: FormRequestItem[], [checkId, value]) => {
      if (value !== null) {
        acc.push({ checkId, result: value ? 'yes' : 'no' });
      }
      return acc;
    },
    []
  );
}
