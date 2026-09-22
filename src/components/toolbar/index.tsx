import { FC } from "react";
import { Creator, CreationType } from "../creation";

type ToolbarProps = {
  parentId?: string;
  creations?: CreationType[];
};

export const Toolbar: FC<ToolbarProps> = ({ creations = [], parentId }) => {
  return (
    <div>
      <Creator creations={creations} parentId={parentId} />
    </div>
  );
};
