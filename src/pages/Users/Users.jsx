import React, { useMemo, useState } from "react";
import AxiosInstance from "../../services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import UserColumns from "./UserColumns";
import ReactTable from "../../components/ReactTable";
import TableHeader from "../../components/TableHeader";
const Users = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState({});
  const getUsers = async () => {
    try {
      const params = {
        page: page,
        limit: limit,
        ...(search && { search: search }),
        ...(sortColumn && { sort_column: sortColumn }),
        ...(sortType && { sort_direction: sortType }),
        ...(filter && { filter: JSON.stringify(filter) }),
      };

      const response = await AxiosInstance.get("users", { params: params });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching users data", error);
    }
  };
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getUsers", page, limit, search, sortType, sortColumn, filter],
    queryFn: getUsers,
  });
  console.log("data : ", data?.data);
  let columns = useMemo(() => UserColumns(), []);
  console.log("columns", columns);

  const filterOptionslist = [
    {
      title: "Status",
      key: "user_status",
      list: [
        { name: "Verified", value: "verified" },
        { name: "Expired", value: "expired" },
        { name: "Invited", value: "invited" },
      ],
    },
    {
      title: "Role",
      key: "role",
      list: [
        { name: "sq1 admin", value: "sq1_admin" },
        { name: "sq1 user", value: "sq1_user" },
      ],
    },
  ];
  return (
    <>
      <div>Users</div>
      <TableHeader
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        filter={filter}
        setFilter={setFilter}
        filterOptions={filterOptionslist}
      />
      <ReactTable
        data={data?.data}
        columns={columns}
        setSortType={setSortType}
        setSortColumn={setSortColumn}
        sortType={sortType}
        sortColumn={sortColumn}
        setPage={setPage}
        page={page}
        limit={limit}
        search={search}
        setSearch={setSearch}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};

export default Users;
