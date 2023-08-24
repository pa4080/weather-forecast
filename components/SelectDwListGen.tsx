import React, { Dispatch, SetStateAction, useRef } from "react";

import { City, StateFull } from "@/types/geo";
import { cn } from "@/lib/cn-utils";

import { ItemType } from "./SelectDropdown";

interface Props {
	items: ItemType[];
	selectedItem?: ItemType;
	isMenuOpen: boolean;
	setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
	className?: string;
	onItemClick: (option: ItemType) => void;
}

const SelectDropdownListGenerator: React.FC<Props> = ({
	items,
	selectedItem,
	isMenuOpen,
	setIsMenuOpen,
	className,
	onItemClick,
}) => {
	const listRef = useRef<HTMLDivElement>(null);

	const onItemPressKeys = (e: React.KeyboardEvent<HTMLDivElement>, item: ItemType) => {
		// Handle Enter key press within the dropdown menu list
		if (e.key === "Enter") {
			e.preventDefault();

			onItemClick(item);

			setTimeout(() => {
				setIsMenuOpen(false);
			}, 200);
		}

		// Handle ArrowDown and ArrowUp key press, https://stackoverflow.com/a/48848078/6543935
		if (listRef.current && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
			e.preventDefault();
			const currentNode = e.target as HTMLDivElement;
			const allElements = listRef.current.querySelectorAll("div");
			const currentIndex = Array.from(allElements).findIndex((el) => currentNode.isEqualNode(el));
			let targetIndex = 0;

			if (e.key === "ArrowDown") {
				targetIndex = (currentIndex + 1) % allElements.length;
			} else if (e.key === "ArrowUp") {
				targetIndex = (currentIndex - 1 + allElements.length) % allElements.length;
			}

			allElements[targetIndex].focus();
		}
	};

	const isSelected = (item: ItemType) => {
		if (!selectedItem) {
			return false;
		}

		return selectedItem.id === item.id;
	};

	return (
		<div
			ref={listRef}
			className={cn("select_search_dropdown", className)}
			data-state={isMenuOpen ? "open" : "closed"}
			tabIndex={-1}
		>
			<div className="text-2xl text-gray-400 absolute right-5 top-[0.7rem]">⇆</div>
			{items &&
				items.map((option: ItemType) => {
					if (option.hasOwnProperty("cities")) {
						const state = option as StateFull;

						return (
							<div key={state.id}>
								<div className="text-gray-800 cursor-default px-2 py-1 my-1 contrast-150 saturate-200 font-semibold">
									{state.name}
								</div>

								{state.cities.map((city: City) => {
									return (
										<div
											key={city.id}
											className={`${"select_search_dropdown_item px-0"} ${
												isSelected(city) && "bg-ring"
											}`}
											tabIndex={0}
											onClick={() => onItemClick(city)}
											onKeyDown={(e) => onItemPressKeys(e, city)}
										>
											<span>{city?.emoji ?? ""}</span>{" "}
											<span className="text-left">{city.name}</span>
										</div>
									);
								})}
							</div>
						);
					} else {
						return (
							<div
								key={option.id}
								className={`${"select_search_dropdown_item px-2"} ${
									isSelected(option) && "bg-ring"
								}`}
								tabIndex={0}
								onClick={() => onItemClick(option)}
								onKeyDown={(e) => onItemPressKeys(e, option)}
							>
								<span>{option?.emoji ?? ""}</span> <span className="text-left">{option.name}</span>
							</div>
						);
					}
				})}
		</div>
	);
};

export default SelectDropdownListGenerator;
