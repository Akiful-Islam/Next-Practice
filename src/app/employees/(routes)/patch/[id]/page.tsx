import PatchById from "@/components/page/crud/PatchById";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="patch-root">
      <PatchById routeId={params.id} />
    </div>
  );
};

export default page;
