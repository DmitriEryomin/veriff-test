import { FormValues } from 'typings';

export function isDisabled(values: FormValues, ind: number): boolean {
  const valuesArr = Object.values(values);

  if (ind === 0) {
    return false;
  }

  if (!!valuesArr[ind - 1]) {
    return false;
  }

  return true;
}
