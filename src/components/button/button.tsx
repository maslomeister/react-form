import React, { useMemo } from "react";

import styles from "./button.module.css";
interface Props {
  children: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "fill" | "outline";
  height?: number;
  width?: number;
  onClick?: () => void;
}

export const Button = ({ children, type = "button", className, variant = "fill", height, width, onClick }: Props) => {
  const buttonVariant = useMemo(() => {
    switch (variant) {
      case "fill":
        return styles.fill;
      case "outline":
        return styles.outline;
      default:
        return styles.fill;
    }
  }, [variant]);

  return (
    <div style={{ height: `${height ? height + "px" : "inherit"}`, width: `${width ? width + "px" : "inherit"}` }}>
      <button type={type} className={`${styles.button} ${buttonVariant} ${className ?? ""}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
