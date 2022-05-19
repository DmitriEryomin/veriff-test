import PropTypes from 'prop-types';
import { FunctionComponent, ReactNode } from 'react';

import styles from './FormTemplate.module.css';

interface FormTemplateProps {
  children: ReactNode;
}

export const FormTemplate: FunctionComponent<FormTemplateProps> = ({
  children,
}) => {
  return <div className={styles.container}>{children}</div>;
};

FormTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
