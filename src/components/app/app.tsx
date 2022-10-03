import React, { useState } from "react";

import { Form } from "../form/form";
import { Profile } from "../profile/profile";

import styles from "./app.module.css";

export const App = () => {
  const [formResult, setFormResult] = useState({} as Fields);
  const [profileCreated, setProfileCreated] = useState(false);

  const formResultHandler = (fields: Fields) => {
    setProfileCreated(true);
    setFormResult(fields);
  };
  return (
    <div className={styles.app}>
      {profileCreated ? <Profile formResult={formResult} /> : <Form setFormResult={formResultHandler} />}
    </div>
  );
};
