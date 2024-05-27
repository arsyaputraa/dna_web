import { DataTable } from "@/components/table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

const dummyData = [
  { id: "1", title: "my title" },
  { id: "2", title: "my title" },
  { id: "3", title: "my title" },
];

const PlaygroundArsyaPage = () => {
  const columns: ColumnDef<{ id: string; title: string }>[] = [
    {
      accessorKey: "id",
      header: "Item ID",
    },
    {
      accessorKey: "title",
      header: "Item Title",
    },
  ];
  return (
    <div className="">
      <DataTable
        columns={columns}
        data={[{ id: "1", title: "my title" }]}
        currentPage={1}
        pageSize={5}
        totalData={dummyData.length}
        totalPage={1}
      />
    </div>
  );
};

export default PlaygroundArsyaPage;
