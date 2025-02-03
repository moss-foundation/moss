import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@repo/moss-ui";

export interface CheckboxProps {
  className?: string;
}

const defaultCheckboxRootStyles = `border shadow-sm group rounded peer flex justify-center items-center size-[1.125rem] focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 text-white
  hover:brightness-95
  focus-visible:outline

  data-[state=checked]:border-none
  data-[state=checked]:bg-blue-400
  data-[state=indeterminate]:border-none

  disabled:bg-gray-300
  disabled:opacity-50
  disabled:border-gray-300
  disabled:shadow-none
  disabled:cursor-not-allowed

  disabled:data-[state=checked]:bg-gray-300
  disabled:data-[state=checked]:shadow-none
  disabled:data-[state=indeterminate]:bg-gray-300
  disabled:data-[state=indeterminate]:shadow-none`;

const CheckboxRoot = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & CheckboxProps
>(({ className, ...props }: CheckboxProps, forwardedRef) => {
  return <CheckboxPrimitive.Root ref={forwardedRef} className={cn(defaultCheckboxRootStyles, className)} {...props} />;
});

const Root = CheckboxRoot;
const Indicator = CheckboxPrimitive.Indicator;

export { Root, Indicator };
