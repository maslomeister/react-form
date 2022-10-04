import React from "react";

import styles from "./field.module.css";

interface Props {
  label: string;
  value: string;
}

export const Field = ({ label, value }: Props) => {
  return (
    <div className={styles.field}>
      <p className={styles.label}>
        {label}:<span className={styles.content}>{value}</span>
      </p>
    </div>
  );
};
