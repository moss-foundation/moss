import { cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, useState } from "react";

import { DropdownMenu as DM, Icon } from "@/components";
import { cn } from "@/utils";

import Button from "./Button";

interface ButtonWithDropDownProps extends Omit<ComponentPropsWithoutRef<"button">, "id"> {
  variant?: "solid" | "soft" | "outlined" | "ghost";
  intent?: "primary" | "danger" | "warning" | "success" | "neutral";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}

const buttonStyles = cva("flex relative", {
  variants: {
    intent: {
      primary: `[--bg-solid:var(--moss-button-primary-solid-background)] [--bg-outlined:var(--moss-button-primary-outlined-background)] [--bg-soft:var(--moss-button-primary-soft-background)] [--bg-ghost:var(--moss-button-primary-ghost-background)]]`,
      warning: `[--bg-solid:var(--moss-button-warning-solid-background)] [--bg-outlined:var(--moss-button-warning-outlined-background)] [--bg-soft:var(--moss-button-warning-soft-background)] [--bg-ghost:var(--moss-button-warning-ghost-background)]]`,
      success: `[--bg-solid:var(--moss-button-success-solid-background)] [--bg-outlined:var(--moss-button-success-outlined-background)] [--bg-soft:var(--moss-button-success-soft-background)] [--bg-ghost:var(--moss-button-success-ghost-background)]]`,
      danger: ` [--bg-solid:var(--moss-button-danger-solid-background)]  [--bg-outlined:var(--moss-button-danger-outlined-background)]  [--bg-soft:var(--moss-button-danger-soft-background)]  [--bg-ghost:var(--moss-button-danger-ghost-background)]]`,
      neutral: `[--bg-solid:var(--moss-button-neutral-solid-background)] [--bg-outlined:var(--moss-button-neutral-outlined-background)] [--bg-soft:var(--moss-button-neutral-soft-background)] [--bg-ghost:var(--moss-button-neutral-ghost-background)]]`,
    },
    loading: {
      false: null,
      true: "pointer-events-none [&>:not(.Loader)]:opacity-0",
    },
  },
});

const dividerStyle = cva("min-w-px h-full", {
  variants: {
    variant: {
      solid: `   background-(--bg-solid)`,
      outlined: `background-(--bg-outlined)`,
      soft: `    background-(--bg-soft)`,
      ghost: `   background-transparent`,
    },
  },
});

const loaderStyle = cva("Loader absolute flex items-center justify-center rounded-sm inset-0 w-full h-full ", {
  variants: {
    variant: {
      solid: `   background-(--bg-solid) text-white`,
      outlined: `background-(--bg-outlined)`,
      soft: `    background-(--bg-soft)`,
      ghost: `   background-transparent`,
    },
  },
});

export const ButtonDropdown = ({
  variant = "solid",
  intent = "primary",
  size = "md",
  disabled = false,
  loading = false,
  ...props
}: ButtonWithDropDownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={buttonStyles({ loading, intent })}>
      <Button.Root
        disabled={disabled || loading}
        variant={variant}
        intent={intent}
        size={size}
        className={cn("rounded-r-none border-r-0", props.className)}
        {...props}
      >
        {props.label}
      </Button.Root>

      <div className={dividerStyle({ variant })} />

      <DM.Root open={open}>
        <DM.Trigger onClick={() => setOpen((prev) => !prev)} disabled={disabled || loading} asChild>
          <Button.Root variant={variant} intent={intent} size={size} className="rounded-l-none border-l-0">
            <Icon icon="ArrowheadDown" />
          </Button.Root>
        </DM.Trigger>

        <DM.Content
          className="z-50 flex flex-col text-black"
          onPointerDownOutside={() => setOpen(false)}
          align="start"
          alignOffset={30}
        >
          {props.children}
        </DM.Content>
      </DM.Root>

      {loading && (
        <div className={loaderStyle({ variant })}>
          <Icon icon="LoaderTailus" className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ButtonDropdown;
