"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { toast } from "@/components/ui/toast";
import { createFolderAction } from "@/domain/application/actions/create-folder.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderIcon } from "lucide-react";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type CreateFolderFormProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  parentId?: string;
};

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe o nome da pasta.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),
  description: z
    .string()
    .trim()
    .max(100, "A descrição deve ter no máximo 100 caracteres."),
});

type FormValues = z.infer<typeof formSchema>;

const formDefaultValues: FormValues = {
  name: "",
  description: "",
};

export const CreateFolderForm: FC<CreateFolderFormProps> = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  parentId,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledOnOpenChange ?? setInternalOpen;

  const form = useForm<FormValues>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    const createFolderActionResponse = await createFolderAction({
      name: values.name,
      description: values.description,
      parentId,
    });

    if (createFolderActionResponse.isLeft) {
      return toast.add({
        title: "Falha ao criar a pasta!",
        description:
          "Não foi possível criar a sua nova pasta, tente novamente mais tarde.",
      });
    }

    toast.add({
      title: "Pasta criada com sucesso!",
      description: "Sua nova pasta foi criada e já está pronta para uso.",
    });

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {controlledOpen === undefined && (
        <DialogTrigger
          render={
            <Button
              variant="outline"
              className="h-9 gap-2 w-full border-none flex- justify-start bg-transparent"
            >
              <FolderIcon className="size-4" />
              Criar pasta
            </Button>
          }
        />
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="gap-1 text-start">
          <DialogTitle>Adicionar pasta</DialogTitle>

          <DialogDescription>
            Crie uma nova pasta para organizar seus arquivos.
          </DialogDescription>
        </DialogHeader>
        <form
          id="form-rhf"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-name">Nome</FieldLabel>

                  <Input
                    {...field}
                    id="form-rhf-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex.: Administrativo, Comercial, Projetos..."
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-description">
                    Descrição
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-description"
                      placeholder="Descreva o que será armazenado nesta unidade..."
                      rows={5}
                      maxLength={100}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />

                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value?.length ?? 0}/100 caracteres
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  <FieldDescription>
                    Adicione uma breve descrição para identificar o propósito
                    desta unidade.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form="form-rhf"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Adicionando..." : "Adicionar pasta"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
