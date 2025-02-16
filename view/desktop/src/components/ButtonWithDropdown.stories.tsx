import * as icons from "@repo/icongen";
import { Meta, StoryObj } from "@storybook/react";

import ButtonWithDropdown from "./ButtonWithDropdown";

const variants = ["solid", "soft", "outline", "ghost"] as const;
const sizes = ["xs", "sm", "md", "lg"] as const;

console.log({ icons });

const meta: Meta = {
  title: "Desktop/ButtonWithDropdown",
  component: ButtonWithDropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="text-(--moss-primary)">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: variants,
    },
    size: {
      control: {
        type: "radio",
      },
      options: sizes,
    },
    icon: {
      control: {
        type: "select",
      },
      options: Object.keys(icons),
    },
  },
  args: {
    loading: false,
    disabled: false,
    label: "Button",
    icon: undefined,
    className: "",
    size: "md",
    compact: false,
    iconClassName: "",
  },
} satisfies Meta<typeof ButtonWithDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  args: {},
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
        {variants.map((variant) => (
          <tr>
            <th className="text-left capitalize">{variant}</th>
            <td>
              <ButtonWithDropdown {...args} variant={variant} />
            </td>
            <td>
              <ButtonWithDropdown {...args} variant={variant}>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
            <td>
              <ButtonWithDropdown {...args} variant={variant} defaultAction>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
          </tr>
        ))}
      </table>
    );
  },
};

export const Sizes: Story = {
  args: {},
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
        {sizes.map((size) => (
          <tr>
            <th className="text-left capitalize">{size}</th>
            <td>
              <ButtonWithDropdown {...args} size={size} />
            </td>
            <td>
              <ButtonWithDropdown {...args} size={size}>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
            <td>
              <ButtonWithDropdown {...args} size={size} defaultAction>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
          </tr>
        ))}
      </table>
    );
  },
};

export const WithIcons: Story = {
  args: {
    icon: "CheckLucide",
  },
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
        {variants.map((variant) => (
          <tr>
            <th className="text-left capitalize">{variant}</th>
            <td>
              <ButtonWithDropdown {...args} variant={variant} />
            </td>
            <td>
              <ButtonWithDropdown {...args} variant={variant}>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
            <td>
              <ButtonWithDropdown {...args} variant={variant} defaultAction>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
          </tr>
        ))}
      </table>
    );
  },
};

export const Compact: Story = {
  args: {
    icon: "CheckLucide",
    compact: true,
  },
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
        {sizes.map((size) => (
          <tr>
            <th className="text-left capitalize">{size}</th>
            <td>
              <ButtonWithDropdown {...args} size={size} />
            </td>
            <td>
              <ButtonWithDropdown {...args} size={size}>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
            <td>
              <ButtonWithDropdown {...args} size={size} defaultAction>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
          </tr>
        ))}
      </table>
    );
  },
};

export const FullWidth: Story = {
  args: {
    className: "w-full",
    label: "Commit",
    icon: "CheckLucide",
  },
  render: (args) => {
    return (
      <div className="flex flex-col gap-4">
        <ButtonWithDropdown {...args} />

        <ButtonWithDropdown {...args}>
          <div>123</div>
        </ButtonWithDropdown>

        <ButtonWithDropdown {...args} defaultAction>
          <div>123</div>
        </ButtonWithDropdown>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
        {variants.map((variant) => (
          <tr>
            <th className="text-left capitalize">{variant}</th>
            <td>
              <ButtonWithDropdown {...args} variant={variant} />
            </td>
            <td>
              <ButtonWithDropdown {...args} variant={variant}>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
            <td>
              <ButtonWithDropdown {...args} variant={variant} defaultAction>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
          </tr>
        ))}
      </table>
    );
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
        {variants.map((variant) => (
          <tr>
            <th className="text-left capitalize">{variant}</th>
            <td>
              <ButtonWithDropdown {...args} variant={variant} />
            </td>
            <td>
              <ButtonWithDropdown {...args} variant={variant}>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
            <td>
              <ButtonWithDropdown {...args} variant={variant} defaultAction>
                <div>123</div>
              </ButtonWithDropdown>
            </td>
          </tr>
        ))}
      </table>
    );
  },
};
