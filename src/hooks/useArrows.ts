import { useEffect, useRef } from 'react';

import { FormValues, Check } from 'typings';
import { ArrowKeys } from 'enums';

export function useArrows(
  handleArrow: (key: ArrowKeys) => void,
  activeForm: Check,
  values: FormValues
) {
  const handlerRef = useRef<any>();

  const handler = ({ key }: any) => {
    switch (key) {
      case 'ArrowDown':
      case 'ArrowUp':
        handleArrow(key);
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
