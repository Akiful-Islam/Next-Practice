import React from "react";
import SortDirectionSelector from "./SortDirectionSelector";
import SortBySelector from "./SortBySelector";
import Input from "./Input";

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
    <div className="flex flex-row">
      <Input
        className="w-10"
        name="page-size"
        value={pageSize.toString()}
        onChange={(e) => setPageSize(parseInt(e.target.value))}
        label="Page Size"
        type="number"
      />
      <Input
        className="w-10"
        name="page-number"
        value={pageNumber.toString()}
        onChange={(e) => setPageNumber(parseInt(e.target.value))}
        label="Page Number"
        type="number"
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
