import React, { useEffect, useState } from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn-utils";

import {
	GetCountries,
	GetState,
	GetCity,
	GetLanguages, //async functions
} from "@/lib/react-country-state-city/src";
import { Country } from "@/lib/react-country-state-city/src/types";

import SelectCountry from "./SelectCountry";
import SelectCity from "./SelectCity";
// import "react-country-state-city/dist/react-country-state-city.css";

interface Props {
	className?: string;
	selectedCountryCode: string;
	setSelectedCountryCode: React.Dispatch<React.SetStateAction<string>>;
	selectedCity: City;
	setSelectedCity: React.Dispatch<React.SetStateAction<City>>;
}

const SelectCountryAndCity: React.FC<Props> = ({
	className,
	selectedCountryCode,
	setSelectedCountryCode,
	selectedCity,
	setSelectedCity,
}) => {
	const [countryId, setCountryId] = useState(0);
	const [cityGeo, setCityGeo] = useState({ lat: 0, lon: 0 });

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log("countryId", countryId);
	}, [countryId]);

	return (
		<>
			<div className="flex justify-start items-center gap-2">
				<SelectCountry
					defaultCountryCode="BG"
					onChange={(country) => {
						setCountryId(country.id);
					}}
				/>
				<SelectCity
					onChange={(city) => {
						setCityGeo({
							lat: parseFloat(city.latitude),
							lon: parseFloat(city.longitude),
						});
					}}
				/>
			</div>
		</>
	);
};

export default SelectCountryAndCity;
