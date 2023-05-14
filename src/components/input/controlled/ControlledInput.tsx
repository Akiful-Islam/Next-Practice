import React from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import Input from "../Input";

type Props = {
  name: string;
  label?: string;
  type?: string;
  control: Control<any>;
  rules: RegisterOptions;
};

const ControlledInput: React.FC<Props> = ({
  name,
  label,
  type,
  control,
  rules,
}) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => <Input {...field} label={label} type={type} />}
      />
    </div>
  );
};

export default ControlledInput;
