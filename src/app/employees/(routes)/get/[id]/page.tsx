import GetById from "@/components/page/crud/GetById";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="get-single">
      <GetById routeId={params.id} />
    </div>
  );
};

export default page;
