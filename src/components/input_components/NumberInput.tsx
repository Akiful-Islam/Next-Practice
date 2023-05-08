import React from "react";

type Props = {
  value: number;
  setValue: (value: number) => void;
  placeholder?: string;
  id?: string;
  required?: boolean;
};

const NumberInput: React.FC<Props> = ({
  value,
  setValue,
  placeholder,
  id,
  required = true,
}) => {
  return (
    <input
      id={id}
      type="number"
      value={value}
      placeholder={placeholder}
      onChange={(event) => setValue(parseInt(event.target.value))}
      required={required}
    />
  );
};

export default NumberInput;
