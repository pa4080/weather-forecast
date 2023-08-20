import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

import { City, Country, State } from "@/types/geo-types";
import { cn } from "@/lib/cn-utils";
import { Skeleton } from "@/components/ui/skeleton";
import { UnitsOptions } from "@/types/weather-types";

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
		const handler = (e: MouseEvent) => {
			if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Element)) {
				setShowMenu(false);
			}
		};

		window.addEventListener("click", handler);

		return () => {
			window.removeEventListener("click", handler);
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

		return options
			? options?.filter(
					(option) => option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
			  )
			: [];
	};

	return (
		<button
			ref={focusWrapperRef}
			className={"select_focus_wrapper"}
			data-focus={shouldFocus}
			role="none"
		>
			{options && options.length > 0 ? (
				<div className={"relative"}>
					<div
						ref={searchWrapperRef}
						className={cn("select_search_main w-[240px] h-[50px]", className)}
						onClick={handleToggleMenu}
					>
						<input
							ref={searchInputRef}
							className={"select_search_input"}
							disabled={inputDisabled}
							placeholder={placeHolder}
							style={{
								zIndex: inputDisabled ? -1 : 1,
							}}
							tabIndex={1}
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
							tabIndex={1}
						>
							{getOptions().map((option: OptionType) => (
								<div
									key={option.id}
									className={`${"select_search_dropdown_item"} ${isSelected(option) && "bg-ring"}`}
									tabIndex={1}
									onClick={() => onItemClick(option)}
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
