import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

import messages from "@/messages/en.json";
import { UnitsOptions } from "@/types/weather";
import { City, Country, State } from "@/types/geo";
import { cn } from "@/lib/cn-utils";
import { Skeleton } from "@/components/ui/skeleton";

type OptionType = Country | State | City | UnitsOptions[number];

interface ComponentProps {
	className?: string;
	placeHolder?: string;
	options: OptionType[] | false;
	defaultOption?: OptionType;
	inputClassName?: string;
	onTextChange?: (entry: ChangeEvent<HTMLInputElement>) => void;
	onChange: (entry: OptionType) => void;
	showFlag?: boolean;
	inputDisabled?: boolean;
}

const SelectDropdown = ({
	className,
	placeHolder,
	options,
	onChange,
	onTextChange,
	defaultOption,
	showFlag = true,
	inputDisabled = false,
}: ComponentProps) => {
	const [showMenu, setShowMenu] = useState(false);
	const [shouldFocus, setShouldFocus] = useState(false);

	const [selectedValue, setSelectedValue] = useState<OptionType>();
	const [searchValue, setSearchValue] = useState("");

	const searchInputRef = useRef<HTMLInputElement>(null);
	const searchWrapperRef = useRef<HTMLInputElement>(null);
	const focusWrapperRef = useRef<HTMLButtonElement>(null);

	const displayText = (name?: string) =>
		`${showFlag && selectedValue?.emoji ? selectedValue.emoji + " " : ""}${
			name ?? selectedValue?.name
		}`;

	useEffect(() => {
		if (defaultOption) {
			setSelectedValue(defaultOption);
		}
	}, [defaultOption]);

	useEffect(() => {
		if (showMenu && searchInputRef.current) {
			searchInputRef.current.focus();
		}

		if (!showMenu && focusWrapperRef.current) {
			focusWrapperRef.current.focus();
		}

		setSearchValue("");
	}, [showMenu]);

	useEffect(() => {
		// Hide menu when clicked outside
		const handleClickOutsideMenu = (e: MouseEvent) => {
			if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Element)) {
				setShowMenu(false);
			}
		};

		window.addEventListener("click", handleClickOutsideMenu);

		return () => {
			window.removeEventListener("click", handleClickOutsideMenu);
		};
	}, []);

	const handleInputClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.ChangeEvent<HTMLInputElement>
	) => {
		e.stopPropagation();

		const event = (e as React.ChangeEvent<HTMLInputElement>).target;

		event.select();
		event.setSelectionRange(0, event.value.length);

		setShowMenu(true);
	};

	const handleToggleMenu = () => {
		setShowMenu((prev) => !prev);
	};

	const getDisplay = () => {
		if (showMenu && searchInputRef.current && displayText().startsWith(searchValue)) {
			searchInputRef.current.select();
			searchInputRef.current.setSelectionRange(0, searchInputRef.current.value.length);
		}

		if (!selectedValue) {
			return searchValue ?? "";
		}

		return displayText();
	};

	const onItemClick = (option: OptionType) => {
		setShouldFocus(true);
		setSelectedValue(option);
		onChange(option);
	};

	const onItemEnterKey = (e: React.KeyboardEvent<HTMLDivElement>, option: OptionType) => {
		if (e.key === "Enter") {
			e.preventDefault();

			onItemClick(option);

			setTimeout(() => {
				setShowMenu(false);
			}, 200);
		}
	};

	const isSelected = (option: OptionType) => {
		if (!selectedValue) {
			return false;
		}

		return selectedValue.id === option.id;
	};

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		setSelectedValue(undefined);

		if (onTextChange) {
			onTextChange(e);
		}
	};

	const getOptions = () => {
		if (!searchValue) {
			return options ? options : [];
		}

		const outputOptions = options
			? options?.filter(
					(option) => option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
			  )
			: [];

		return outputOptions;
	};

	useEffect(() => {
		// Handle Enter key press within the search input field
		const inputField = searchInputRef.current;

		if (!inputField) {
			return;
		}

		const handlePressEnter = (event: KeyboardEvent) => {
			const searchOptions = options
				? options?.filter(
						(option) => option.name.toLowerCase().indexOf(inputField.value.toLowerCase()) >= 0
				  )
				: [];

			if (searchOptions.length === 1 && event.key === "Enter") {
				event.preventDefault();

				setShouldFocus(true);
				setSelectedValue(searchOptions[0]);
				onChange(searchOptions[0]);
				setTimeout(() => {
					setShowMenu(false);
				}, 200);
			}
		};

		inputField.addEventListener("keypress", handlePressEnter);

		return () => {
			inputField.removeEventListener("keypress", handlePressEnter);
		};
	}, [onChange, options]);

	return (
		<button
			ref={focusWrapperRef}
			aria-label={messages.Select.buttonAreaLabel}
			className={"select_focus_wrapper"}
			data-focus={shouldFocus}
			role="dialog"
			tabIndex={-1}
		>
			{options && options.length > 0 ? (
				<div className={"relative"}>
					<div
						ref={searchWrapperRef}
						className={cn(
							"select_search_main w-[240px] h-[50px]  ",
							`${showMenu ? "bg-gray-100" : "bg-gray-100/90"}`,
							className
						)}
						tabIndex={-1}
						onClick={handleToggleMenu}
					>
						{inputDisabled && <div className={"select_search_input"}>{getDisplay()}</div>}
						<input
							ref={searchInputRef}
							className={"select_search_input"}
							disabled={inputDisabled}
							placeholder={placeHolder}
							style={{
								zIndex: inputDisabled ? -1 : 1,
								opacity: inputDisabled ? 0 : 1,
							}}
							tabIndex={inputDisabled ? -1 : 0}
							value={getDisplay()}
							onChange={onSearch}
							onClick={handleInputClick}
						/>

						<div
							className={"data-[state=open]:rotate-90 transition-transform duration-200"}
							data-state={showMenu ? "open" : "closed"}
						>
							<ChevronDown />
						</div>
					</div>

					{showMenu && (
						<div
							className="select_search_dropdown"
							data-state={showMenu ? "open" : "closed"}
							tabIndex={-1}
						>
							<div className="text-2xl text-gray-400 absolute right-5 top-[0.7rem]">⇆</div>
							{getOptions().map((option: OptionType) => (
								<div
									key={option.id}
									className={`${"select_search_dropdown_item"} ${isSelected(option) && "bg-ring"}`}
									tabIndex={0}
									onClick={() => onItemClick(option)}
									onKeyDown={(e) => onItemEnterKey(e, option)}
								>
									<span>{option?.emoji ?? ""}</span>{" "}
									<span className="text-left">{option.name}</span>
								</div>
							))}
						</div>
					)}
				</div>
			) : (
				<Skeleton className={cn("select_search_main bg-gray-100/70 w-[240px] h-[50px]", className)}>
					<input
						className={"select_search_input text-gray-300"}
						disabled={true}
						placeholder={placeHolder}
						value={placeHolder}
					/>

					<div className={"text-gray-200"}>
						<ChevronDown />
					</div>
				</Skeleton>
			)}
		</button>
	);
};

export default SelectDropdown;
