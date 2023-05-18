import React from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import Input from "../Input";

type Props = {
  name: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  className?: string;
  control: Control<any>;
  rules: RegisterOptions;
};

const ControlledInput: React.FC<Props> = ({
  name,
  label,
  type,
  className,
  control,
  rules,
}) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input {...field} label={label} type={type} className={className} />
        )}
      />
    </div>
  );
};

export default ControlledInput;
