import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { Toggler } from '../Toggler/Toggler';

import styles from './ToggleFormItem.module.scss';

interface Props {
  description: string;
  id: string;
  disabled: boolean;
  isActive: boolean;
  value: boolean | null;
  onToggle: (key: string, value: boolean) => void;
}

export const ToggleFormItem: FunctionComponent<Props> = ({
  description,
  onToggle,
  disabled,
  isActive,
  value,
  id,
}) => {
  const handleToggle = (value: boolean) => {
    onToggle(id, value);
  };

  return (
    <div
      className={classNames(styles.item, {
        [styles.disabled]: disabled,
        [styles.active]: isActive,
      })}
    >
      <label>{description}</label>
      <Toggler disabled={disabled} value={value} onToggle={handleToggle} />
    </div>
  );
};

ToggleFormItem.propTypes = {
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.bool,
  description: PropTypes.string.isRequired,
};
