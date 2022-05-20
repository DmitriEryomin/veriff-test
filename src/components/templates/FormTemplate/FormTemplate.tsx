import { useEffect, useState } from 'react';

import { VerificationForm } from 'components/organisms';
import { fetchChecks } from 'services/api';
import { Check } from 'typings';

import styles from './FormTemplate.module.scss';

export const FormTemplate = () => {
  const [checks, setChecks] = useState<Check[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchChecks();
        setChecks(data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : hasError ? (
    <h1>Error</h1>
  ) : (
    <div className={styles.container}>
      <VerificationForm formGroup={checks} />
    </div>
  );
};
