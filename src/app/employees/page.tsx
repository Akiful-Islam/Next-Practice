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
        <li>Delete by Id</li>
      </ul>
    </div>
  );
};

export default page;
