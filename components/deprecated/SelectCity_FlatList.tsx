import React, { ChangeEvent, useEffect, useState } from "react";

import { City } from "@/types/geo";
import { Route } from "@/routes";
import messages from "@/messages/en.json";

import SelectDropdown from "@/components/SelectDropdown";

type GetCities = (type?: string, value?: string | number) => Promise<City | City[] | []>;

const getCities: GetCities = async (type, value) => {
	return await fetch(`${Route.api.cities}${type && value ? `/${type}/${value}` : ""}`).then((res) =>
		res.json()
	);
};

interface Props {
	defaultCityName?: string;
	defaultCountryCode?: string;
	defaultCountryId?: number;
	defaultCountryCapital?: string;
	className?: string;
	onChange?: (entry: City) => void;
	onTextChange?: (entry: ChangeEvent<HTMLInputElement>) => void;
	placeHolder?: string;
}

const SelectCity: React.FC<Props> = ({
	defaultCityName,
	defaultCountryCode,
	defaultCountryId,
	defaultCountryCapital,
	className,
	onChange,
	onTextChange,
	placeHolder = messages.Select.city,
}) => {
	const [cities, setCities] = useState<City[]>([]);
	const [defaultOption, setDefaultOption] = useState<City>();

	useEffect(() => {
		// We doesn't support other types of city list choices yet
		if (defaultCountryId) {
			if (1 <= defaultCountryId && defaultCountryId <= 250) {
				getCities("id_flat", defaultCountryId).then((data) => {
					setCities(data as City[]);
				});
			}
		} else if (defaultCountryCode) {
			getCities("code_flat", defaultCountryCode).then((data) => {
				setCities(data as City[]);
			});
		}
	}, [defaultCountryCode, defaultCountryId]);

	useEffect(() => {
		if (defaultCityName) {
			const city =
				cities.find(
					(city) => city.name === defaultCityName || city.name === defaultCountryCapital
				) ?? cities[0];

			if (city) {
				setDefaultOption(city);
			}
		}
	}, [cities, defaultCityName, defaultCountryCapital]);

	useEffect(() => {
		if (typeof onChange === "function" && defaultOption) {
			onChange(defaultOption);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultOption]);

	return (
		<SelectDropdown
			className={className}
			defaultOption={defaultOption}
			options={cities}
			placeHolder={placeHolder}
			showFlag={false}
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
