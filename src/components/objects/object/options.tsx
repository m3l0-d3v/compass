import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CopyIcon,
  DownloadCloudIcon,
  InfoIcon,
  MoreHorizontalIcon,
  MoveIcon,
  PencilLineIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { MouseEvent } from "react";

type ObjectOptionsProps = {
  storageKey: string;
  fileName: string;
  onDownloadStart: () => void;
  onDownloadProgress: (progress: number) => void;
  onDownloadEnd: () => void;
};

export const ObjectOptions = ({
  storageKey,
  fileName,
  onDownloadStart,
  onDownloadProgress,
  onDownloadEnd,
}: ObjectOptionsProps) => {
  const [downloading, setDownloading] = useState(false);

  const download = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDownloading(true);
    onDownloadStart();

    try {
      const response = await fetch(`/api/files/${storageKey}`);
      if (!response.ok || !response.body) {
        throw new Error("Unable to download file");
      }

      const total = Number(response.headers.get("Content-Length"));
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const result = await reader.read();
        if (result.done) break;
        chunks.push(result.value);
        received += result.value.length;
        if (total > 0) onDownloadProgress(Math.round((received / total) * 100));
      }

      const blob = new Blob(chunks as BlobPart[], {
        type:
          response.headers.get("Content-Type") ?? "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      URL.revokeObjectURL(url);
      onDownloadProgress(100);
    } finally {
      setDownloading(false);
      onDownloadEnd();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button size="icon" variant="outline" className="size-6" />}
      >
        <MoreHorizontalIcon size="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuItem onClick={download} disabled={downloading}>
            <DownloadCloudIcon className="size-4" />
            Baixar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PencilLineIcon className="size-4" />
            Renomear
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyIcon className="size-4" /> Copiar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MoveIcon className="size-4" /> Mover
          </DropdownMenuItem>
          <DropdownMenuItem>
            <InfoIcon className="size-4" /> Detalhes
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <TrashIcon className="size-4" />
            Mover para a lixeira
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
