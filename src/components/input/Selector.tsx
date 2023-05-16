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
    <div>
      {label && (
        <label htmlFor={name && name + "Selector"}>{label + ": "}</label>
      )}
      <select
        id={name && name + "Selector"}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
