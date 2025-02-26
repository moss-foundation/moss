import { Icon } from "@/components";

export const SidebarHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between bg-[#F4F4F4] px-[15px] py-[10px] text-[14px] font-semibold text-stone-500 uppercase">
      <span>{title}</span>
      <button className="rounded p-1 hover:bg-stone-100">
        <Icon icon="ThreeHorizontalDots" />
      </button>
    </div>
  );
};

export default SidebarHeader;
