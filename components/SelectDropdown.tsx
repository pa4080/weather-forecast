import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

import messages from "@/messages/en.json";
import { UnitsOptions } from "@/types/weather";
import { City, Country, State, StateFull } from "@/types/geo";
import { cn } from "@/lib/cn-utils";
import { Skeleton } from "@/components/ui/skeleton";

import SelectDropdownListGenerator from "./SelectDwListGen";

export type ItemType = Country | State | City | UnitsOptions[number] | StateFull;

interface Props {
	className?: string;
	placeHolder?: string;
	items: ItemType[];
	defaultItem?: ItemType;
	inputClassName?: string;
	onTextChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onChange: (item: ItemType) => void;
	showEmoji?: boolean;
	inputDisabled?: boolean;
	timeoutMs?: number;
}

const SelectDropdown: React.FC<Props> = ({
	className,
	placeHolder,
	items,
	onChange,
	onTextChange,
	defaultItem,
	showEmoji = true,
	inputDisabled = false,
	timeoutMs = 0,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [shouldFocus, setShouldFocus] = useState(false);

	const [selectedItem, setSelectedItem] = useState<ItemType>();
	const [searchValue, setSearchValue] = useState("");
	const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
	const [searchResults, setSearchResults] = useState<ItemType[]>();

	const searchInputRef = useRef<HTMLInputElement>(null);
	const searchWrapperRef = useRef<HTMLInputElement>(null);
	const focusWrapperRef = useRef<HTMLDivElement>(null);

	const displayText = (name?: string) =>
		`${showEmoji && selectedItem?.emoji ? selectedItem.emoji + " " : ""}${
			name ?? selectedItem?.name
		}`;

	useEffect(() => {
		if (defaultItem) {
			setSelectedItem(defaultItem);
		}
	}, [defaultItem]);

	useEffect(() => {
		if (isMenuOpen && searchInputRef.current) {
			searchInputRef.current.focus();
		}

		if (!isMenuOpen && focusWrapperRef.current) {
			focusWrapperRef.current.focus();
		}

		setSearchValue("");
	}, [isMenuOpen]);

	useEffect(() => {
		// Hide menu when clicked outside
		const handleClickOutsideMenu = (e: MouseEvent) => {
			if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Element)) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener("click", handleClickOutsideMenu);

		return () => {
			window.removeEventListener("click", handleClickOutsideMenu);
		};
	}, []);

	const handleInputClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent> | ChangeEvent<HTMLInputElement>
	) => {
		e.stopPropagation();

		const event = (e as ChangeEvent<HTMLInputElement>).target;

		event.select();
		event.setSelectionRange(0, event.value.length);

		setIsMenuOpen(true);
	};

	const handleToggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const getDisplayText = () => {
		if (
			isMenuOpen &&
			searchInputRef.current &&
			displayText().startsWith(searchValue) &&
			!(searchValue.startsWith("u") && searchValue.length <= 2) // note the flags starts with \u...
		) {
			searchInputRef.current.select();
			searchInputRef.current.setSelectionRange(0, searchInputRef.current.value.length);
		}

		if (!selectedItem) {
			return searchValue ?? "";
		}

		return displayText();
	};

	const onItemClick = (option: ItemType) => {
		setShouldFocus(true);
		setSelectedItem(option);
		onChange(option);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		setSearchValue(e.target.value);
		setSelectedItem(undefined);

		if (onTextChange) {
			onTextChange(e);
		}
	};

	const filterItems = (items: ItemType[], searchValue: string) => {
		if (!searchValue) {
			return items;
		}

		if (items[0].hasOwnProperty("cities")) {
			return (items as StateFull[])
				.map((state) => ({
					id: state.id,
					name: state.name,
					state_code: state.state_code,
					cities: state.cities.filter(
						(city) => city.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
					),
				}))
				.filter((state) => !!state.cities.length);
		}

		return items.filter(
			(option) => option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
		);
	};

	useEffect(() => {
		// Open menu on input focus (when Tab is used)
		const inputField = searchInputRef.current;
		const focusWrapper = focusWrapperRef.current;

		if (!inputField || !focusWrapper) {
			return;
		}

		const toggleMenuOnInputFocus = (event: FocusEvent) => {
			event.stopPropagation();
			setIsMenuOpen(true);
			inputField.tabIndex = -1;
		};

		const getTabIndexBack = () => {
			setTimeout(() => {
				inputField.tabIndex = 0;
			}, 100);
		};

		inputField.addEventListener("focus", toggleMenuOnInputFocus);
		focusWrapper.addEventListener("blur", getTabIndexBack);

		return () => {
			inputField.removeEventListener("focus", toggleMenuOnInputFocus);
			focusWrapper.removeEventListener("blur", getTabIndexBack);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchInputRef.current, focusWrapperRef.current]);

	useEffect(() => {
		// Handle Enter key press within the search input field
		const inputField = searchInputRef.current;

		if (!inputField) {
			return;
		}

		const handlePressEnter = (event: KeyboardEvent) => {
			event.stopPropagation();

			if (event.key === "Enter") {
				let searchOptions: ItemType[];

				if (items[0].hasOwnProperty("cities")) {
					searchOptions = filterItems(items, inputField.value).flatMap(
						(item) => (item as StateFull).cities
					);
				} else {
					searchOptions = filterItems(items, inputField.value);
				}

				if (searchOptions.length === 1) {
					setShouldFocus(true);
					setSelectedItem(searchOptions[0]);
					onChange(searchOptions[0]);
					setTimeout(() => {
						setIsMenuOpen(false);
					}, 200);
				}
			}
		};

		inputField.addEventListener("keypress", handlePressEnter);

		return () => {
			inputField.removeEventListener("keypress", handlePressEnter);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items]);

	useEffect(() => {
		clearTimeout(searchTimeout);

		setSearchTimeout(
			setTimeout(() => {
				setSearchResults(filterItems(items, searchValue));
			}, timeoutMs)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return (
		<div
			ref={focusWrapperRef}
			aria-label={messages.Select.buttonAreaLabel}
			className={"select_focus_wrapper"}
			data-focus={shouldFocus}
			tabIndex={0}
		>
			{items && items.length > 0 ? (
				<div className={"relative"}>
					<div
						ref={searchWrapperRef}
						className={cn(
							"select_search_main w-[240px] h-[50px]  ",
							`${isMenuOpen ? "bg-gray-100" : "bg-gray-100/90"}`,
							className
						)}
						tabIndex={-1}
						onClick={handleToggleMenu}
					>
						{inputDisabled && <div className={"select_search_input"}>{getDisplayText()}</div>}
						<input
							ref={searchInputRef}
							className={"select_search_input"}
							disabled={inputDisabled}
							name={placeHolder}
							placeholder={placeHolder}
							style={{
								zIndex: inputDisabled ? -1 : 1,
								opacity: inputDisabled ? 0 : 1,
							}}
							tabIndex={inputDisabled ? -1 : 0}
							value={getDisplayText()}
							onChange={handleSearchChange}
							onClick={handleInputClick}
						/>

						<div
							className={
								"data-[state=open]:rotate-90 transition-transform duration-200 cursor-pointer"
							}
							data-state={isMenuOpen ? "open" : "closed"}
						>
							<ChevronDown />
						</div>
					</div>

					{isMenuOpen && (
						<SelectDropdownListGenerator
							isMenuOpen={isMenuOpen}
							items={searchValue && searchResults ? searchResults : items}
							selectedItem={selectedItem}
							setIsMenuOpen={setIsMenuOpen}
							showEmoji={showEmoji}
							onItemClick={onItemClick}
						/>
					)}
				</div>
			) : (
				<Skeleton className={cn("select_search_main bg-gray-100/70 w-[240px] h-[50px]", className)}>
					<input
						className={"select_search_input text-gray-300"}
						disabled={true}
						name={placeHolder}
						placeholder={placeHolder}
						value={placeHolder}
					/>

					<div className={"text-gray-200"}>
						<ChevronDown />
					</div>
				</Skeleton>
			)}
		</div>
	);
};

export default SelectDropdown;
