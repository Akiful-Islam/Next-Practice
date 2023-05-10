import React from "react";
import NumberInput from "./input/NumberInput";
import SortDirectionSelector from "./input/SortDirectionSelector";
import SortBySelector from "./input/SortBySelector";

type Props = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortDirection: string;
  setSortDirection: (sortDirection: string) => void;
};

const QueryForm: React.FC<Props> = ({
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}) => {
  return (
    <div>
      <label htmlFor="page-size">Page Size:</label>
      <NumberInput
        id="page-size"
        value={pageSize}
        setValue={setPageSize}
        placeholder="Page Size"
        required={false}
      />
      <label htmlFor="page-number">Page Number:</label>
      <NumberInput
        id="page-size"
        value={pageNumber}
        setValue={setPageNumber}
        placeholder="Page Number"
        required={false}
      />
      <label htmlFor="sort-by">Sort By:</label>
      <SortBySelector value={sortBy} setValue={setSortBy} />
      <label htmlFor="sort-direction">Sort Direction:</label>
      <SortDirectionSelector
        value={sortDirection}
        setValue={setSortDirection}
      />
    </div>
  );
};

export default QueryForm;
