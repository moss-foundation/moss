import { useState } from "react";

import { cn } from "@/utils";
import * as icons from "@repo/icongen";
import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";
import { Icon, Icons } from "./Icon";
import Input from "./Input";
import Select from "./Select";

const iconOptions = Object.keys(icons) as Icons[];

const meta: Meta<typeof Icon> = {
  title: "Desktop/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    className: "text-6xl",
  },
  argTypes: {
    icon: { control: { type: "select" }, options: iconOptions },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    icon: null,
    className: "text-6xl",
  },
  render: () => <GalleryComponent />,
};

const IconCodeSnippet = ({ selectedIcon, computedClassName }: { selectedIcon?: string; computedClassName: string }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const snippet1 = `<Icon name="${selectedIcon}" className="${computedClassName}" />`;
  const snippet2 = `className="${computedClassName}"`;
  const snippet3 = `${computedClassName}`;

  const CopyButton = ({ ...props }) => {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
      setCopied(true);

      setTimeout(() => setCopied(false), 3999);
    };

    return (
      <div className="grid h-full place-items-center pr-1">
        <button {...props} className="size-4 cursor-pointer text-white" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {copied ? (
              <>
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="m9 14 2 2 4-4" />
              </>
            ) : (
              <>
                {" "}
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              </>
            )}
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex min-h-5 w-full justify-between bg-[#1c2021]">
        <div>
          <div>
            <span className="text-[#83a598]">{"<"}</span>
            <span className="text-[#8ec07c]">Icon </span>
          </div>
          <div className="pl-4">
            <span className="text-[#ffb224]">name</span>
            <span className="text-[#6bc084]">=</span>
            <span className="text-[#aa997f]">"</span>
            <span className="text-[#9bbb2a]">{selectedIcon}</span>
            <span className="text-[#aa997f]">" </span>
          </div>
          <div className="pl-4">
            <span className="text-[#ffb224]">className</span>
            <span className="text-[#6bc084]">=</span>
            <span className="text-[#aa997f]">"</span>
            <span className="text-[#9bbb2a]">{computedClassName}</span>
            <span className="text-[#aa997f]">"</span>
          </div>
          <div>
            <span className="text-[#83a598]"> {"/>"} </span>
          </div>
        </div>
        <CopyButton onClick={() => handleCopy(snippet1)} />
      </div>

      <div className="flex min-h-5 w-full justify-between bg-[#1c2021]">
        <div>
          <span className="text-[#ffb224]">className</span>
          <span className="text-[#6bc084]">=</span>
          <span className="text-[#aa997f]">"</span>
          <span className="text-[#9bbb2a]">{computedClassName}</span>
          <span className="text-[#aa997f]">"</span>
        </div>
        <CopyButton onClick={() => handleCopy(snippet2)} />
      </div>

      <div className="flex min-h-5 w-full justify-between bg-[#1c2021]">
        <span className="text-[#9bbb2a]">{computedClassName}</span>
        <CopyButton onClick={() => handleCopy(snippet3)} />
      </div>
    </div>
  );
};

const GalleryComponent = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | undefined>(undefined);

  const handleSetSelectedIcon = (icon: string) => {
    if (selectedIcon === icon) setSelectedIcon(undefined);
    else setSelectedIcon(icon);
  };

  const [search, setSearch] = useState("");

  const filteredIcons = () => {
    if (search === "") {
      return Object.entries(icons);
    }
    return Object.entries(icons).filter(([name]) => {
      return name.toLowerCase().includes(search.toLowerCase());
    });
  };

  const [lastChosenSizeType, setLastChosenSizeType] = useState<"TW" | "px" | undefined>(undefined);
  const handleResetButton = () => {
    setAllIconsSize("13");
    setAllIconsSizeTW("text-base");
    setLastChosenSizeType(undefined);
  };

  //all sizes
  const [allIconsSize, setAllIconsSize] = useState("13");
  const handleAllIconsSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllIconsSize(e.target.value);
    setLastChosenSizeType("px");
  };

  const [allIconsSizeTW, setAllIconsSizeTW] = useState("text-base");
  const handleAllIconsSizeTWChange = (value: string) => {
    setAllIconsSizeTW(value);
    setLastChosenSizeType("TW");
  };
  const tailwindSizes = [
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "text-7xl",
    "text-8xl",
    "text-9xl",
  ];

  //all colors
  const [allColors, setAllColors] = useState("#808080");
  const handleAllColorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllColors(e.target.value);
  };

  const computedClassName = [
    allColors !== "#808080" && `text-[${allColors}]`,
    lastChosenSizeType === "TW" && allIconsSizeTW,
    lastChosenSizeType === "px" && `text-${allIconsSize}px`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("background-(--moss-page-background) h-screen overflow-auto px-4 pt-4 pb-12")}>
      <div className="flex gap-6">
        <div className="flex w-full flex-col gap-6">
          <datalist id="IconGalleryDatalist">
            {Object.keys(icons).map((icon) => (
              <option value={icon} />
            ))}
          </datalist>

          <Input
            list="IconGalleryDatalist"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className={cn("w-full")}
            placeholder={`Search for ${Object.keys(icons).length} icons`}
          />

          <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6">
            {filteredIcons().map(([name, Icon]) => (
              <div
                className={cn(
                  "flex size-40 cursor-pointer flex-col rounded-2xl bg-white pb-2 shadow-lg dark:bg-gray-900",
                  {
                    "shadow-none outline-2 outline-sky-300": name === selectedIcon,
                  }
                )}
                onClick={() => handleSetSelectedIcon(name)}
              >
                <div className={cn(`grid grow place-items-center`)}>
                  <Icon
                    className={lastChosenSizeType === "TW" ? allIconsSizeTW : ""}
                    style={
                      lastChosenSizeType === "px"
                        ? { fontSize: `${allIconsSize}px`, color: allColors }
                        : { color: allColors }
                    }
                  />
                </div>
                <div className="w-full px-4 text-center text-xs font-semibold text-balance break-all">{name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-w-60 flex-col gap-6 p-4">
          <IconCodeSnippet selectedIcon={selectedIcon} computedClassName={computedClassName} />

          <div className="flex justify-between">
            <span className="font-bold">Customize</span>
            <Button.Root
              size="xs"
              onClick={handleResetButton}
              className="rounded-[4px] bg-[#0065FF] px-3 py-1 font-medium text-white hover:bg-[#0052CC] active:bg-[#002D9C]"
            >
              Reset
            </Button.Root>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex w-full items-center gap-3">
              <input
                type="range"
                min={4}
                max={100}
                value={allIconsSize}
                onChange={handleAllIconsSizeChange}
                className="w-full"
              />
              <div className="font-semibold">{allIconsSize}px</div>
            </div>

            <div className="w-full">
              <Select.Root defaultValue={allIconsSizeTW} onValueChange={handleAllIconsSizeTWChange}>
                <Select.Trigger className="flex w-56 justify-between" size="xs">
                  <Select.Value placeholder="Role" />
                  <Icon icon="ChevronDown" />
                </Select.Trigger>

                <Select.Content className="z-50">
                  <Select.Viewport>
                    {tailwindSizes.map((size, index) => (
                      <Select.Item key={index} value={size} className="h-6">
                        <Select.ItemText>{size}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Root>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex w-full items-center justify-between">
              <h3 className={cn()}>Color</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>{allColors}</div>
              <input type="color" value={allColors} onChange={handleAllColorsChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AllVariants: Story = {
  args: {
    icon: "Home1",
    className: "text-6xl",
  },
  render: (args) => {
    return (
      <div className="flex w-full flex-col gap-6 p-16">
        <h2 className="text-3xl font-semibold">All variants</h2>

        <div className="grid grid-cols-4 justify-items-center gap-4">
          <div>Default</div>
          <div>Fill</div>
          <div>Stroke</div>
          <div>Without default color</div>
          <Icon icon={args.icon} className="text-6xl" />
          <Icon icon={args.icon} className="text-6xl text-green-400" />
          <Icon icon={args.icon} className="stroke-green-400 stroke-1 text-6xl" viewBox="-1 -1 18 17" />
          <Icon icon="NewProject" className="text-6xl" />
        </div>
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    icon: "Home1",
    className: "text-6xl",
  },
};

export const Stroke: Story = {
  args: {
    icon: "Goals",
    className: "text-6xl stroke-1 stroke-red-500",
    viewBox: "0 0 20 20",
  },
};

export const Fill: Story = {
  args: {
    icon: "Home1",
    className: "text-6xl text-green-300",
  },
};

export const WithoutDefaultColor: Story = {
  args: {
    icon: "NewProject",
    className: "text-6xl text-red-300",
  },
};
