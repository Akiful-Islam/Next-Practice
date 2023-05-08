import React from "react";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const SortBySelector: React.FC<Props> = ({ value, setValue }) => {
  return (
    <select
      id="sort-by"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Sort By"
    >
      <option value="id">Id</option>
      <option value="firstName">First Name</option>
      <option value="lastName">Last Name</option>
      <option value="email">Email</option>
    </select>
  );
};

export default SortBySelector;
