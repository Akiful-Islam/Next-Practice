import React from "react";

type Props = {
  type?: "filled" | "transparent";
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Button: React.FC<Props> = ({
  type = "filled",
  children,
  className,
  style,
}) => {
  let classes: string;
  type === "filled" ? (classes = "btn-filled") : (classes = "btn-transparent");
  if (className) {
    classes += " " + className;
  }
  return (
    <button className={classes} style={style}>
      {children}
    </button>
  );
};

export default Button;
