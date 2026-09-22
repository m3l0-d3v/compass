import { HTMLAttributes } from "react";
import { SidebarContainer } from "./container";
import { ToggleCollapse } from "./toggle-collapse";

type SidebarProps = HTMLAttributes<HTMLDivElement> & {};

export const Sidebar = (_: SidebarProps) => {
  return (
    <div className="max-md:hidden flex">
      <SidebarContainer>
        <ToggleCollapse />
      </SidebarContainer>
    </div>
  );
};
