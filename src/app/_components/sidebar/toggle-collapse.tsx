"use client";

import { Button } from "@/components/ui/button";
import { useLayout } from "@/contexts/layout";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { FC } from "react";

type ToggleCollapseProps = {};

export const ToggleCollapse: FC<ToggleCollapseProps> = ({}) => {
  const { handleToggleCollapse, isCollapsed } = useLayout();

  return (
    <Button
      variant="ghost"
      className="absolute -right-3 top-13 z-10 flex h-6 w-6 bg-background cursor-pointer items-center justify-center rounded-sm border border-solid p-0 max-md:hidden"
      onClick={handleToggleCollapse}
    >
      {isCollapsed ? (
        <ChevronRightIcon className="ml-1 size-4" />
      ) : (
        <ChevronLeftIcon className="size-4" />
      )}
    </Button>
  );
};
