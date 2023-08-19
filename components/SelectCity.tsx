import React, { ChangeEvent, useEffect, useState } from "react";

import { City, Country } from "@/types/geo-types";
import { Route } from "@/types/routes";

import SelectDropdown from "./SelectDropdown";

type GetCities = (type?: string, value?: string | number) => Promise<City | City[] | []>;

const getCities: GetCities = async (type, value) => {
	return await fetch(`${Route.api.cities}${type && value ? `/${type}/${value}` : ""}`).then((res) =>
		res.json()
	);
};

type Props = {
	defaultCityName?: string;
	defaultCountryCode?: string;
	defaultCountryId?: number;
	className?: string;
	onChange?: (entry: City) => void;
	onTextChange?: (entry: ChangeEvent<HTMLInputElement>) => void;
	placeHolder?: string;
	showFlag?: boolean;
};

const SelectCity: React.FC<Props> = ({
	defaultCityName,
	defaultCountryCode,
	defaultCountryId,
	className,
	onChange,
	onTextChange,
	placeHolder = "Select city",
	showFlag,
}) => {
	const [cities, setCities] = useState<City[]>([]);
	const [defaultOption, setDefaultOption] = useState<Country>();

	useEffect(() => {
		getCities().then((data) => {
			setCities(data as City[]);
		});
	}, []);

	useEffect(() => {}, []);

	/*
	useEffect(() => {
		if (defaultCountryName) {
			getCities("name", defaultCountryName).then((data) => {
				setDefaultOption(data as Country);
			});
		} else if (defaultCountryCode) {
			getCities("code", defaultCountryCode).then((data) => {
				setDefaultOption(data as Country);
			});
		} else if (defaultCountryId) {
			getCities("id", defaultCountryId).then((data) => {
				setDefaultOption(data as Country);
			});
		}
	}, [defaultCountryName, defaultCountryCode, defaultCountryId]);
	*/

	return (
		<SelectDropdown
			className={className}
			defaultOption={defaultOption}
			options={cities}
			placeHolder={placeHolder}
			showFlag={showFlag}
			onChange={(value) => {
				if (onChange) {
					onChange(value as City);
				}
			}}
			onTextChange={onTextChange}
		/>
	);
};

export default SelectCity;
