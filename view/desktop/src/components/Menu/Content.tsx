import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { cn } from "@/utils";
import * as MenuPrimitive from "@radix-ui/react-menu";

import { ScopedProps } from "./types";

export type ContentElement = ElementRef<typeof MenuPrimitive.Content>;
export type ContentProps = ScopedProps<ComponentPropsWithoutRef<typeof MenuPrimitive.Content>>;

export const Content = forwardRef<ContentElement, ContentProps>((props, forwardedRef) => {
  return (
    <MenuPrimitive.Content
      {...props}
      className={cn(
        "z-50 rounded-lg border border-[#c9ccd6] bg-white px-3 py-1.5 shadow-lg dark:border-[rgb(45,45,50)] dark:bg-[rgb(24,24,27)]",
        props.className
      )}
      ref={forwardedRef}
    />
  );
});
