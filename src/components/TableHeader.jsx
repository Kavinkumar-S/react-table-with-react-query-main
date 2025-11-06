import React from "react";
import { Search } from "../shared/Search";
import Filter from "../shared/Filter";

const TableHeader = ({
  search,
  setSearch,
  setPage,
  filter,
  setFilter,
  filterOptions,
}) => {
  return (
    <div>
      <Filter
        filter={filter}
        setFilter={setFilter}
        filterOptions={filterOptions}
      />
      <Search search={search} setSearch={setSearch} setPage={setPage} />
    </div>
  );
};

export default TableHeader;
