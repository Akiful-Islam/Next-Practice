"use client";

import React from "react";

type Props = {};

const EmployeeError = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return <div>EmployeeError</div>;
};

export default EmployeeError;
