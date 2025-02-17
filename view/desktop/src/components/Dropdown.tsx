import { cn } from "@/utils";

import { DropdownMenu, Icon } from ".";
import Button, { ButtonProps } from "./Button";

export const Dropdown = ({
  label,
  children,
  ...props
}: ButtonProps & {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button.Root className={cn("flex justify-between gap-2 pr-2.5", props.className)} {...props}>
          <span>{label}</span>
          <Icon icon="ChevronDown" />
        </Button.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>{children}</DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
