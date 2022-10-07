import React from "react";
import { useNavigate } from "react-router-dom";

import { Field } from "./components/field/field";
import { TitleWithNavigation } from "../../components/title-with-navigation/title-with-navigation";
import { Button } from "../../components/button/button";

import styles from "./profile.module.css";

interface Props {
  formResult: FormFields;
}

export const Profile = ({ formResult }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {formResult.formComplete ? (
        <div className={styles.form}>
          <TitleWithNavigation leftButton="back" title={`Анкета: ${formResult.name} ${formResult.surname}`} />
          <Field label="Дата рождения" value={formResult.birthday} />
          <Field label="Телефон" value={formResult.phoneNumber} />
          <Field label="Сайт" value={formResult.url} />
          <Field label="О себе" value={formResult.about} />
          <Field label="Стек технологий" value={formResult.stack} />
          <Field label="Описание последнего проекта" value={formResult.description} />
        </div>
      ) : (
        <div className={styles.form}>
          <TitleWithNavigation leftButton="back" title="Данные не найдены" />
          <Button height={48} width={300} onClick={() => navigate("/form", { replace: true })}>
            Заполнить анкету
          </Button>
        </div>
      )}
    </>
  );
};
