import GetAllButton from "@/components/GetAllButton";
import GetById from "@/components/GetById";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <ul>
        <GetAllButton />
        <GetById />
        <li>Post</li>
        <li>Patch by Id</li>
        <li>Delete by Id</li>
      </ul>
    </div>
  );
};

export default page;
