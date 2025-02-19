import { cva } from "class-variance-authority";
import React from "react";

import { cn } from "@/utils";

import Icon, { Icons } from "./Icon";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "plain" | "soft" | "outlined" | "mixed" | "bottomOutlined";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  iconLeft?: Icons;
  iconRight?: Icons;
}

const inputStyles = cva(
  "w-full flex gap-2 items-center peer placeholder-[rgb(161,161,170)] dark:placeholder-[rgb(82,82,91)] text-[rgb(9,9,11)] dark:text-white",
  {
    variants: {
      variant: {
        plain: `
          py-0 rounded-sm
          background-(--moss-input-bg-plain)
          transition-[outline] outline-none
          has-[input:data-[valid]]:text-[rgba(22,101,52,25)]
          has-[input:dark:data-[valid]]:text-[rgb(220,252,231)]
          has-[input:data-[invalid]]:text-[rgb(220,38,38)]
          has-[input:dark:data-[invalid]]:text-[rgb(248,113,113)]
        `,
        soft: `
          rounded-sm
          background-(--moss-input-bg-soft)
          transition-[outline] outline-none
          has-[input:focus-within]:brightness-95
          has-[input:focus-within]:dark:brightness-105
          has-[input:data-[valid]]:bg-[rgb(220,252,231)]
          has-[input:dark:data-[valid]]:bg-[rgba(22,101,52,25)]
          has-[input:data-[invalid]]:bg-[rgb(254,226,226)]
          has-[input:dark:data-[invalid]]:bg-[rgba(153,27,27,25)]
        `,
        outlined: `
          rounded-sm
          background-(--moss-input-bg-outlined)
          transition-[outline]
          has-[input:focus-within]:outline-2
          has-[input:focus-within]:outline-[rgb(37,99,235)]
          has-[input:focus-within]:-outline-offset-1
          border border-(--moss-input-border-outlined)
          has-[input:data-[valid]]:border-[rgb(22,163,74)]
          has-[input:focus-within]:[data-[valid]]:outline-[rgb(22,163,74)]
          has-[input:dark:data-[valid]]:border-[rgb(34,197,94)]
          has-[input:focus-within]:[dark:data-[valid]]:outline-[rgb(34,197,94)]
          has-[input:data-[invalid]]:border-[rgb(220,38,38)]
          has-[input:focus-within]:[data-[invalid]]:outline-[rgb(220,38,38)]
          has-[input:dark:data-[invalid]]:border-[rgb(239,68,68)]
          has-[input:focus-within]:[dark:data-[invalid]]:outline-[rgb(239,68,68)]
        `,
        mixed: `
          rounded-sm
          background-(--moss-input-bg-mixed)
          transition-[outline]
          has-[input:focus-within]:outline-2
          has-[input:focus-within]:outline-[rgb(37,99,235)]
          shadow-sm shadow-gray-900/5
          has-[input:focus-within]:-outline-offset-1
          border border-(--moss-input-border-mixed)
          dark:shadow-gray-900/35
          has-[input:data-[valid]]:border-[rgb(22,163,74)]
          has-[input:focus-within]:[data-[valid]]:outline-[rgb(22,163,74)]
          has-[input:dark:data-[valid]]:border-[rgb(34,197,94)]
          has-[input:focus-within]:[dark:data-[valid]]:outline-[rgb(34,197,94)]
          has-[input:data-[invalid]]:border-[rgb(220,38,38)]
          has-[input:focus-within]:[data-[invalid]]:outline-[rgb(220,38,38)]
          has-[input:dark:data-[invalid]]:border-[rgb(239,68,68)]
          has-[input:focus-within]:[dark:data-[invalid]]:outline-[rgb(239,68,68)]
        `,
        bottomOutlined: `
          rounded-none
          background-(--moss-input-bg-bottomOutlined)
          transition-[border] outline-none
          border-b border-(--moss-input-border-bottomOutlined)
          has-[input:focus-within]:border-b-2
          has-[input:focus-within]:border-[rgb(37,99,235)]
          has-[input:data-[valid]]:border-[rgb(74,222,128)]
          has-[input:dark:data-[valid]]:border-[rgb(22,163,74)]
          has-[input:data-[invalid]]:border-[rgb(248,113,113)]
          has-[input:dark:data-[invalid]]:border-[rgb(220,38,38)]
        `,
      },
      size: {
        xs: "h-6 px-2.5",
        sm: "h-7 px-2.5",
        md: "h-9 px-3",
        lg: "h-10 px-4 text-base",
        xl: "h-12 px-5 text-base",
      },
      disabled: {
        false: null,
        true: "cursor-not-allowed opacity-50 active:pointer-events-none",
      },
    },
  }
);

const iconsStyles = cva("", {
  variants: {
    size: {
      xs: "size-4",
      sm: "size-4",
      md: "size-4",
      lg: "size-4.5",
      xl: "size-5",
    },
  },
});

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "mixed", className, size = "md", disabled = false, iconLeft, iconRight, ...props }, forwardedRef) => {
    return (
      <div className={cn(inputStyles({ variant, disabled, size }), className)}>
        {iconLeft && <Icon icon={iconLeft} className={iconsStyles({ size })} />}

        <input ref={forwardedRef} disabled={disabled} {...props} className="h-full w-full outline-none" />

        {iconRight && <Icon icon={iconRight} className={iconsStyles({ size })} />}
      </div>
    );
  }
);

export default Input;
