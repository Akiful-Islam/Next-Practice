import DeleteById from "@/components/page/crud/DeleteById";
import React from "react";
type Props = {};

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="delete-root">
      <DeleteById routeId={params.id} />
    </div>
  );
};

export default page;
