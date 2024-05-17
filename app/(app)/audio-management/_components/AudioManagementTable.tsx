"use client";
import DialogCustomized from "@/components/DialogCustomized";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import DetailDialog from "./DetailDialog";
import UploadAudio from "./UploadAudio";

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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "policyNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Policy Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "productName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "agentName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Agent Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "submissionStatus",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submition Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "submissionDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submition Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) =>
        `${dayjs(row.original.submissionDate).format("YYYY-MM-DD HH:mm:ss")}`,
    },
    {
      accessorKey: "submissionType",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submition Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      header: "Action",
      cell: () => (
        <Button
          className="flex gap-1 items-center bg-green-500 font-semibold"
          size={"sm"}
          onClick={handleOpenDetailDialog}
        >
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

  const [uploadDialog, setUploadDialog] = useState<boolean>(false);
  const [detailDialog, setDetailDialog] = useState<boolean>(false);

  function handleOpenDialog() {
    setUploadDialog(true);
  }
  function handleCloseDialog() {
    setUploadDialog(false);
  }
  function handleOpenDetailDialog() {
    setDetailDialog(true);
  }
  function handleCloseDetailDialog() {
    setDetailDialog(false);
  }

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

      <div className="text-right mb-2">
        <Button onClick={handleOpenDialog}>Upload Audio</Button>
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

      {/* DIALOG */}
      <DialogCustomized
        open={uploadDialog}
        onOpenChange={setUploadDialog}
        contentProps={{
          className: "w-max",
        }}
      >
        <UploadAudio
          onSubmit={(val) => {
            handleCloseDialog();
          }}
        />
      </DialogCustomized>

      <DialogCustomized
        open={detailDialog}
        onOpenChange={setDetailDialog}
        contentProps={{
          className: "w-max",
        }}
      >
        <DetailDialog />
      </DialogCustomized>
    </div>
  );
};

export default AudioManagementTable;
