import { Meta, StoryObj } from "@storybook/react";

import Dropdown from "./Dropdown";

const variants = ["solid", "outlined", "soft", "ghost"] as const;
const intents = ["primary", "warning", "success", "danger", "neutral"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const meta: Meta = {
  title: "Desktop/Dropdown",
  component: Dropdown,
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
    intent: {
      control: {
        type: "radio",
      },
      options: intents,
    },
    label: {
      control: {
        type: "text",
      },
    },
  },
  args: {
    loading: false,
    disabled: false,
    href: undefined,
    intent: "primary",
    variant: "solid",
    size: "md",
    label: "Dropdown",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Intents: Story = {
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
        <tbody>
          <tr>
            <th />
            {variants.map((variant) => {
              return <th className="text-left capitalize">{variant}</th>;
            })}
          </tr>
          {intents.map((intent) => {
            return (
              <tr key={intent}>
                <th className="text-left capitalize">{intent}</th>
                {variants.map((variant) => {
                  return (
                    <td key={variant}>
                      <Dropdown {...args} label={args.label} intent={intent} variant={variant}>
                        <div>Item 1</div>
                        <div>Item 2</div>
                        <div>Item 3</div>
                      </Dropdown>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
        <tbody>
          <tr>
            <th />
            {sizes.map((size) => {
              return <th className="text-left capitalize">{size}</th>;
            })}
          </tr>
          {intents.map((intent) => {
            return (
              <tr key={intent} className="align-bottom">
                <th className="text-left capitalize">{intent}</th>
                {sizes.map((size) => {
                  return (
                    <td key={size}>
                      <Dropdown {...args} size={size} label={args.label} intent={intent}>
                        <div>Item 1</div>
                        <div>Item 2</div>
                        <div>Item 3</div>
                      </Dropdown>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
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
        <tbody>
          <tr>
            {variants.map((variant) => {
              return <th className="text-left capitalize">{variant}</th>;
            })}
          </tr>

          <tr>
            {variants.map((variant) => {
              return (
                <td key={variant}>
                  <Dropdown {...args} label={args.label} variant={variant}>
                    <div>Item 1</div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                  </Dropdown>
                </td>
              );
            })}
          </tr>
        </tbody>
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
        <tbody>
          <tr>
            {sizes.map((size) => {
              return (
                <td key={size}>
                  <Dropdown {...args} size={size} label={args.label}>
                    <div>Item 1</div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                  </Dropdown>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  },
};
