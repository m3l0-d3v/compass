"use client";

import { ObjectHTTP } from "@/infra/http/presenters/object.presenter";
import { ObjectType } from "@prisma/generated";
import { FileIcon, FolderIcon, HardDriveIcon, LucideIcon } from "lucide-react";
import { FC } from "react";
import { ObjectOptions } from "./options";
import Link from "next/link";
import { Path } from "@/lib/path";
import { useState } from "react";

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
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  return (
    <div className="p-0 gap-0 rounded-2xl bg-secondary/25 border">
      <Link
        href={Path.create(data.storageKey)}
        className="flex items-center justify-center aspect-square"
      >
        <Icon className="size-16" />
      </Link>
      <div className="w-full h-9 flex items-center justify-between px-3 gap-3 border-t">
        <Link
          href={Path.create(data.storageKey)}
          className="text-sm line-clamp-1"
        >
          {data.name}
        </Link>
        <div
          className="relative flex size-6 items-center justify-center"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {downloadProgress !== null && (
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(var(--primary) ${downloadProgress}%, var(--muted) 0)`,
              }}
            >
              <div className="absolute inset-0.75 rounded-full bg-background" />
            </div>
          )}
          <ObjectOptions
            storageKey={data.storageKey}
            fileName={data.name}
            onDownloadStart={() => setDownloadProgress(0)}
            onDownloadProgress={setDownloadProgress}
            onDownloadEnd={() => setDownloadProgress(null)}
          />
        </div>
      </div>
    </div>
  );
};
