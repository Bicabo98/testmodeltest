import { FC } from "react";
import { Link, useLocation } from "react-router";

// import { MenuHomeIconSvg, MenuDatabaseIconSvg } from "../svg/home";
import { HomeIcon, ModelIcon, MarketIcon, DaoIcon } from '../svg/icons/tabbar'

import { cn } from "@/lib/utils";

export interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
}
export const MenuItem: FC<MenuItemProps> = ({
  title,
  icon,
  href,
  isActive,
}) => {
  return (
    <Link to={href} className="flex items-center">
      <div className=" flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <div
            className={cn(" size-6 text-[#AAADBA]", isActive && "text-white")}
          >
            {icon}
          </div>
          <div
            className={cn("w-4 h-0.5 rounded-sm", isActive && "bg-white")}
          ></div>
        </div>
        <div
          className={cn(
            " text-[#AAADBA] font-semibold text-xs",
            isActive && "text-white"
          )}
        >
          {title}
        </div>
      </div>
    </Link>
  );
};

export interface MobileNavBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  active?: boolean;
}

export const MobileNavBar: FC<MobileNavBarProps> = () => {
  const location = useLocation();
  // const isMobile = useIsMobile();
  return (
    <div className=" fixed left-0 bottom-6 w-full z-50 px-4">
      <div className=" border border-white rounded-full py-4 bg-[#171619] items-center text-[#AAADBA] grid grid-cols-4 place-items-center">
        <MenuItem
          title="Home"
          icon={<HomeIcon className="size-6" />}
          href="/portal"
          isActive={location.pathname.startsWith("/portal")}
        />
        {/* <div
          className=" from-[#20EAC8] cursor-pointer to-[#00E1FF] size-12 rounded-full justify-center bg-gradient-to-r flex items-center gap-2 px-2 py-3 mx-4 text-white cursor-pointer relative"
          onClick={() => {
            window.open("https://dgraph.hetuscan.com", "_blank");
          }}
        >
          <div className=" flex items-center text-black gap-4">
            <HetuScanIcon className=" size-6" />
          </div>
        </div> */}
        <MenuItem
          title="Dao"
          icon={<DaoIcon className=" size-6" />}
          href="/dao"
          isActive={location.pathname.startsWith("/dao")}
        />
        <MenuItem
          title="Model"
          icon={<ModelIcon className=" size-6" />}
          href="/model"
          isActive={location.pathname.startsWith("/model")}
        />
        <MenuItem
          title="Market"
          icon={<MarketIcon className=" size-6" />}
          href="/market"
          isActive={location.pathname.startsWith("/market")}
        />
      </div>
    </div>
  );
};
