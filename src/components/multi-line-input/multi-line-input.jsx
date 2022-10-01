import React from "react";

import styles from "./multi-line-input.module.css";

export class MultiLineInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
  }

  render() {
    return (
      <div className={styles["input-container"]}>
        <label className={styles.label}>{this.props.label}</label>
        <textarea
          className={styles.input}
          type={this.props.type}
          placeholder={this.props.placeholder}
          ref={this.textInput}
          cols="7"
          wrap="hard"
          name={this.props.name}
          required
        />
      </div>
    );
  }
}
