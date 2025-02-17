import { Meta, StoryObj } from "@storybook/react";

import ButtonDropdown from "./ButtonDropdown";

const variants = ["solid", "outlined", "soft", "ghost"] as const;
const intents = ["primary", "warning", "success", "danger", "neutral"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const meta: Meta = {
  title: "Desktop/ButtonDropdown",
  component: ButtonDropdown,
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
    intent: "primary",
    variant: "solid",
    size: "md",
    label: "Dropdown",
  },
} satisfies Meta<typeof ButtonDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Intents: Story = {
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
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
                    <ButtonDropdown
                      {...args}
                      label={args.label}
                      intent={intent}
                      variant={variant}
                      onClick={() => {
                        console.log("Button clicked");
                      }}
                    >
                      <div>Button</div>
                    </ButtonDropdown>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
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
                    <ButtonDropdown {...args} size={size} label={args.label} intent={intent}>
                      <div>Button</div>
                    </ButtonDropdown>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    );
  },
};

export const Loading: Story = {
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
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
                    <ButtonDropdown {...args} label={args.label} intent={intent} variant={variant} loading>
                      <div>Button</div>
                    </ButtonDropdown>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
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
                    <ButtonDropdown {...args} label={args.label} intent={intent} variant={variant} disabled>
                      <div>Button</div>
                    </ButtonDropdown>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    );
  },
};
