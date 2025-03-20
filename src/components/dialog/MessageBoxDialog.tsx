import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FC } from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import React from "react";
import { MessageBoxCard } from "./MessageBoxCard";
import { XIcon } from "lucide-react";
export interface MessageBoxDialogProps extends DialogProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

export const MessageBoxDialogOld: FC<MessageBoxDialogProps> = ({
  children,
  ...props
}) => {
  return (
    <Dialog {...props}>
      <DialogContent
        className=" bg-transparent p-4 md:p-0 border-none focus:outline-none"
        autoFocus={false}
      >
        <DialogTitle></DialogTitle>
        <div className="">
          <MessageBoxCard
            className=""
            onClose={() => {
              props.onOpenChange?.(false);
            }}
          >
            {children}
          </MessageBoxCard>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const MessageBoxDialog: FC<MessageBoxDialogProps> = ({
  children,
  ...props
}) => {
  return (
    <Dialog {...props}>
      <DialogContent
        className=" bg-transparent p-4 md:p-0 border-none focus:outline-none"
        autoFocus={false}
      >
        <DialogTitle></DialogTitle>
        <div className=" bg-white rounded-2xl border-2 border-black">
          <div className="flex justify-end w-full pr-4 pt-4">
            <div
              className="cursor-pointer size-6 flex items-center justify-center bg-black rounded-full"
              onClick={() => {
                props.onOpenChange?.(false);
                props.onClose?.();
              }}
            >
              <XIcon className=" size-4 text-white m-1" strokeWidth={3} />
            </div>
          </div>
          <div className="">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
