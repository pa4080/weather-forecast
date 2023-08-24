import React from "react";

import { cn } from "@/lib/cn-utils";

import { ItemType } from "./SelectDropdown";

interface Props {
	item: ItemType;
	selectedItem?: ItemType;
	className?: string;
	showEmoji: boolean;
	onItemClick: (option: ItemType) => void;
	onItemPressKeys: (e: React.KeyboardEvent<HTMLDivElement>, item: ItemType) => void;
}

const SelectDropdownListItem: React.FC<Props> = ({
	item,
	selectedItem,
	onItemClick,
	onItemPressKeys,
	showEmoji,
	className,
}) => (
	<div
		key={item.id}
		className={cn(
			"select_search_dropdown_item",
			selectedItem?.id === item.id && "bg-ring",
			className
		)}
		tabIndex={0}
		onClick={() => onItemClick(item)}
		onKeyDown={(e) => onItemPressKeys(e, item)}
	>
		{showEmoji && <span>{item?.emoji ?? ""}&nbsp;</span>}
		<span className="text-left">{item.name}</span>
	</div>
);

export default SelectDropdownListItem;
