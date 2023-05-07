import DeleteById from "@/components/crud_components/DeleteById";
import GetAllPaginated from "@/components/crud_components/GetAllPaginated";
import GetById from "@/components/crud_components/GetById";
import PatchById from "@/components/crud_components/PatchById";
import Post from "@/components/crud_components/Post";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <ul>
        <GetAllPaginated />
        <GetById />
        <Post />
        <PatchById />
        <DeleteById />
      </ul>
    </div>
  );
};

export default page;
