import { cva } from "class-variance-authority";
import { Children, forwardRef, HTMLAttributes, isValidElement } from "react";

import { cn, Icon } from "@repo/moss-ui";

export type Root = typeof Root;
export type Label = typeof Label;

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  intent?: "primary" | "danger" | "warning" | "success" | "neutral";
  variant?: "solid" | "outlined" | "soft" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const buttonRootStyles = cva(
  "relative flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 ",
  {
    variants: {
      intent: {
        primary: `[--bg:var(--color-button-primary-bg)] [--bg-hover:var(--color-button-primary-bg-hover)] [--bg-disabled:var(--color-button-primary-bg-disabled)] [--bg-active:var(--color-button-primary-bg-active)] [--bg-focused:var(--color-button-primary-bg-focused)] [--bg-pressed:var(--color-button-primary-bg-pressed)] [--border:var(--color-button-primary-border)] [--border-hover:var(--color-button-primary-border-hover)] [--border-disabled:var(--color-button-primary-border-disabled)] [--border-active:var(--color-button-primary-border-active)] [--border-focused:var(--color-button-primary-border-focused)] [--border-pressed:var(--color-button-primary-border-pressed)] [--text:var(--color-button-primary-text)] [--text-hover:var(--color-button-primary-text-hover)] [--text-disabled:var(--color-button-primary-text-disabled)] [--text-active:var(--color-button-primary-text-active)] [--text-focused:var(--color-button-primary-text-focused)] [--text-pressed:var(--color-button-primary-text-pressed)] [--ring:var(--color-button-primary-ring)] [--ring-hover:var(--color-button-primary-ring-hover)] [--ring-disabled:var(--color-button-primary-ring-disabled)] [--ring-active:var(--color-button-primary-ring-active)] [--ring-focused:var(--color-button-primary-ring-focused)] [--ring-pressed:var(--color-button-primary-ring-pressed)]`,
        warning: `[--bg:var(--color-button-warning-bg)] [--bg-hover:var(--color-button-warning-bg-hover)] [--bg-disabled:var(--color-button-warning-bg-disabled)] [--bg-active:var(--color-button-warning-bg-active)] [--bg-focused:var(--color-button-warning-bg-focused)] [--bg-pressed:var(--color-button-warning-bg-pressed)] [--border:var(--color-button-warning-border)] [--border-hover:var(--color-button-warning-border-hover)] [--border-disabled:var(--color-button-warning-border-disabled)] [--border-active:var(--color-button-warning-border-active)] [--border-focused:var(--color-button-warning-border-focused)] [--border-pressed:var(--color-button-warning-border-pressed)] [--text:var(--color-button-warning-text)] [--text-hover:var(--color-button-warning-text-hover)] [--text-disabled:var(--color-button-warning-text-disabled)] [--text-active:var(--color-button-warning-text-active)] [--text-focused:var(--color-button-warning-text-focused)] [--text-pressed:var(--color-button-warning-text-pressed)] [--ring:var(--color-button-warning-ring)] [--ring-hover:var(--color-button-warning-ring-hover)] [--ring-disabled:var(--color-button-warning-ring-disabled)] [--ring-active:var(--color-button-warning-ring-active)] [--ring-focused:var(--color-button-warning-ring-focused)] [--ring-pressed:var(--color-button-warning-ring-pressed)]`,
        success: `[--bg:var(--color-button-success-bg)] [--bg-hover:var(--color-button-success-bg-hover)] [--bg-disabled:var(--color-button-success-bg-disabled)] [--bg-active:var(--color-button-success-bg-active)] [--bg-focused:var(--color-button-success-bg-focused)] [--bg-pressed:var(--color-button-success-bg-pressed)] [--border:var(--color-button-success-border)] [--border-hover:var(--color-button-success-border-hover)] [--border-disabled:var(--color-button-success-border-disabled)] [--border-active:var(--color-button-success-border-active)] [--border-focused:var(--color-button-success-border-focused)] [--border-pressed:var(--color-button-success-border-pressed)] [--text:var(--color-button-success-text)] [--text-hover:var(--color-button-success-text-hover)] [--text-disabled:var(--color-button-success-text-disabled)] [--text-active:var(--color-button-success-text-active)] [--text-focused:var(--color-button-success-text-focused)] [--text-pressed:var(--color-button-success-text-pressed)] [--ring:var(--color-button-success-ring)] [--ring-hover:var(--color-button-success-ring-hover)] [--ring-disabled:var(--color-button-success-ring-disabled)] [--ring-active:var(--color-button-success-ring-active)] [--ring-focused:var(--color-button-success-ring-focused)] [--ring-pressed:var(--color-button-success-ring-pressed)]`,
        danger: ` [--bg:var(--color-button-danger-bg)] [--bg-hover:var(--color-button-danger-bg-hover)] [--bg-disabled:var(--color-button-danger-bg-disabled)] [--bg-active:var(--color-button-danger-bg-active)] [--bg-focused:var(--color-button-danger-bg-focused)] [--bg-pressed:var(--color-button-danger-bg-pressed)] [--border:var(--color-button-danger-border)] [--border-hover:var(--color-button-danger-border-hover)] [--border-disabled:var(--color-button-danger-border-disabled)] [--border-active:var(--color-button-danger-border-active)] [--border-focused:var(--color-button-danger-border-focused)] [--border-pressed:var(--color-button-danger-border-pressed)] [--text:var(--color-button-danger-text)] [--text-hover:var(--color-button-danger-text-hover)] [--text-disabled:var(--color-button-danger-text-disabled)] [--text-active:var(--color-button-danger-text-active)] [--text-focused:var(--color-button-danger-text-focused)] [--text-pressed:var(--color-button-danger-text-pressed)] [--ring:var(--color-button-danger-ring)] [--ring-hover:var(--color-button-danger-ring-hover)] [--ring-disabled:var(--color-button-danger-ring-disabled)] [--ring-active:var(--color-button-danger-ring-active)] [--ring-focused:var(--color-button-danger-ring-focused)] [--ring-pressed:var(--color-button-danger-ring-pressed)]`,
        neutral: `[--bg:var(--color-button-neutral-bg)] [--bg-hover:var(--color-button-neutral-bg-hover)] [--bg-disabled:var(--color-button-neutral-bg-disabled)] [--bg-active:var(--color-button-neutral-bg-active)] [--bg-focused:var(--color-button-neutral-bg-focused)] [--bg-pressed:var(--color-button-neutral-bg-pressed)] [--border:var(--color-button-neutral-border)] [--border-hover:var(--color-button-neutral-border-hover)] [--border-disabled:var(--color-button-neutral-border-disabled)] [--border-active:var(--color-button-neutral-border-active)] [--border-focused:var(--color-button-neutral-border-focused)] [--border-pressed:var(--color-button-neutral-border-pressed)] [--text:var(--color-button-neutral-text)] [--text-hover:var(--color-button-neutral-text-hover)] [--text-disabled:var(--color-button-neutral-text-disabled)] [--text-active:var(--color-button-neutral-text-active)] [--text-focused:var(--color-button-neutral-text-focused)] [--text-pressed:var(--color-button-neutral-text-pressed)] [--ring:var(--color-button-neutral-ring)] [--ring-hover:var(--color-button-neutral-ring-hover)] [--ring-disabled:var(--color-button-neutral-ring-disabled)] [--ring-active:var(--color-button-neutral-ring-active)] [--ring-focused:var(--color-button-neutral-ring-focused)] [--ring-pressed:var(--color-button-neutral-ring-pressed)]`,
      },
      variant: {
        solid:
          "background-(--bg) inset-border border-(--border) hover:background-(--bg-hover) text-(--text) focus:ring-(--ring)",
        outlined: "inset-border border-(--border) background-(--ring) text-(--bg) focus:ring-(--border) ",
        soft: "background-(--bg-hover) text-(--text)  focus:ring-(--ring)",
        ghost: "text-(--bg) hover:background-(--ring) focus:ring-transparent",
      },
      size: {
        "xs": "h-7",
        "sm": "h-8",
        "md": "h-9",
        "lg": "h-10",
        "xl": "h-12",
      },
      disabled: {
        false: null,
        true: "opacity-40 cursor-not-allowed",
      },
      loading: {
        false: null,
        true: "[&>:not(.LoadingIcon)]:opacity-0 cursor-progress",
      },
      Component: {
        a: "max-w-max",
        button: null,
      },
      iconOnly: {
        false: "notOnlyIcon",
        true: "iconOnly",
      },
    },
    compoundVariants: [
      {
        iconOnly: true,
        size: "xs",
        className: "px-1.5",
      },
      {
        iconOnly: false,
        size: "xs",
        className: "px-3",
      },
      {
        iconOnly: true,
        size: "sm",
        className: "px-2",
      },
      {
        iconOnly: false,
        size: "sm",
        className: "px-3.5",
      },

      {
        iconOnly: true,
        size: "md",
        className: "px-2.5",
      },
      {
        iconOnly: false,
        size: "md",
        className: " px-4",
      },
      {
        iconOnly: true,
        size: "lg",
        className: "px-3",
      },
      {
        iconOnly: false,
        size: "lg",
        className: " px-5",
      },
      {
        iconOnly: true,
        size: "xl",
        className: "px-4",
      },
      {
        iconOnly: false,
        size: "xl",
        className: "px-6",
      },
    ],
  }
);

export const Label = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <span className={className} {...props} ref={forwardedRef}>
        {children}
      </span>
    );
  }
);

export const Root = forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  (
    { className, variant = "solid", size = "md", disabled, loading, href, children, intent = "primary", ...props },
    forwardedRef
  ) => {
    const Component = href ? "a" : "button";
    const iconOnly =
      Children.toArray(children).length === 1 &&
      Children.toArray(children).some((child) => isValidElement(child) && child.type === Icon);

    return (
      <Component
        ref={forwardedRef}
        href={href}
        className={cn(buttonRootStyles({ intent, variant, size, disabled, loading, className, Component, iconOnly }))}
        disabled={disabled || loading}
        {...props}
      >
        {children}

        {loading && (
          <div className="LoadingIcon absolute inset-0 grid place-items-center">
            <Icon icon="Loader" className="animate-spin" />
          </div>
        )}
      </Component>
    );
  }
);

export default { Root, Label };
