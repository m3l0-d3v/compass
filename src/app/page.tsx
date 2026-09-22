import { Objects } from "@/components/objects";
import { Toolbar } from "@/components/toolbar";
import { ObjectType } from "@prisma/generated";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <div className="p-5 flex flex-col gap-5">
      <Toolbar creations={["drive"]} />
      <Objects types={[ObjectType.Drive]} />
    </div>
  );
};

export default Page;
