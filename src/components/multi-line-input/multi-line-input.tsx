import React, { useMemo } from "react";

import styles from "./multi-line-input.module.css";

interface Props {
  type: string;
  placeholder?: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string;
}

export const MultiLineInput = ({ placeholder, name, label, value, onChange, error }: Props) => {
  const errorText = useMemo(() => (error ? value.length + "/600 " + error : value.length + "/600"), [value, error]);
  return (
    <div className={styles["input-container"]}>
      <label className={styles.label}>{label}</label>
      <textarea className={styles.input} placeholder={placeholder} cols={7} name={name} value={value} onChange={onChange} />
      <label className={`${styles.counter} ${error ? styles.error : ""}`}>{errorText}</label>
    </div>
  );
};
