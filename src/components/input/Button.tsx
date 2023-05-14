import React from "react";

type Props = {
  variant?: "filled" | "transparent";
  title?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  variant = "filled",
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
    <button className={classes} style={style} onClick={onClick}>
      {title}
      {children}
    </button>
  );
};

export default Button;
