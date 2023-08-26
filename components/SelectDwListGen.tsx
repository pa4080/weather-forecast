import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { City, StateFull } from "@/types/geo";
import { cn } from "@/lib/cn-utils";

import { ItemType } from "./SelectDropdown";
import SelectDropdownListItem from "./SelectDwListItem";

interface Props {
	items: ItemType[];
	selectedItem?: ItemType;
	isMenuOpen?: boolean;
	setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
	className?: string;
	onItemClick: (option: ItemType) => void;
	showEmoji: boolean;
}

const SelectDropdownListGenerator: React.FC<Props> = ({
	items,
	selectedItem,
	isMenuOpen,
	setIsMenuOpen,
	className,
	onItemClick,
	showEmoji,
}) => {
	const listRef = useRef<HTMLDivElement>(null);
	const [menuItemsNodeList, setMenuItemsNodeList] = useState<HTMLDivElement[]>();

	useEffect(() => {
		if (listRef.current) {
			const allNodes: NodeListOf<HTMLDivElement> = listRef.current.querySelectorAll(
				"div.select_search_dropdown_item"
			);
			const allNodesArray = Array.from(allNodes);

			setMenuItemsNodeList(allNodesArray);
		}
	}, [listRef, items]);

	const onItemPressKeys = (e: React.KeyboardEvent<HTMLDivElement>, item: ItemType) => {
		// Handle Enter key press within the dropdown menu list
		if (e.key === "Enter") {
			e.preventDefault();

			onItemClick(item);

			setTimeout(() => {
				setIsMenuOpen(false);
			}, 200);
		}

		// Handle ArrowDown and ArrowUp key press,
		// https://stackoverflow.com/a/48848078/6543935
		if (
			listRef.current &&
			menuItemsNodeList &&
			(e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "PageUp" || e.key === "PageDown")
		) {
			e.preventDefault();
			const currentNode = e.target as HTMLDivElement;
			const currentIndex = menuItemsNodeList.findIndex((el) => currentNode.isEqualNode(el));
			let targetIndex = 0;

			if (e.key === "ArrowDown") {
				targetIndex = (currentIndex + 1) % menuItemsNodeList.length;
			} else if (e.key === "ArrowUp") {
				targetIndex = (currentIndex - 1 + menuItemsNodeList.length) % menuItemsNodeList.length;
			} else if (e.key === "PageDown") {
				targetIndex = (currentIndex + 4) % menuItemsNodeList.length;
			} else if (e.key === "PageUp") {
				targetIndex = (currentIndex - 4 + menuItemsNodeList.length) % menuItemsNodeList.length;
			}

			menuItemsNodeList[targetIndex].focus();
		}
	};

	return (
		<div
			ref={listRef}
			className={cn("select_search_dropdown", className)}
			data-state={isMenuOpen ? "open" : "closed"}
			tabIndex={-1}
		>
			<div className="text-2xl text-gray-400 absolute right-5 top-[0.7rem]">⇆</div>
			{items.map((item: ItemType) => {
				if (item.hasOwnProperty("cities")) {
					const state = item as StateFull;

					return (
						<div key={state.id}>
							<div className="text-gray-800 cursor-default px-2 py-1 my-1 contrast-150 saturate-200 font-semibold">
								{state.name}
							</div>

							{state.cities.map((city: City) => {
								return (
									<SelectDropdownListItem
										key={city.id}
										className="px-2"
										item={city}
										selectedItem={selectedItem}
										showEmoji={showEmoji}
										onItemClick={onItemClick}
										onItemPressKeys={onItemPressKeys}
									/>
								);
							})}
						</div>
					);
				} else {
					return (
						<SelectDropdownListItem
							key={item.id}
							className="px-2"
							item={item}
							selectedItem={selectedItem}
							showEmoji={showEmoji}
							onItemClick={onItemClick}
							onItemPressKeys={onItemPressKeys}
						/>
					);
				}
			})}
		</div>
	);
};

export default SelectDropdownListGenerator;
