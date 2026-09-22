import { Objects } from "@/components/objects";
import { Toolbar } from "@/components/toolbar";
import { getObjectByStorageKeyAction } from "@/domain/application/actions/get-object-by-storage-key.action";
import { NextPage } from "next";
import { notFound } from "next/navigation";

type PageParams = {
  "storage-key": string;
};

type PageProps = {
  params: Promise<PageParams>;
};

const Page: NextPage<PageProps> = async ({ params }) => {
  const { "storage-key": storageKey } = await params;

  const getObjectByStorageKeyActionResponse = await getObjectByStorageKeyAction(
    {
      storageKey,
    },
  );

  if (getObjectByStorageKeyActionResponse.isLeft) {
    return <div>Erro ao buscar o objeto com base na chave informada.</div>;
  }

  const { object } = getObjectByStorageKeyActionResponse.value;

  if (!object) {
    return notFound();
  }

  return (
    <div className="p-5 flex flex-col gap-5">
      <Toolbar creations={["folder", "file"]} parentId={object.id} />
      <Objects parentId={object.id} types={["Folder", "File"]} />
    </div>
  );
};

export default Page;
