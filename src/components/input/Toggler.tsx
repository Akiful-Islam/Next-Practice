import React from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  label?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: boolean;
};

const Toggler: React.FC<Props> = ({
  className,
  style,
  placeholder,
  label,
  name,
  onChange,
  onBlur,
  value,
}) => {
  let classes = "input";
  return (
    <div className={"flex justify-center" + " " + className}>
      <label
        htmlFor={name && name + "Toggler"}
        className="flex items-center cursor-pointer"
      >
        {label && <div className="px-2">{label}</div>}
        <div className="relative">
          <input
            id={name && name + "Toggler"}
            type="checkbox"
            className="hidden"
            onChange={onChange}
            onBlur={onBlur}
            checked={value}
          />
          <div className="toggle-path bg-bnw-blue-gray/30 w-9 h-5 rounded-full shadow-inner"></div>
          <div className="toggle-circle absolute w-5 h-5 bg-bnw-blue-white rounded-full shadow inset-y-0 left-0"></div>
        </div>
      </label>
    </div>
  );
};

export default Toggler;
