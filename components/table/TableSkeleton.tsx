import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const TableSkeleton = ({
  className,
  columnNumber = "2",
  rowNumber = 4,
}: {
  columnNumber?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12";
  className?: string;
  rowNumber?: number;
}) => {
  return (
    <Skeleton className="w-full p-2">
      <Skeleton className="bg-gray-400 h-5 mb-2 w-full" />
      <Skeleton
        className={cn(
          `grid w-full gap-2 p-4 bg-gray-300 grid-cols-5 `,
          className
        )}
      >
        {Array.from({ length: Number(columnNumber) * rowNumber }).map(
          (item, idx) => {
            return (
              <Skeleton
                key={`skeleton-table-row-${idx}`}
                className="h-5 w-full rounded-xl bg-gray-400"
              />
            );
          }
        )}
      </Skeleton>
    </Skeleton>
  );
};

export default TableSkeleton;
