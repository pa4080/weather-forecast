import React, { ChangeEvent } from "react";

import { UnitsOptions, WeatherUnits } from "@/types/weather";

import messages from "@/messages/en.json";

import SelectDropdown from "../SelectDropdown";

interface Props {
	defaultUnits?: WeatherUnits;
	className?: string;
	onChange?: (entry: WeatherUnits) => void;
	onTextChange?: (entry: ChangeEvent<HTMLInputElement>) => void;
	placeHolder?: string;
	shouldDisplay?: boolean;
}

const SelectUnits: React.FC<Props> = ({
	defaultUnits = "metric",
	className,
	onChange,
	onTextChange,
	placeHolder = messages.Select.units,
	shouldDisplay = true,
}) => {
	const unitsOptions: UnitsOptions = [
		{
			name: messages.WeatherUnits.metric.temp,
			id: "metric",
		},
		{
			name: messages.WeatherUnits.imperial.temp,
			id: "imperial",
		},
		{
			name: messages.WeatherUnits.standard.temp,
			id: "standard",
		},
	];

	return (
		<SelectDropdown
			inputDisabled
			className={className}
			defaultOption={unitsOptions.find(
				(option: UnitsOptions[number]) => option.id === defaultUnits
			)}
			options={shouldDisplay && unitsOptions}
			placeHolder={placeHolder}
			showFlag={false}
			onChange={(option) => {
				if (onChange) {
					onChange(option?.id as UnitsOptions[number]["id"]);
				}
			}}
			onTextChange={onTextChange}
		/>
	);
};

export default SelectUnits;
