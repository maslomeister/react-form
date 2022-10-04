import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import styles from "./title-with-navigation.module.css";
interface Props {
  leftButton?: "back";
  title: string;
}

export const TitleWithNavigation = ({ leftButton, title }: Props) => {
  const navigate = useNavigate();

  const leftItem = useMemo(() => {
    switch (leftButton) {
      case "back":
        return <BiArrowBack className={styles.back} color="#eee" width={"46px"} onClick={() => navigate(-1)} />;
      default:
        return <></>;
    }
  }, [leftButton]);

  return (
    <div className={styles["title-container"]}>
      <div className={styles.left}>{leftItem}</div>
      <div className={styles.center}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.right}></div>
    </div>
  );
};
