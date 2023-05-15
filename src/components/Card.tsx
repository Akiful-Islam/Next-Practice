import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  footer?: React.ReactNode;
  hero?: React.ReactNode;
};

const Card: React.FC<Props> = ({
  children,
  className,
  style,
  title,
  hero,
  footer,
}) => {
  let rootDivClass =
    "relative bg-bnw-blue-white rounded-md divide-y divide-bnw-blue-gray/10 py-6 px-3 ring-1 ring-bnw-blue-gray/10 shadow-md hover:ring-bnw-blue-accentLight/20 hover:shadow-xl transition-all ease-linear duration-75";
  if (className) {
    rootDivClass += " " + className;
  }
  return (
    <div className={rootDivClass}>
      {title && (
        <h2 className="text-bnw-blue-black font-semibold mb-5 mx-10 place-self-auto">
          {title}
        </h2>
      )}
      {(hero || children) && (
        <div className="relative h-4/5 flex flex-col items-center justify-center overflow-hidden py-6">
          {hero}
          {children}
        </div>
      )}
      {footer && <div className="pt-8 flex justify-center">{footer}</div>}
    </div>
  );
};

export default Card;
