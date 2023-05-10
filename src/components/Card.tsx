import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Card: React.FC<Props> = ({ children, className, style }) => {
  let rootDivClass = "flex flex-col justify-center items-center my-2";
  if (className) {
    rootDivClass += " " + className;
  }
  return (
    <div className={rootDivClass} style={style}>
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-clip-border shadow-3xl shadow-current flex flex-col w-full !p-4 3xl:p-![18px] bg-current undefined">
        {children}
      </div>
    </div>
  );
};

export default Card;
