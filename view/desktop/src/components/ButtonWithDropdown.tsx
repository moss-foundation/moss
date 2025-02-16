import { cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, useRef, useState } from "react";

import { DropdownMenu as DM, Icon, Icons } from "@/components";
import { cn } from "@/utils";

interface ButtonWithDropDownProps extends Omit<ComponentPropsWithoutRef<"div">, "id"> {
  variant?: "solid" | "soft" | "outline" | "ghost";
  icon?: Icons;
  label?: string;
  compact?: boolean;
  iconClassName?: string;
  defaultAction?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

const buttonStyles = cva("relative box-border w-min rounded-sm transition", {
  variants: {
    variant: {
      solid: `  text-white`,
      soft: `   text-black`,
      outline: `text-black dark:text-white`,
      ghost: `  text-black dark:text-white`,
    },
    disabled: {
      false: null,
      true: "grayscale-100 hover:brightness-100 active:brightness-100 pointer-events-none",
    },
    loading: {
      false: null,
      true: "pointer-events-none [&>:not(.Loader)]:opacity-0",
    },
  },
});

const triggerStyles = cva(
  "relative flex items-center justify-center gap-1.5 text-ellipsis cursor-pointer border border-transparent",
  {
    variants: {
      variant: {
        solid: `  bg-[#0065ff] hover:bg-[#0052CC] active:bg-[#002D9C]`,
        soft: `   bg-[#F1F1F1] hover:bg-[#E8E8E8] active:bg-[#c6c6c6]`,
        outline: `border-[#E0E0E0] hover:border-[#E9E9E9] active:border-[#C6C6C6]`,
        ghost: `  bg-transparent hover:text-[#0052CC] active:text-[#002D9C]`,
      },
      open: {
        true: null,
        false: null,
      },
      size: {
        xs: "px-2      py-0",
        sm: "px-3      py-0.5",
        md: "px-[17px] py-[3px]",
        lg: "px-5.5    py-1.5",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        open: true,
        className: `bg-[#002D9C]`,
      },
      {
        variant: "soft",
        open: true,
        className: `bg-[#c6c6c6]`,
      },
      {
        variant: "outline",
        open: true,
        className: `border-[#C6C6C6]`,
      },
      {
        variant: "ghost",
        open: true,
        className: `text-[#002D9C]`,
      },
    ],
  }
);

const dropdownTriggerStyles = cva("flex items-center justify-center gap-1.5 text-ellipsis cursor-pointer", {
  variants: {
    variant: {
      solid: `  bg-[#0065ff] hover:bg-[#0052CC] active:bg-[#002D9C] `,
      soft: `   bg-[#F1F1F1] hover:bg-[#E8E8E8] active:bg-[#c6c6c6] `,
      outline: `border border-[#E0E0E0] hover:border-[#E9E9E9] active:border-[#C6C6C6] `,
      ghost: `  bg-transparent hover:text-[#0052CC] active:text-[#002D9C] `,
    },
    open: {
      true: null,
      false: null,
    },
    size: {
      xs: "px-0.5",
      sm: "px-1",
      md: "px-1.5",
      lg: "px-2",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      open: true,
      className: `bg-[#002D9C]`,
    },
    {
      variant: "soft",
      open: true,
      className: `bg-[#c6c6c6]`,
    },
    {
      variant: "outline",
      open: true,
      className: `border-[#C6C6C6]`,
    },
    {
      variant: "ghost",
      open: true,
      className: `text-[#002D9C]`,
    },
  ],
});

const loaderStyle = cva("Loader absolute flex items-center justify-center rounded-sm inset-0 w-full h-full ", {
  variants: {
    variant: {
      solid: `  bg-[#0065ff]`,
      soft: `   bg-[#F1F1F1]`,
      outline: "border border-[#E0E0E0]",
      ghost: null,
    },
  },
});

const dividerStyle = cva("min-w-px", {
  variants: {
    variant: {
      solid: `  bg-[#709CF5]`,
      soft: `   bg-[#c6c6c6]`,
      outline: `bg-[#E0E0E0]`,
      ghost: `  bg-transparent`,
    },
  },
});

const iconStyle = "size-3";

export const ButtonWithDropDown = ({
  variant = "solid",
  compact = false,
  icon,
  label,
  className,
  iconClassName,
  defaultAction,
  disabled,
  loading,
  size = "md",
  ...props
}: ButtonWithDropDownProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  if (!defaultAction) {
    return (
      <div ref={ref} className={cn(buttonStyles({ disabled, loading, variant }), className)} {...props}>
        <DM.Root open={open} onOpenChange={() => {}}>
          <DM.Trigger
            className={cn(triggerStyles({ variant, open, size }), "w-full rounded-sm")}
            onClick={() => {
              if (props.children) setOpen((prev) => !prev);
            }}
            disabled={disabled || loading}
          >
            {icon && <Icon icon={icon} className={cn(iconStyle, iconClassName)} />}
            {!compact && label && <span>{label}</span>}
            {props.children && <Icon icon="ArrowheadDown" className="-my-1 -mr-2" />}
          </DM.Trigger>

          {props.children && (
            <DM.Content className="z-50 flex flex-col text-black" onPointerDownOutside={() => setOpen(false)}>
              {props.children}
            </DM.Content>
          )}
        </DM.Root>
        {loading && (
          <div className={loaderStyle({ variant })}>
            <Icon icon="LoaderTailus" className="animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn(buttonStyles({ disabled, loading, variant }), className)} {...props}>
      <div className="items flex">
        <button
          className={cn(triggerStyles({ variant, size }), "grow rounded-l-sm border-r-0")}
          disabled={disabled || loading}
        >
          {icon && <Icon icon={icon} className={cn(iconStyle, iconClassName)} />}
          {!compact && label && <span>{label}</span>}
        </button>

        <div className={dividerStyle({ variant })} />

        <DM.Root open={open}>
          <DM.Trigger
            className={cn(dropdownTriggerStyles({ variant, open, size }), "rounded-r border-l-0")}
            onClick={() => setOpen((prev) => !prev)}
            disabled={disabled || loading}
          >
            <Icon icon="ArrowheadDown" />
          </DM.Trigger>

          <DM.Content className="z-50 flex flex-col text-black" onPointerDownOutside={() => setOpen(false)}>
            {props.children}
          </DM.Content>
        </DM.Root>
      </div>
      {loading && (
        <div className={loaderStyle({ variant })}>
          <Icon icon="LoaderTailus" className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ButtonWithDropDown;
