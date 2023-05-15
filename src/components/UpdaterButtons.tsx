import React, { useState } from "react";
import Button from "./input/Button";

type Props = {
  id: number;
};

const UpdaterButtons: React.FC<Props> = ({ id }) => {
  const [showUpdaterButtons, setShowUpdaterButtons] = useState(false);

  const handleEditClick = () => {};
  const handleDeleteClick = () => {};

  return (
    <div className="">
      {showUpdaterButtons ? (
        <div className="flex place-content-center">
          <Button className="!h-10 !w-20 border-2 !text-sm" title="Edit" />
          <Button
            variant="transparent"
            className="!h-10 !w-20 !text-sm !text-red-400 !border-red-400 hover:!bg-red-400 hover:!text-white"
            title="Delete"
          />
        </div>
      ) : (
        <Button
          className="!h-12 !w-24 !text-sm"
          title="Update?"
          variant="transparent"
          onClick={() => setShowUpdaterButtons(!showUpdaterButtons)}
        />
      )}
    </div>
  );
};

export default UpdaterButtons;
