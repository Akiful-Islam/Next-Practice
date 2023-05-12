import React from "react";

type Props = {
  type?: "filled" | "transparent";
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  type = "filled",
  children,
  className,
  style,
  onClick,
}) => {
  let classes = "btn ";
  type === "filled"
    ? (classes += "btn-filled")
    : (classes += "btn-transparent");
  if (className) {
    classes += " " + className;
  }
  return (
    <button className={classes} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
