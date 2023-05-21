import React from "react";
import Input from "./Input";
import Selector from "./Selector";

type Props = {
  pageNumber: string;
  setPageNumber: (pageNumber: string) => void;
  pageSize: string;
  setPageSize: (pageSize: string) => void;
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
    <div className="w-3/4 flex flex-row justify-around">
      <Input
        className="w-10"
        name="page-size"
        value={pageSize.toString()}
        onChange={(e) => setPageSize(e.target.value)}
        label="Page Size"
        type="number"
      />
      <Input
        className="w-10"
        name="page-number"
        value={pageNumber.toString()}
        onChange={(e) => setPageNumber(e.target.value)}
        label="Page Number"
        type="number"
      />
      <Selector
        className="w-10"
        name="sort-by"
        label="Sort By"
        options={[
          { value: "id", label: "Id" },
          { value: "firstName", label: "First Name" },
          { value: "lastName", label: "Last Name" },
          { value: "email", label: "Email" },
        ]}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      />
      <Selector
        className="w-10"
        name="sort-direction"
        label="Sort Direction"
        options={[
          { value: "asc", label: "Ascending" },
          { value: "desc", label: "Descending" },
        ]}
        value={sortDirection}
        onChange={(e) => setSortDirection(e.target.value)}
      />
    </div>
  );
};

export default QueryForm;
