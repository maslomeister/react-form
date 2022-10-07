import React, { HTMLInputTypeAttribute } from "react";

import styles from "./single-line-input.module.css";

interface Props {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  name: string;
  label: string;
  maxLength?: number;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error: string;
}

export const SingleLineInput = ({ type, placeholder, name, value, label, maxLength, onChange, onBlur, onFocus, error }: Props) => {
  return (
    <div className={styles["input-container"]}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${value.length > 0 ? styles.active : ""}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        name={name}
        maxLength={maxLength}
      />
      <label className={styles.error}>{error}</label>
    </div>
  );
};
