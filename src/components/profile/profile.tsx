import React from "react";

import { Field } from "./components/field/field";

import styles from "./profile.module.css";

type Props = {
  formResult: FormFields;
};

export const Profile = ({ formResult }: Props) => {
  return (
    <div className={styles.form}>
      <h1 className={styles.title}>
        Анкета: {formResult.name} {formResult.surname}
      </h1>
      <Field label="Дата рождения" value={formResult.birthday} />
      <Field label="Телефон" value={formResult.phoneNumber} />
      <Field label="Сайт" value={formResult.url} />
      <Field label="О себе" value={formResult.about} />
      <Field label="Стек технологий" value={formResult.stack} />
      <Field label="Описание последнего проекта" value={formResult.description} />
    </div>
  );
};
