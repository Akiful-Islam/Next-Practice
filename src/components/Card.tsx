import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Card = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="!z-5 relative flex flex-col rounded-[20px] max-w-[300px]  bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-current undefined">
        {props.children}
      </div>
    </div>
  );
};

export default Card;
