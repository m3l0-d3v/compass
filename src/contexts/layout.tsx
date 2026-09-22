"use client";

import { createContext, FC, useContext, useMemo, useState } from "react";

type LayoutContextType = {
  isCollapsed: boolean;
  handleToggleCollapse: () => void;
};

export const LayoutContext = createContext<LayoutContextType>({
  isCollapsed: false,
  handleToggleCollapse: () => {},
});

type LayoutProviderProps = {
  children: React.ReactNode;
};

export const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const contextValue: LayoutContextType = useMemo(
    () => ({
      isCollapsed,
      handleToggleCollapse,
    }),
    [isCollapsed],
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
