"use client";
import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  ...props
}) => <NextThemesProvider {...props}>{children}</NextThemesProvider>;
