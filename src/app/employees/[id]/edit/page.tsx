import React from "react";

type Props = {};

const EditPage = ({ params }: { params: { id: string } }) => {
  return <div>{params.id}EditPage</div>;
};

export default EditPage;
