import React from "react";

import styles from "./multi-line-input.module.css";

interface Props {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  error: string;
}

export const MultiLineInput = ({ placeholder, name, label, onChange, value, error }: Props) => {
  return (
    <div className={styles["input-container"]}>
      <label className={styles.label}>{label}</label>
      <textarea className={styles.input} placeholder={placeholder} cols={7} name={name} onChange={onChange} />
      <label className={`${styles.counter} ${error ? styles.error : ""}`}>
        {error ? value.length + "/600 " + error : value.length + "/600"}
      </label>
    </div>
  );
};
