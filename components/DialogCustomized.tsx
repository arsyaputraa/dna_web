import { DialogContentProps, DialogProps } from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export interface DialogCustomizedProps extends DialogProps {
  contentProps?: DialogContentProps;
  header?: ReactNode;
  children: ReactNode;
}

const DialogCustomized = ({ ...props }: DialogCustomizedProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger
        asChild
        data-state={props.open ? "open" : "closed"}
      ></DialogTrigger>
      <DialogContent
        {...props.contentProps}
        data-state={props.open ? "open" : "closed"}
      >
        {props.children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogCustomized;
