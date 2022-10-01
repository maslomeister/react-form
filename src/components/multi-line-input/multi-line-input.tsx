import React, { useRef } from "react";

import styles from "./multi-line-input.module.css";

interface Props {
  type: string;
  placeholder: string;
  name: string;
  label: string;
}

export const MultiLineInput = ({ placeholder, name, label }: Props) => {
  const inputRef = useRef<null | HTMLTextAreaElement>(null);
  return (
    <div className={styles["input-container"]}>
      <label className={styles.label}>{label}</label>
      <textarea className={styles.input} placeholder={placeholder} ref={inputRef} cols={7} wrap="hard" name={name} required />
    </div>
  );
};
