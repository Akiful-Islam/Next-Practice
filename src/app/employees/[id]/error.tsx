"use client";

import Button from "@/components/input/Button";
import React from "react";

type Props = {};

const EmployeeError = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <div className="error">
      <h3 className="error-text">Error: {error.message}</h3>
    </div>
  );
};

export default EmployeeError;
