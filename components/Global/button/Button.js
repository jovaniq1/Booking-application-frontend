import { Icon } from 'semantic-ui-react';
import styles from './Button.module.css';

export const BlueButton = ({ onClick, title, disabled, icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        disabled
          ? `${styles.disableButtonTheme} `
          : `rounded-md dark:bg-slate-200 dark:text-slate-200  opacity-3 sm:py-1 sm:px-3  shadow-lg hover:shadow-blue-800/50 hover:scale-105 bg-blue-800 before:bg-inherit bg-gradient-to-r from-blue-900 to-blue-800   border-0 text-center transition-all touch-auto text-slate-100 cursor-pointer inline-block font-normal font-sans text-sm px-3 py-2`
      }
      role="button"
    >
      {title}
      {icon && <Icon className="flex pl-2" name={icon} />}
    </button>
  );
};
export const WhiteButton = ({ onClick, title, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={disabled && `${styles.disableButtonTheme}`}
      role="button"
    >
      {title}
    </button>
  );
};
export const RedButton = ({ onClick, title, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        disabled ? `${styles.disableButtonTheme}` : `${styles.redButtonTheme}`
      }
      role="button"
    >
      {title}
    </button>
  );
};
export const GreenButton = ({ onClick, title, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        disabled
          ? ` ${styles.disableButtonTheme}`
          : `${styles.greenButtonTheme}`
      }
      role="button"
    >
      {title}
    </button>
  );
};
