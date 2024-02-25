import { useState } from 'react';
import styles from './AppCheckbox.module.scss';
import { AppIconSprite } from './Icon_sprite/AppIconSprite';

interface AppCheckboxProps {
  isChecked: boolean
  onChecked: (checked: boolean) => void
  label?: string
  position?: 'left' | 'right'
}

export function AppCheckbox({
    label,
    isChecked = false,
    position = 'left',
    onChecked,
  }: AppCheckboxProps) {
  const [checked, setChecked] = useState(isChecked ?? false);
  const checkboxHandler = () => {
    const checking = !checked;
    setChecked(checking);
    onChecked(checking);
  };

  return (
    <div className={styles.checkbox} onClick={checkboxHandler}>
      {(position === 'left') ? <span>{label}</span> : <></>}
      <AppIconSprite name={`checkbox-${+checked}`} />
      {(position === 'right') ? <span>{label}</span> : <></>}
      <input type="checkbox" defaultChecked={checked} />
    </div>
  );
}
