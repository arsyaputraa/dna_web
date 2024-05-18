import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  error?: boolean;
  inputClassname?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      endAdornment,
      startAdornment,
      error,
      inputClassname,
      ...props
    },
    ref
  ) => {
    if (!!endAdornment || !!startAdornment) {
      return (
        <div
          className={`${cn(
            "flex h-9 grow rounded-lg border border-input items-center bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )} ${error ? "border-red-500" : ""}`}
        >
          <div className="flex justify-end ml-3">{startAdornment}</div>
          <input
            type={type}
            ref={ref}
            {...props}
            className={`${cn(
              "grow pl-2 pr-2 py-2 outline-none border-none bg-transparent flex w-full text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              inputClassname
            )}`}
          />
          <div className="flex justify-end mr-3">{endAdornment}</div>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
