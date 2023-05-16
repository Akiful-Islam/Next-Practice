import React from "react";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  label?: string;
  options: Option[];
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  value?: string;
};

const Selector: React.FC<Props> = ({
  label,
  options,
  className,
  style,
  name,
  onChange,
  onBlur,
  value,
}) => {
  return (
    <label
      className="relative flex items-center justify-center w-full my-2"
      htmlFor={name && name + "Selector"}
    >
      {label && (
        <div className="pl-2 w-1/3 flex flex-row-reverse">
          <p className="text-md font-normal">{label}</p>
        </div>
      )}
      {label && <p className="text-md font-normal pr-2"> : </p>}
      <select
        className={
          "w-2/3 h-10 px-2 bg-white rounded-md text-lg text-black font-medium border border-bnw-blue-gray/25 transition ease-in-out duration-150  hover:ring-1 hover:ring-offset-bnw-blue-accentLight/75 hover:shadow-md focus:shadow-lg focus:outline-none focus:ring focus:ring-offset-bnw-blue-accent/75" +
          " " +
          className
        }
        id={name && name + "Selector"}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      >
        {options.map((option) => (
          <option className="" key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Selector;