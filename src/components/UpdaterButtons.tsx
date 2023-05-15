import React, { useState } from "react";
import Button from "./input/Button";
import { useRouter } from "next/navigation";

type Props = {
  employeeId: number;
};

const UpdaterButtons: React.FC<Props> = ({ employeeId }) => {
  const router = useRouter();
  const [showUpdaterButtons, setShowUpdaterButtons] = useState(false);

  const handleEditClick = (id: number) => {
    router.push(`/employees/patch/${id}`);
  };
  const handleDeleteClick = (id: number) => {
    router.push(`/employees/delete/${id}`);
  };

  return (
    <div className="">
      {showUpdaterButtons ? (
        <div className="flex place-content-center">
          <Button
            className="!h-10 !w-20 border-2 !text-sm"
            title="Edit"
            onClick={() => handleEditClick(employeeId)}
          />
          <Button
            variant="transparent"
            className="!h-10 !w-20 !text-sm !text-red-400 !border-red-400 hover:!bg-red-400 hover:!text-white"
            title="Delete"
            onClick={() => handleDeleteClick(employeeId)}
          />
        </div>
      ) : (
        <Button
          className="!h-10 !w-20 !text-sm"
          title="Update?"
          variant="transparent"
          onClick={() => setShowUpdaterButtons(!showUpdaterButtons)}
        />
      )}
    </div>
  );
};

export default UpdaterButtons;
