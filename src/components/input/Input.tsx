import React from "react";

type Props = {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: "text" | "email" | "password" | "number" | "tel";
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
    <label
      className="relative flex items-center justify-center w-full my-4"
      htmlFor={name && name + "Input"}
    >
      {label && (
        <div className="pl-2 w-1/3 flex flex-row-reverse">
          <p className="text-md font-normal">{label}</p>
        </div>
      )}
      {label && <p className="text-md font-normal pr-2"> : </p>}
      <input
        className={
          "w-2/3 h-10 px-2 rounded-md text-lg text-black font-medium border border-bnw-blue-gray/25 transition ease-in-out duration-150  hover:ring-1 hover:ring-offset-bnw-blue-accentLight/75 hover:shadow-md focus:shadow-lg focus:outline-none focus:ring focus:ring-offset-bnw-blue-accent/75" +
          " " +
          className
        }
        id={name && name + "Input"}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </label>
  );
};

export default Input;
