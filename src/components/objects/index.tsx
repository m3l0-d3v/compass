import { getObjectsAction } from "@/domain/application/actions/get-objects.action";
import { ObjectType } from "@prisma/generated";
import { FC } from "react";
import { Object } from "./object";

type ObjectsProps = {
  parentId?: string;
  types?: ObjectType[];
};

export const Objects: FC<ObjectsProps> = async ({ parentId, types }) => {
  const getObjectsActionResponse = await getObjectsAction({
    parentId,
    types,
  });

  if (getObjectsActionResponse.isLeft) {
    return <div>Não foi possível carregar os objetos.</div>;
  }

  const { objects } = getObjectsActionResponse.value;

  if (!objects.length) {
    return <div>Nenhum objeto encontrado, faça upload ou crie uma pasta.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
      {objects.map((object) => (
        <Object data={object} key={object.id} />
      ))}
    </div>
  );
};
