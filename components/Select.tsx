import React, { useEffect, useState } from "react";

import { City, Country } from "@/types/geo";

import { cn } from "@/lib/cn-utils";

import { useAppContext } from "@/contexts/AppContext";

import SelectCountry from "./SelectCountry";
import SelectCity from "./SelectCity";

interface Props {
	className?: string;
}

const Select: React.FC<Props> = ({ className }) => {
	const { countryCode, setCountryCode, setCountryName, cityName, setCityName, setGeoCoord } =
		useAppContext();

	const [country, setCountry] = useState<Country>();
	const [city, setCity] = useState<City>();

	useEffect(() => {
		if (city) {
			setGeoCoord({
				lat: parseFloat(city.latitude),
				lon: parseFloat(city.longitude),
			});

			setCityName(city.name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [city]);

	useEffect(() => {
		if (country) {
			setCountryCode(country.iso2);
			setCountryName(country.name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [country]);

	return (
		<div
			className={cn(
				"grid grid-rows-2 xs:grid-rows-1 grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-4",
				className
			)}
		>
			<SelectCountry className="w-full" defaultCountryCode={countryCode} onChange={setCountry} />
			<SelectCity
				className="w-full"
				defaultCityName={cityName ?? country?.capital}
				defaultCountryId={country?.id}
				onChange={setCity}
			/>
		</div>
	);
};

export default Select;
