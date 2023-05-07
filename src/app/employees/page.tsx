import DeleteButton from "@/components/crud_buttons/DeleteButton";
import GetAllButton from "@/components/crud_buttons/GetAllButton";
import GetByIdButton from "@/components/crud_buttons/GetByIdButton";
import PostButton from "@/components/crud_buttons/PostButton";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <ul>
        <GetAllButton />
        <GetByIdButton />
        <PostButton />
        <li>Patch by Id</li>
        <DeleteButton />
      </ul>
    </div>
  );
};

export default page;
