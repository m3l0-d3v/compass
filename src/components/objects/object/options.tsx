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

export const ObjectOptions = () => {
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
          <DropdownMenuItem>
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
