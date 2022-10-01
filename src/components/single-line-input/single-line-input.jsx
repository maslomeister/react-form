import React from "react";

import styles from "./single-line-input.module.css";

export class SingleLineInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
  }

  render() {
    return (
      <div className={styles["input-container"]}>
        <label className={styles.label}>{this.props.label}</label>
        <input
          className={styles.input}
          type={this.props.type}
          placeholder={this.props.placeholder}
          ref={this.textInput}
          name={this.props.name}
          pattern={this.props.pattern}
          required
        />
      </div>
    );
  }
}
