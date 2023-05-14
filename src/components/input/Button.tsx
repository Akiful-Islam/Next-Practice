import React from "react";

type Props = {
  variant?: "filled" | "transparent";
  type?: "button" | "submit" | "reset";
  title?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  variant = "filled",
  type,
  title,
  children,
  className,
  style,
  onClick,
}) => {
  let classes = "btn ";
  variant === "filled"
    ? (classes += "btn-filled")
    : (classes += "btn-transparent");
  if (className) {
    classes += " " + className;
  }
  return (
    <button className={classes} type={type} style={style} onClick={onClick}>
      {title}
      {children}
    </button>
  );
};

export default Button;
