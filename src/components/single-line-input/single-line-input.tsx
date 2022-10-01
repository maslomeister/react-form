import React, { HTMLInputTypeAttribute, useRef } from "react";

import styles from "./single-line-input.module.css";

interface Props {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  name: string;
  label: string;
  pattern?: string;
}

export const SingleLineInput = ({ type, placeholder, name, label, pattern }: Props) => {
  const inputRef = useRef<null | HTMLInputElement>(null);

  return (
    <div className={styles["input-container"]}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} type={type} placeholder={placeholder} ref={inputRef} name={name} pattern={pattern} required />
    </div>
  );
};
