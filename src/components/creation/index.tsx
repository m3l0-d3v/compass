"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { createFileAction } from "@/domain/application/actions/create-file.action";
import { MoreHorizontalIcon } from "lucide-react";
import { ChangeEvent, FC, useRef, useState } from "react";
import { CreateDriveForm } from "../create-folder/create-drive-form";
import { CreateFolderForm } from "../create-folder/create-folder-form";

export type CreationType = "drive" | "folder" | "file";

type CreatorProps = {
  parentId?: string;
  creations?: CreationType[];
};

export const Creator: FC<CreatorProps> = ({ creations = [], parentId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCreator, setActiveCreator] = useState<CreationType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openCreator = (creation: CreationType) => {
    setMenuOpen(false);
    setActiveCreator(creation);
  };

  const closeCreator = () => setActiveCreator(null);

  const openFileSelector = () => {
    setMenuOpen(false);
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const extension = file.name.includes(".")
      ? (file.name.split(".").pop()?.toLowerCase() ?? "")
      : "";
    const fileInfo = {
      name: file.name,
      type: file.type,
      size: file.size,
      extension,
      parentId,
      lastModified: file.lastModified,
    };

    console.log("Arquivo selecionado:", fileInfo);

    const createFileActionResponse = await createFileAction({
      name: file.name,
      description: "",
      mimeType: file.type,
      extension,
      size: file.size,
      parentId,
    });

    if (createFileActionResponse.isLeft) {
      console.error("Falha ao criar arquivo:", createFileActionResponse.error);
      toast.add({
        title: "Falha ao salvar o arquivo!",
        description:
          "Não foi possível salvar as informações do arquivo, tente novamente mais tarde.",
      });
    } else {
      console.log("Arquivo criado:", fileInfo);
      toast.add({
        title: "Arquivo salvo com sucesso!",
        description: "As informações do arquivo foram salvas.",
      });
    }

    event.target.value = "";
  };

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger
          render={<Button size="icon" variant="outline" className="size-6" />}
        >
          <MoreHorizontalIcon size="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            {creations.includes("drive") && (
              <DropdownMenuItem onClick={() => openCreator("drive")}>
                Criar drive
              </DropdownMenuItem>
            )}
            {creations.includes("folder") && (
              <DropdownMenuItem onClick={() => openCreator("folder")}>
                Criar pasta
              </DropdownMenuItem>
            )}
            {creations.includes("file") && (
              <DropdownMenuItem onClick={openFileSelector}>
                Upload de arquivo
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {creations.includes("file") && (
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelected}
          className="hidden"
        />
      )}
      {creations.includes("drive") && (
        <CreateDriveForm
          open={activeCreator === "drive"}
          onOpenChange={(open) => !open && closeCreator()}
        />
      )}
      {creations.includes("folder") && (
        <CreateFolderForm
          open={activeCreator === "folder"}
          onOpenChange={(open) => !open && closeCreator()}
          parentId={parentId}
        />
      )}
    </>
  );
};
