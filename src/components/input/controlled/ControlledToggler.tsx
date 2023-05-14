import React from "react";
import { Control, Controller } from "react-hook-form";
import Toggler from "../Toggler";

type Props = { name: string; control: Control<any>; label?: string };

const ControlledToggler: React.FC<Props> = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Toggler {...field} label={label} />}
    />
  );
};

export default ControlledToggler;
