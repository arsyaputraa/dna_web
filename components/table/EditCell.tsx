import { Cell, Row, Table } from "@tanstack/react-table";
import { MouseEvent, ReactElement, ReactNode } from "react";
import { Button } from "../ui/button";
import { CheckIcon, CrossIcon, PencilIcon, Trash } from "lucide-react";

export function EditCell<TData, TValue>({
  row,
  table,
  cell,
}: {
  row: Row<TData>;
  table: Table<TData>;
  cell: Cell<TData, TValue>;
}): ReactElement {
  const meta = table.options.meta;

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    if (meta?.setEditedRow) {
      meta?.setEditedRow((old) => ({
        ...old,
        [row.id]: !old[row.id],
      }));
      if (elName !== "edit") {
        if (meta?.revertData) {
          elName === "cancel"
            ? meta.revertData(row.index, true)
            : meta.revertData(row.index, false);
        }
      } else {
        if (meta?.revertData) {
          meta.revertData(row.index, true);
        }
      }
    }
  };

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  if (meta?.editedRow) {
    return meta?.editedRow[row.id] ? (
      <div className="flex gap-x-1">
        <Button
          size={"icon"}
          variant={"outline"}
          type="button"
          onClick={setEditedRows}
          name="cancel"
        >
          <CrossIcon />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={(e) => {
            try {
              if (meta.onFinishAddData) {
                meta.onFinishAddData();
                setEditedRows(e);
                return;
              }
              setEditedRows(e);
            } catch (error) {}
          }}
          type="button"
          name="done"
        >
          <CheckIcon />
        </Button>
      </div>
    ) : (
      <div className="flex gap-x-2">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={setEditedRows}
          type="button"
          name="edit"
        >
          <PencilIcon />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={async (e) => {
            if (meta?.onDeleteData) {
              await meta.onDeleteData(row.original);
              removeRow();
              return;
            }
            removeRow();
          }}
          type="button"
          name="edit"
        >
          <Trash />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-x-2">
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={setEditedRows}
        type="button"
        name="edit"
      >
        <PencilIcon />
      </Button>
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={async (e) => {
          if (meta?.onDeleteData) {
            await meta.onDeleteData(row.original);
            removeRow();
            return;
          }
          removeRow();
        }}
        type="button"
        name="edit"
      >
        <Trash />
      </Button>
    </div>
  );
}
