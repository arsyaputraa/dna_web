import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { usePagination } from "@/hooks/pagination/usePagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const CustomPagination = ({
  className,
  currentPage,
  onPageChange,
  pageSize,
  siblingsCount,
  totalCount,
}: {
  onPageChange: (e: number) => any;
  totalCount: number;
  siblingsCount: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingsCount,
    pageSize,
  });

  if (currentPage == 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={cn("flex flex-wrap flex-row items-center", className)}>
      <Button
        size={"icon"}
        disabled={currentPage == 1}
        onClick={onPrevious}
        className="bg-slate-100 hover:bg-transparent shadow-none h-7 w-7 rounded-none rounded-tl-md rounded-bl-md"
      >
        <ChevronLeftIcon className="text-primary" />
      </Button>
      <div className="flex-1 flex flex-wrap">
        {paginationRange.map((item, index) => {
          if (item === ".") {
            return (
              <Button
                size={"icon"}
                disabled
                className="bg-transparent text-black shadow-none h-7 w-7"
                key={index}
              >
                ...
              </Button>
            );
          }

          return (
            <Button
              size={"icon"}
              key={index}
              onClick={() => onPageChange(item as number)}
              className={`${
                item === currentPage
                  ? "bg-btn-primary text-white font-bold hover:bg-btn-primary/50"
                  : "bg-slate-300 text-black font-bold hover:bg-slate-200"
              } h-7 w-7 shadow-none rounded-none`}
            >
              {item}
            </Button>
          );
        })}
      </div>
      <Button
        size={"icon"}
        disabled={currentPage == lastPage}
        onClick={onNext}
        className="bg-slate-100 hover:bg-transparent shadow-none h-7 w-7 rounded-none rounded-tr-md rounded-br-md"
      >
        <ChevronRightIcon className="text-primary" />
      </Button>
    </div>
  );
};

export default CustomPagination;
