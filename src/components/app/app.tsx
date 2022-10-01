import React from "react";

import { Form } from "../form/form";

import styles from "./app.module.css";

export const App = () => {
  return (
    <div className={styles.app}>
      <Form />
    </div>
  );
};
