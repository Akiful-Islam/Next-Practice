"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

type Props = {};

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
};

export default Provider;