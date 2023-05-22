"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

type Props = {};

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
};

export default Provider;
