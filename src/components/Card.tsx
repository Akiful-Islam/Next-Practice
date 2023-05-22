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
  return (
    <div
      className={
        "relative glassmorph dark:glassmorph-dark divide-y divide-bnw-blue-gray/10 py-6 px-3 ring-1 ring-bnw-blue-gray/10 shadow-md hover:ring-bnw-blue-accentLight/20 hover:shadow-lg transition-all ease-linear duration-75" +
        " " +
        className
      }
    >
      {title && (
        <h2 className="text-bnw-blue-black font-semibold mb-5 mx-10 text-center">
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
