import { useEffect, useRef } from 'react';

import { Check, FormValues } from 'typings';
import { ButtonKeys } from 'enums';

export function useToggle(
  handleToggle: (id: string, value: boolean) => void,
  activeForm: Check,
  values: FormValues
) {
  const handlerRef = useRef<any>();

  const handler = ({ key }: { key: string }) => {
    switch (key) {
      case ButtonKeys.ACCEPT:
        handleToggle(activeForm.id, true);
        break;
      case ButtonKeys.DECLINE:
        handleToggle(activeForm.id, false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (handlerRef.current) {
      document.removeEventListener('keydown', handlerRef.current);
    }

    handlerRef.current = handler;
    document.addEventListener('keydown', handlerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, activeForm]);
}
