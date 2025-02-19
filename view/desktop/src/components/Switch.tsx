import { cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, createContext, ElementRef, forwardRef, useContext } from "react";

import { cn } from "@/utils";
import * as Switch from "@radix-ui/react-switch";

const SwitchContext = createContext<{
  size?: "xs" | "sm" | "md" | "lg";
}>({ size: "md" });

const rootStyles = cva(
  `
    relative cursor-pointer inline-block rounded-full
    transition-[transform,width,background,border] focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 overflow-hidden

         bg-gray-200
    dark:bg-white/15

         border
         border-gray-900/5
    dark:border-white/5

         data-[state=checked]:border-[rgb(37,99,235)]
         data-[state=checked]:bg-[rgb(37,99,235)]
    dark:data-[state=checked]:border-[rgb(37,99,235)]
    dark:data-[state=checked]:bg-[rgb(37,99,235)]
  `,
  {
    variants: {
      size: {
        xs: "h-3 w-5",
        sm: "h-4 w-6",
        md: "h-5 w-8",
        lg: "h-6 w-9",
      },
      disabled: {
        true: "grayscale-100 pointer-events-none shadow-none",
        false: null,
      },
    },
  }
);

const Root = forwardRef<
  ElementRef<typeof Switch.Root>,
  ComponentPropsWithoutRef<typeof Switch.Root> & {
    size?: "xs" | "sm" | "md" | "lg";
  }
>(({ className, size = "md", disabled, ...props }, forwardedRef) => {
  return (
    <SwitchContext.Provider value={{ size }}>
      <Switch.Root className={cn(rootStyles({ size, disabled }), className)} {...props} ref={forwardedRef} />
    </SwitchContext.Provider>
  );
});

const thumbStyles = cva(
  `absolute my-auto inset-x-[1px] inset-y-0 rounded-full bg-white shadow-sm shadow-gray-950/25 ease-in-out duration-300 will-change-transform `,
  {
    variants: {
      size: {
        xs: "size-2 data-[state=checked]:translate-x-2",
        sm: "size-3 data-[state=checked]:translate-x-2",
        md: "size-4 data-[state=checked]:translate-x-3",
        lg: "size-5 data-[state=checked]:translate-x-[12px]",
      },
    },
  }
);

const Thumb = forwardRef<ElementRef<typeof Switch.Thumb>, ComponentPropsWithoutRef<typeof Switch.Thumb>>(
  ({ className, ...props }, forwardedRef) => {
    const { size } = useContext(SwitchContext);
    return <Switch.Thumb className={cn(thumbStyles({ size }), className)} {...props} ref={forwardedRef} />;
  }
);

export { Root, Thumb };
