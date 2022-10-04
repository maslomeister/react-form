import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Form } from "../../pages/form/form";
import { Home } from "../../pages/home/home";
import { Profile } from "../../pages/profile/profile";

import styles from "./app.module.css";

export const App = () => {
  const [formResult, setFormResult] = useState({} as FormFields);

  const formResultHandler = (fields: FormFields) => {
    setFormResult(fields);
  };

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Home formResult={formResult} />} />
        <Route path="/form" element={<Form setFormResult={formResultHandler} />} />
        <Route path="/profile" element={<Profile formResult={formResult} />} />
      </Routes>
    </div>
  );
};
