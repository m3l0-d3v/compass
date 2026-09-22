import { ObjectHTTP } from "@/infra/http/presenters/object.presenter";
import { ObjectType } from "@prisma/generated";
import { FileIcon, FolderIcon, HardDriveIcon, LucideIcon } from "lucide-react";
import { FC } from "react";
import { ObjectOptions } from "./options";
import Link from "next/link";
import { Path } from "@/lib/path";

type ObjectProps = {
  data: ObjectHTTP;
};

const objectIconMapper: Record<ObjectType, LucideIcon> = {
  [ObjectType.Drive]: HardDriveIcon,
  [ObjectType.Folder]: FolderIcon,
  [ObjectType.File]: FileIcon,
};

export const Object: FC<ObjectProps> = ({ data }) => {
  const Icon = objectIconMapper[data.type];

  return (
    <Link
      href={Path.create(data.storageKey)}
      className="p-0 gap-0 rounded-2xl bg-secondary/25 border"
    >
      <div className="flex items-center justify-center aspect-square">
        <Icon className="size-16" />
      </div>
      <div className="w-full h-9 flex items-center justify-between px-3 gap-3 border-t">
        <span className="text-sm line-clamp-1">{data.name}</span>
        <ObjectOptions />
      </div>
    </Link>
  );
};
