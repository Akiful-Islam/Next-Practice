import GetAllButton from "@/components/GetAllButton";
import GetByIdButton from "@/components/GetByIdButton";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <ul>
        <GetAllButton />
        <GetByIdButton />
        <li>Post</li>
        <li>Patch by Id</li>
        <li>Delete by Id</li>
      </ul>
    </div>
  );
};

export default page;
