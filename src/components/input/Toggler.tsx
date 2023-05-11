import React from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  placeholder?: string;
  type?: string;
  label?: string;
};

const Toggler: React.FC<Props> = ({
  className,
  style,
  children,
  placeholder,
  type,
  label,
}) => {
  let classes = "input";
  return (
    <div className="flex justify-center">
      <label
        htmlFor="toogleButton"
        className="flex items-center cursor-pointer"
      >
        {label && <div className="px-2">{label}</div>}
        <div className="relative">
          <input id="toogleButton" type="checkbox" className="hidden" />
          <div className="toggle-path bg-gray-400 w-9 h-5 rounded-full shadow-inner"></div>
          <div className="toggle-circle absolute w-5 h-5 bg-zinc-700 rounded-full shadow inset-y-0 left-0"></div>
        </div>
      </label>
    </div>
  );
};

export default Toggler;
