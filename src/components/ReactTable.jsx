import React, { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import NoData from "../shared/NoData";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import { FaSort } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaArrowRightLong, FaAngleRight } from "react-icons/fa6";

const ReactTable = ({
  data,
  columns,
  setSortType,
  setSortColumn,
  sortType,
  sortColumn,
  setPage,
  page,
  limit,
  search,
  setSearch,
}) => {
  let emptyData = [];
  let tableData = useMemo(
    () => (data?.data ? data?.data : emptyData),
    [data?.data]
  );
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  console.log("tableData", tableData);
  const handleSortingChange = (columnId) => {
    if (sortColumn === columnId) {
      // Toggle sorting direction
      if (sortType === "asc") {
        setSortType("desc"); // Ascending -> Descending
      } else if (sortType === "desc") {
        setSortType(""); // Descending -> No sorting
        setSortColumn(""); // Clear the sort column
      } else {
        setSortType("asc"); // No sorting -> Ascending
      }
    } else {
      // New column, start with ascending sort
      setSortColumn(columnId);
      setSortType("asc");
    }
  };
  const totalPage = data?.meta?.last_page;
  const totalCount = data?.meta?.total;
  console.log("totalPage :", totalPage, totalCount);

  const handlePageClick = ({ selected: selectedPage }) => {
    // console.log("selectedPage : ", selectedPage);

    setPage(selectedPage + 1);
  };
  return (
    <>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th>Sno</th>

              {headerGroup.headers.map((header) => {
                const columnDef = header.column.columnDef;
                const isSortable = columnDef.enableSorting;

                return (
                  <th
                    key={header.id}
                    onClick={() => {
                      if (isSortable) {
                        const currentSort = header.column.getIsSorted();
                        const nextSort = currentSort === "asc" ? "desc" : "asc";
                        handleSortingChange(header.column.id, nextSort); // Call the handler
                      }
                    }}
                  >
                    {flexRender(columnDef.header, header.getContext())}
                    {isSortable &&
                      tableData?.length > 0 &&
                      (header.column.id === sortColumn ? (
                        sortType === "asc" ? (
                          <IoCaretUpOutline />
                        ) : sortType === "desc" ? (
                          <IoCaretDownOutline />
                        ) : (
                          <FaSort />
                        )
                      ) : (
                        <FaSort />
                      ))}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableData.length <= 0 && (
            <tr>
              <td colSpan={columns?.length}>
                <NoData />
              </td>
            </tr>
          )}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              <td>{data?.meta?.from + row?.index}</td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {totalCount > limit && (
        <div className="d-flex justify-content-end align-items-center gap-2 m-t-15 mobile-pagination px-3 py-3">
          <div className="d-flex align-items-center gap-2">
            {/* Per Page Dropdown */}
            <div className="d-flex align-items-center gap-2 position-relative bg-img">
              <label htmlFor="perPage" className="per-page-label">
                Per Page
              </label>
              <select id="perPage" className="bg-white page-select">
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
          <div>
            <p className="per-page-label">
              Showing
              <span className="wh-20 text-center d-inline-block">
                {data?.pagination?.to}
              </span>{" "}
              of
              <span className="wh-20 text-center d-inline-block m-l-3">
                {totalCount}
              </span>
            </p>
          </div>
          {/* Pagination Component */}

          {totalCount > limit && (
            <ReactPaginate
              previousLabel={<FaAngleLeft />}
              nextLabel={<FaAngleRight />}
              pageCount={totalPage}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="active bg-blue-400"
              disabledClassName="disabled opacity-50"
              activeLinkClassName="bg-blue-400 text-white rounded"
              forcePage={page - 1}
            />
          )}

          {/* Go to Page Input */}
          <div className="d-flex align-items-center gap-2">
            <input
              type="number"
              id="goToPage"
              className="bg-white goto-page text-center"
              min={1}
              max={totalPage}
            />
            <label
              htmlFor="goToPage"
              className="per-page-label goto-bg d-flex align-items-center gap-1 m-l-6"
            >
              Go{" "}
              <span>
                <FaAngleRight />
              </span>
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default ReactTable;
