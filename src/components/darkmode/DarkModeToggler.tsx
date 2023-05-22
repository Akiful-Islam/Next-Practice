"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Toggler from "../input/Toggler";

type Props = {};

const DarkModeToggler = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  console.log(theme);

  return (
    <div>
      <Toggler
        name="darkmode"
        label="Toggle Dark"
        value={theme === "dark" ? true : false}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />
    </div>
  );
};

export default DarkModeToggler;
