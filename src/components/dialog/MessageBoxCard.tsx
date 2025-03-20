import { XIcon } from "lucide-react";
import { FC } from "react";
import { cn } from "@/lib/utils";
export interface MessageBoxCardProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  type?: "success" | "error";
}

export const MessageBoxCardOld: FC<MessageBoxCardProps> = ({
  children,
  className,
  onClose,
  type = "success",
}) => {
  return (
    <div className={cn(" relative", className)}>
      <div
        className={cn(
          " bg-[#15B712]  rounded-lg border border-white border-opacity-70",
          type === "error" && "bg-[#DA1616]"
        )}
      >
        <div className=" w-full h-full bg-black -translate-x-1 -translate-y-2 rounded-lg border border-white border-opacity-70 relative">
          <div className=" absolute top-3 right-3">
            <div className=" relative size-7 cursor-pointer" onClick={onClose}>
              <div className=" absolute rounded-sm border border-white w-full h-full bg-white"></div>
              <div className="absolute rounded-sm border border-white w-full h-full bg-black flex items-center justify-center -translate-x-[1px] -translate-y-[1px]">
                <div className="p-1">
                  <XIcon className=" size-4 text-white m-1" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export const MessageBoxCard: FC<MessageBoxCardProps> = ({
  children,
  className,
  onClose,
}) => {
  return (
    <div className={cn(" relative", className)}>
      <div className="p-1 flex justify-end">
        <div className="cursor-pointer size-6 flex items-center justify-center bg-black rounded-full" onClick={onClose}>
          <XIcon className=" size-4 text-white m-1" strokeWidth={3} />
        </div>
      </div>
      <div> {children}</div>
    </div>
  );
};
