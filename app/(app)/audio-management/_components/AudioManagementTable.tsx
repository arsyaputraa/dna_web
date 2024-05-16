"use client";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Eye } from "lucide-react";

interface AudioManagementTableProps {
  no: number;
  policyNumber: string;
  productName: string;
  agentName: string;
  submissionStatus: string;
  submissionDate: Date;
  submissionType: string;
}

const AudioManagementTable = () => {
  const column: ColumnDef<AudioManagementTableProps>[] = [
    {
      accessorKey: "no",
      header: "No",
    },
    {
      accessorKey: "policyNumber",
      header: "Policy Number",
    },
    {
      accessorKey: "productName",
      header: "Product Name",
    },
    {
      accessorKey: "agentName",
      header: "Agent Name",
    },
    {
      accessorKey: "submissionStatus",
      header: "Submission Status",
    },
    {
      accessorKey: "submissionDate",
      header: "Submission Date",
      cell: ({ row }) =>
        `${dayjs(row.original.submissionDate).format("YYYY-MM-DD HH:mm:ss")}`,
    },
    {
      accessorKey: "submissionType",
      header: "Submission Type",
    },
    {
      header: "Action",
      cell: () => (
        <Button className="flex gap-1 items-center bg-green-700" size={"sm"}>
          <Eye />
          Detail
        </Button>
      ),
    },
  ];

  const rows: AudioManagementTableProps[] = [...Array(10)].map((_, index) => {
    return {
      agentName: "John Doe",
      no: index + 1,
      policyNumber: "5xxxx",
      productName: "Maestro",
      submissionDate: new Date(),
      submissionStatus: "Success Submit to RLS",
      submissionType: "Face to Face",
    };
  });

  return (
    <div>
      <div className="flex items-end justify-evenly gap-x-2 mb-4">
        <div>
          <Label className="font-semibold" htmlFor="policy-number-textfield">
            Policy Number
          </Label>
          <Input id="policy-number-textfield" placeholder="e.g., 5XX-XX" />
        </div>
        <div>
          <Label className="font-semibold" htmlFor="agent-code-textfield">
            Agent Code
          </Label>
          <Input id="agent-code-textfield" placeholder="e.g., 00xxxx" />
        </div>
        <div>
          <Label className="font-semibold" htmlFor="product-textfield">
            Product
          </Label>
          <Input id="product-textfield" placeholder="e.g., maestro" />
        </div>
        <div>
          <Label className="font-semibold" htmlFor="agent-name-textfield">
            Agent Name
          </Label>
          <Input id="agent-name-textfield" placeholder="e.g., indahwati" />
        </div>
        <div>
          <Label className="font-semibold" htmlFor="show-data-autocomplete">
            Show Data
          </Label>
          <Input id="show-data-autocomplete" placeholder="e.g., indahwati" />
        </div>
        <div className="flex gap-x-1">
          <Button className="bg-green-600">Search</Button>
          <Button className="bg-red-500">Clear</Button>
        </div>
      </div>

      <div>
        <DataTable
          columns={column}
          data={rows}
          currentPage={1}
          pageSize={5}
          totalData={rows.length}
          totalPage={10}
        />
      </div>
    </div>
  );
};

export default AudioManagementTable;
