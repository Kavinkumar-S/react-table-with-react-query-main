const UserColumns = () => {
  let columns = [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
    },
    {
      accessorKey: "role_name",
      header: "Role",
      enableSorting: false,
    },
    {
      accessorKey: "organizations_count",
      header: "Organizations",
      enableSorting: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
    },
  ];
  return columns;
};

export default UserColumns;
