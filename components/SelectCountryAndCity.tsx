import React, { useEffect, useState } from "react";

import { City, Country } from "@/types/geo-types";

import { cn } from "@/lib/cn-utils";

import SelectCountry from "./SelectCountry";
import SelectCity from "./SelectCity";

interface Props {
	className?: string;
	countryCode?: string;
	setSelectedCountryCode?: React.Dispatch<React.SetStateAction<string>>;
	selectedCity?: string;
	setSelectedCity?: React.Dispatch<React.SetStateAction<string>>;
}

const SelectCountryAndCity: React.FC<Props> = ({
	className,
	countryCode,
	// setSelectedCountryCode,
	// selectedCity,
	// setSelectedCity,
}) => {
	// const [countryId, setCountryId] = useState(0);
	const [country, setCountry] = useState<Country>();
	const [city, setCity] = useState<City>();
	const [cityGeo, setCityGeo] = useState({ lat: 0, lon: 0 });

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log("countryId", country?.id);
	}, [country]);

	useEffect(() => {
		if (city) {
			setCityGeo({
				lat: parseFloat(city.latitude),
				lon: parseFloat(city.longitude),
			});
		}
	}, [city]);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log("cityGeo", cityGeo);
	}, [cityGeo]);

	return (
		<div className={cn("flex justify-start items-center gap-2", className)}>
			<SelectCountry defaultCountryCode={countryCode} onChange={setCountry} />
			<SelectCity
				defaultCityName={country?.capital}
				defaultCountryId={country?.id}
				onChange={setCity}
			/>
		</div>
	);
};

export default SelectCountryAndCity;
