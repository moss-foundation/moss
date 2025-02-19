import { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";
import Icon from "./Icon";

const variants = ["solid", "outlined", "soft", "ghost"] as const;
const intents = ["primary", "warning", "success", "danger", "neutral"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const meta: Meta = {
  title: "Desktop/Button",
  component: Button.Root,
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

  args: {
    loading: false,
    disabled: false,
    href: undefined,
    intent: "primary",
    variant: "solid",
    size: "md",
  },
} satisfies Meta<typeof Button.Root>;

export default meta;
export type Story = StoryObj<typeof meta>;

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
                    <Button.Root
                      {...args}
                      intent={intent}
                      variant={variant}
                      onClick={() => {
                        console.log("clicked");
                      }}
                    >
                      <Button.Label>Button</Button.Label>
                    </Button.Root>
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
                    <Button.Root {...args} intent={intent} size={size}>
                      <Button.Label>Button</Button.Label>
                    </Button.Root>
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
  args: {
    disabled: true,
  },
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
                    <Button.Root
                      {...args}
                      intent={intent}
                      variant={variant}
                      onClick={() => {
                        console.log("clicked");
                      }}
                    >
                      <Button.Label>Button</Button.Label>
                    </Button.Root>
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
  args: {
    loading: true,
    href: "https://www.google.com",
  },
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
        <tr>
          <th />
          {sizes.map((size) => {
            return <th className="text-left capitalize">{size}</th>;
          })}
        </tr>
        {variants.map((variant) => {
          return (
            <tr key={variant} className="align-bottom">
              <th className="text-left capitalize">{variant}</th>
              {sizes.map((size) => {
                return (
                  <td key={size}>
                    <Button.Root {...args} variant={variant} size={size}>
                      <Button.Label>Button</Button.Label>
                    </Button.Root>
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

export const WithIcons: Story = {
  render: (args) => {
    return (
      <table className="border-separate border-spacing-2">
        <tr>
          <td>
            <Button.Root {...args} className="flex gap-2">
              <Icon icon="ArrowRight" />
              <Button.Label>Label</Button.Label>
            </Button.Root>
          </td>
          <td>
            <Button.Root>
              <Icon icon="ArrowRight" />
            </Button.Root>
          </td>
          <td>
            <Button.Root {...args} className="flex gap-2">
              <Button.Label>Label</Button.Label>
              <Icon icon="ArrowRight" />
            </Button.Root>
          </td>
        </tr>
        <tr>
          <td>
            <Button.Root {...args} variant="outlined" className="flex gap-2">
              <Icon icon="ArrowRight" />
              <Button.Label>Label</Button.Label>
            </Button.Root>
          </td>
          <td>
            <Button.Root {...args} variant="outlined">
              <Icon icon="ArrowRight" />
            </Button.Root>
          </td>
          <td>
            <Button.Root {...args} variant="outlined" className="flex gap-2">
              <Button.Label>Label</Button.Label>
              <Icon icon="ArrowRight" />
            </Button.Root>
          </td>
        </tr>
        <tr>
          <td>
            <Button.Root {...args} variant="soft" className="flex gap-2">
              <Icon icon="ArrowRight" />
              <Button.Label>Label</Button.Label>
            </Button.Root>
          </td>
          <td>
            <Button.Root {...args} variant="soft">
              <Icon icon="ArrowRight" />
            </Button.Root>
          </td>
          <td>
            <Button.Root {...args} variant="soft" className="flex gap-2">
              <Button.Label>Label</Button.Label>
              <Icon icon="ArrowRight" />
            </Button.Root>
          </td>
        </tr>
        <tr>
          <td>
            <Button.Root {...args} variant="ghost" className="flex gap-2">
              <Icon icon="ArrowRight" />
              <Button.Label>Label</Button.Label>
            </Button.Root>
          </td>
          <td>
            <Button.Root {...args} variant="ghost">
              <Icon icon="ArrowRight" />
            </Button.Root>
          </td>
          <td>
            <Button.Root {...args} variant="ghost" className="flex gap-2">
              <Button.Label>Label</Button.Label>
              <Icon icon="ArrowRight" />
            </Button.Root>
          </td>
        </tr>
      </table>
    );
  },
};
