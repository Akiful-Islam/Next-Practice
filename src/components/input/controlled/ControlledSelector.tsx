import React from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import Selector, { Option } from "../Selector";

type Props = {
  label?: string;
  options: Option[];
  name: string;
  className?: string;
  control: Control<any>;
  rules?: RegisterOptions;
};

const ControlledSelector: React.FC<Props> = ({
  label,
  options,
  name,
  className,
  control,
  rules,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Selector
          {...field}
          label={label}
          className={className}
          options={options}
        />
      )}
    />
  );
};

export default ControlledSelector;
