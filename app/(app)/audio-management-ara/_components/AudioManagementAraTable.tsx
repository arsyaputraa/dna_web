"use client";
import DialogCustomized from "@/components/DialogCustomized";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown } from "lucide-react";
import { ReactNode, useRef, useState } from "react";

interface AudioManagementTableProps {
  no: number;
  policyNumber: string;
}

const AudioManagementARATable = () => {
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
      header: "Action",
      cell: ({ row }) => {
        const [detailDialog, setDetailDialog] = useState<boolean>(false);
        const handleOpenDialog = () => {
          setDetailDialog(true);
        };
        const handleCloseDialog = () => {
          setDetailDialog(false);
        };

        return (
          <>
            <Button
              className="flex gap-1 items-center bg-green-500 font-semibold"
              size={"sm"}
              onClick={handleOpenDialog}
            >
              Detail
            </Button>
            {/* DIALOG */}
            <DialogCustomized
              open={detailDialog}
              onOpenChange={setDetailDialog}
              contentProps={{
                className: "w-max",
              }}
            >
              <div className="flex flex-col gap-2 ">
                {row.original.policyNumber}
                <audio controls>
                  <source src="https://www.computerhope.com/jargon/m/example.mp3" />
                </audio>
                <audio controls>
                  <source src="https://www.computerhope.com/jargon/m/example.mp3" />
                </audio>
                <audio controls>
                  <source src="https://www.computerhope.com/jargon/m/example.mp3" />
                </audio>
              </div>
            </DialogCustomized>
          </>
        );
      },
    },
  ];

  const rows: AudioManagementTableProps[] = [...Array(10)].map((_, index) => {
    return {
      agentName: "John Doe",
      no: index + 1,
      policyNumber: "5xxxx",
    };
  });

  return (
    <div>
      <div className="flex items-end justify-between gap-x-2 mb-4">
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

export default AudioManagementARATable;
