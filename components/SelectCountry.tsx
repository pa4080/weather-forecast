import React, { ChangeEvent, useEffect, useState } from "react";

import { Country } from "@/types/geo";
import { Route } from "@/routes";
import messages from "@/messages/en.json";

import SelectDropdown from "./SelectDropdown";

type GetCountries = (type?: string, value?: string | number) => Promise<Country | Country[] | []>;

const getCountries: GetCountries = async (type, value) => {
	return await fetch(`${Route.api.countries}${type && value ? `/${type}/${value}` : ""}`).then(
		(res) => res.json()
	);
};

interface Props {
	defaultCountryName?: string;
	defaultCountryCode?: string;
	defaultCountryId?: number;
	className?: string;
	onChange?: (entry: Country) => void;
	onTextChange?: (entry: ChangeEvent<HTMLInputElement>) => void;
	placeHolder?: string;
	showFlag?: boolean;
}

const SelectCountry: React.FC<Props> = ({
	defaultCountryName,
	defaultCountryCode,
	defaultCountryId,
	className,
	onChange,
	onTextChange,
	placeHolder = messages.Select.country,
	showFlag,
}) => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [defaultOption, setDefaultOption] = useState<Country>();

	useEffect(() => {
		getCountries().then((data) => {
			setCountries(data as Country[]);
		});
	}, []);

	useEffect(() => {
		if (defaultCountryName) {
			getCountries("name", defaultCountryName).then((data) => {
				setDefaultOption(data as Country);
			});
		} else if (defaultCountryCode) {
			getCountries("code", defaultCountryCode).then((data) => {
				setDefaultOption(data as Country);
			});
		} else if (defaultCountryId) {
			getCountries("id", defaultCountryId).then((data) => {
				setDefaultOption(data as Country);
			});
		}
	}, [defaultCountryName, defaultCountryCode, defaultCountryId]);

	useEffect(() => {
		if (typeof onChange === "function" && defaultOption) {
			onChange(defaultOption);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultOption]);

	return (
		<SelectDropdown
			className={className}
			defaultItem={defaultOption}
			items={countries}
			placeHolder={placeHolder}
			showEmoji={showFlag}
			onChange={(value) => {
				onChange && onChange(value as Country);
			}}
			onTextChange={onTextChange}
		/>
	);
};

export default SelectCountry;
