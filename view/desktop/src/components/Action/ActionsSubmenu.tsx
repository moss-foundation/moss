import { ComponentPropsWithoutRef, useState } from "react";

import { DropdownMenu as DM, Icon, Icons } from "@/components";
import { cn } from "@/utils";
import { MenuItemVisibility, SubmenuMenuItem } from "@repo/moss-desktop";

const buttonStyle =
  "hover:border-[#c5c5c5] hover:bg-[#D3D3D3] box-border transition group flex rounded border border-transparent";
const triggerStyle = "hover:bg-[#D3D3D3] group flex w-full items-center justify-center gap-1.5 text-ellipsis";
const iconStyle = "group-active:text-black text-[#525252]";
const labelStyle = "group-active:text-black text-[#161616] break-keep w-max";

interface ActionsSubmenuProps extends Omit<ComponentPropsWithoutRef<"div">, "id" | "title">, SubmenuMenuItem {
  icon: Icons;
  iconClassName?: string;
  visibility: MenuItemVisibility;
}

export const ActionsSubmenu = ({
  icon,
  className,
  iconClassName,
  visibility,
  title,
  submenuId,
  defaultActionId,
  ...props
}: ActionsSubmenuProps) => {
  const [open, setOpen] = useState(false);
  const [key, origin, description] = title as string[];

  return (
    <div
      className={cn(buttonStyle, className, {
        "border-[#c5c5c5] bg-[#D3D3D3]": open,
      })}
      {...props}
    >
      <DM.Root open={open}>
        <DM.Trigger
          className={cn(triggerStyle, "self-stretch px-1 py-1", {
            "bg-[#D3D3D3]": open,
          })}
          onClick={() => setOpen((prev) => !prev)}
        >
          <Icon icon={icon} className={cn(iconStyle, iconClassName)} />
          {visibility === "classic" && origin && <span className={labelStyle}>{origin}</span>}
          <Icon icon="ArrowheadDown" className="-mr-1" />
        </DM.Trigger>

        <DM.Content className="z-50 flex flex-col" onPointerDownOutside={() => setOpen(false)}>
          {props.children}
        </DM.Content>
      </DM.Root>
    </div>
  );
};
