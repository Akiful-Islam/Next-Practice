import React from "react";

type Props = {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: "text" | "email" | "password" | "number";
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
};

const Input: React.FC<Props> = ({
  label,
  className,
  style,
  type,
  name,
  onChange,
  onBlur,
  value,
}) => {
  return (
    <div className="relative flex items-center justify-center w-full my-4">
      <label
        className="flex items-center justify-center w-full max-w-full"
        htmlFor={name && name + "Input"}
      >
        {label && (
          <div className="text-md font-medium px-2 min-w-max">
            {label + ": "}
          </div>
        )}
        <input
          className="w-full max-w-xs h-10 px-2 rounded-md text-lg text-black font-medium border border-bnw-blue-gray/25 transition ease-in duration-75  hover:ring-1 hover:ring-offset-bnw-blue-accentLight/75 hover:shadow-md focus:shadow-lg focus:outline-none focus:ring focus:ring-offset-bnw-blue-accent/75"
          id={name && name + "Input"}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      </label>
    </div>
  );
};

export default Input;
