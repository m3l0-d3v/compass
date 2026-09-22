"use client";

import { useLayout } from "@/contexts/layout";
import { cn } from "@/lib/shadcn";
import { FC } from "react";

type SidebarContainerProps = {
  children: React.ReactNode;
};

export const SidebarContainer: FC<SidebarContainerProps> = ({ children }) => {
  const { isCollapsed } = useLayout();

  return (
    <div
      className={cn(
        "relative h-full flex-col items-center justify-between border-r hidden duration-150 ease-in-out md:flex bg-background",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {children}
    </div>
  );
};
