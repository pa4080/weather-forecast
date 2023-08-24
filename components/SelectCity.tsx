import React, { ChangeEvent, useEffect, useState } from "react";

import { City, CountryStateCityFull } from "@/types/geo";
import { Route } from "@/routes";
import messages from "@/messages/en.json";

import SelectDropdown from "./SelectDropdown";

type GetCities = (
	type?: "country_id_state_structured" | "country_code_state_structured",
	value?: string | number
) => Promise<CountryStateCityFull>;

const getCities: GetCities = async (type, value) => {
	return await fetch(`${Route.api.cities}${type && value ? `/${type}/${value}` : ""}`).then((res) =>
		res.json()
	);
};

interface Props {
	defaultCityName?: string;
	defaultCountryCode?: string;
	defaultCountryId?: number;
	// defaultCountryCapital?: string;
	className?: string;
	onChange?: (entry: City) => void;
	onTextChange?: (entry: ChangeEvent<HTMLInputElement>) => void;
	placeHolder?: string;
}

const SelectCity: React.FC<Props> = ({
	defaultCityName,
	defaultCountryCode,
	defaultCountryId,
	// defaultCountryCapital,
	className,
	onChange,
	onTextChange,
	placeHolder = messages.Select.city,
}) => {
	const [country, setFullCountryData] = useState<CountryStateCityFull>();
	const [defaultOption, setDefaultOption] = useState<City>();

	useEffect(() => {
		// We doesn't support other types of city list choices yet
		if (defaultCountryId) {
			if (1 <= defaultCountryId && defaultCountryId <= 250) {
				getCities("country_id_state_structured", defaultCountryId).then((data) => {
					setFullCountryData(data as CountryStateCityFull);
				});
			}
		} else if (defaultCountryCode) {
			getCities("country_code_state_structured", defaultCountryCode).then((data) => {
				setFullCountryData(data as CountryStateCityFull);
			});
		}
	}, [defaultCountryCode, defaultCountryId]);

	useEffect(() => {
		if (defaultCityName) {
			const city =
				country?.states
					.flatMap((state) => state.cities)
					.find((city) => city.name === defaultCityName || city.name === country.capital) ??
				country?.states[0].cities[0];

			if (city) {
				setDefaultOption(city);
			}
		}
	}, [country, defaultCityName]);

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
			options={country?.states ?? []}
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
