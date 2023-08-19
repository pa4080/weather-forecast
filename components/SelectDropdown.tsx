import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

import { City, Country, State } from "@/types/geo-types";
import { cn } from "@/lib/cn-utils";

type ComponentProps = {
	className?: string;
	placeHolder?: string;
	options: (Country | State | City)[];
	inputClassName?: string;
	onTextChange?: (entry: ChangeEvent<HTMLInputElement>) => void;
	defaultOption?: Country | State | City;
	onChange: (entry: Country | State | City) => void;
	showFlag?: boolean;
};
const SelectDropdown = ({
	className,
	placeHolder,
	options,
	onChange,
	onTextChange,
	defaultOption,
	showFlag = true,
}: ComponentProps) => {
	const [showMenu, setShowMenu] = useState(false);
	const [shouldFocus, setShouldFocus] = useState(false);

	const [selectedValue, setSelectedValue] = useState<Country | State | City>();
	const [searchValue, setSearchValue] = useState("");

	const searchInputRef = useRef<HTMLInputElement>(null);
	const searchWrapperRef = useRef<HTMLInputElement>(null);

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
			setShouldFocus(true);
		}

		if (!showMenu && searchWrapperRef.current && shouldFocus) {
			searchWrapperRef.current.focus();
		}

		setSearchValue("");
	}, [shouldFocus, showMenu]);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Element)) {
				setShowMenu(false);
				setTimeout(() => {
					setShouldFocus(false);
				}, 5000);
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

	const onItemClick = (option: Country | State | City) => {
		setSelectedValue(option);
		onChange(option);
	};

	const isSelected = (option: Country | State | City) => {
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
			return options;
		}

		return options.filter(
			(option) => option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
		);
	};

	return (
		<button className={"select_focus_wrapper"} data-focus={shouldFocus} role="none">
			<div className={"relative"}>
				<div
					ref={searchWrapperRef}
					className={cn("select_search_main w-[240px]", className)}
					onClick={handleToggleMenu}
				>
					<input
						ref={searchInputRef}
						className={"select_search_input"}
						placeholder={placeHolder}
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
					<div className="select_search_dropdown" data-state={showMenu ? "open" : "closed"}>
						{getOptions().map((option) => (
							<div
								key={option.id}
								className={`${"select_search_dropdown_item"} ${isSelected(option) && "bg-ring"}`}
								onClick={() => onItemClick(option)}
							>
								<span>{option?.emoji ?? ""}</span> <span className="text-left">{option.name}</span>
							</div>
						))}
					</div>
				)}
			</div>
		</button>
	);
};

export default SelectDropdown;
