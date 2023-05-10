import React from "react";

type Props = {
  type?: "filled" | "transparent";
  children?: React.ReactNode;
  className?: string;
};

const Button: React.FC<Props> = ({ type = "filled", children, className }) => {
  if (type === "filled") {
    return <button className={className + " btn-filled"}>{children}</button>;
  } else {
    return (
      <button className={className + " btn-transparent"}>{children}</button>
    );
  }
};

export default Button;
