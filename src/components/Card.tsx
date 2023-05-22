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
        "flex flex-col items-stretch justify-between relative " +
        "glassmorph-dark dark:glassmorph " +
        "divide-y divide-bnw-blue-gray/10 dark:divide-bnw-blue-white/10 py-6 px-2 my-4 mx-2" +
        "ring-1 ring-bnw-blue-gray/20 dark:ring-bnw-blue-gray/50 shadow-md hover:ring-bnw-blue-accent/40 dark:hover:ring-bnw-blue-accentLight/20 dark:hover:shadow-bnw-blue-white/10 hover:shadow-lg " +
        "transition-all ease-in-out duration-100 " +
        className
      }
    >
      {title && (
        <h2 className="text-bnw-blue-black dark:text-bnw-blue-white font-semibold mb-4 mx-8 px-2 py-4 text-center">
          {title}
        </h2>
      )}
      {(hero || children) && (
        <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden py-6">
          {hero}
          {children}
        </div>
      )}
      {footer && <div className="pt-8 flex justify-center">{footer}</div>}
    </div>
  );
};

export default Card;
