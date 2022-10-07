import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/button/button";

import styles from "./home.module.css";

interface Props {
  formResult: FormFields;
}

export const Home = ({ formResult }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Создание анкеты</h1>
      <Button height={48} width={180} onClick={() => navigate("/form")}>
        Заполнить
      </Button>
      <Button height={48} width={180} onClick={() => navigate("/profile")}>
        Посмотреть
      </Button>
    </div>
  );
};
