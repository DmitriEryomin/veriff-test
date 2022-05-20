import classNames from 'classnames';
import { FunctionComponent, ReactNode, ButtonHTMLAttributes } from 'react';

import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button className={classNames(styles.button, className)} {...rest}>
      {children}
    </button>
  );
};
