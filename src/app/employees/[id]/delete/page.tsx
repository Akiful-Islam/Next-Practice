import React from "react";

type Props = {};

const DeletePage = ({ params }: { params: { id: string } }) => {
  return <div>{params.id}DeletePage</div>;
};

export default DeletePage;
