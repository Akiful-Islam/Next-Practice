"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Toggler from "../input/Toggler";

type Props = {
  className?: string;
};

const DarkModeToggler: React.FC<Props> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Toggler
      className={className}
      name="darkmode"
      label="Toggle Dark"
      value={theme === "dark" ? true : false}
      onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
    />
  );
};

export default DarkModeToggler;
