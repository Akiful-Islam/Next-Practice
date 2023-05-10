import React from "react";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const SortDirectionSelector: React.FC<Props> = ({ value, setValue }) => {
  return (
    <select
      id="sort-order"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Sort Direction"
    >
      <option value="asc">Asc</option>
      <option value="desc">Desc</option>
    </select>
  );
};

export default SortDirectionSelector;
