import React from "react";

import { Form } from "../form/form";

import styles from "./app.module.css";

export class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <Form />
      </div>
    );
  }
}
