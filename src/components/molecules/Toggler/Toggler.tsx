import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FunctionComponent } from 'react';

import styles from './Toggler.module.scss';

interface TogglerProps {
  value: boolean | null;
  disabled: boolean;
  className?: string;
  acceptText?: string;
  declineText?: string;
  onToggle: (value: boolean) => void;
}

export const Toggler: FunctionComponent<TogglerProps> = ({
  declineText,
  acceptText,
  className,
  disabled,
  onToggle,
  value,
}) => {
  const handleAccept = () => {
    onToggle(true);
  };
  const handleDecline = () => {
    onToggle(false);
  };

  return (
    <div className={className}>
      <button
        onClick={handleAccept}
        className={classNames(styles.button, { [styles.active]: value })}
        disabled={disabled}
      >
        {acceptText}
      </button>
      <button
        onClick={handleDecline}
        className={classNames(styles.button, {
          [styles.active]: value === false,
        })}
        disabled={disabled}
      >
        {declineText}
      </button>
    </div>
  );
};

Toggler.defaultProps = {
  acceptText: 'Yes',
  declineText: 'No',
};

Toggler.propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
  acceptText: PropTypes.string,
  declineText: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
};
