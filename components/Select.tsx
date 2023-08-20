import React, { useEffect, useState } from "react";

import { City, Country } from "@/types/geo-types";

import { cn } from "@/lib/cn-utils";

import { useAppContext } from "@/contexts/AppContext";

import SelectCountry from "./SelectCountry";
import SelectCity from "./SelectCity";
import SelectUnits from "./SelectUnits";

interface Props {
	className?: string;
}

const Select: React.FC<Props> = ({ className }) => {
	const { countryCode, cityName, units, setUnits, setGeoCoord } = useAppContext();

	const [country, setCountry] = useState<Country>();
	const [city, setCity] = useState<City>();

	useEffect(() => {
		if (city) {
			setGeoCoord({
				lat: parseFloat(city.latitude),
				lon: parseFloat(city.longitude),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [city]);

	return (
		<div className={cn("flex justify-between items-center gap-4", className)}>
			<SelectCountry defaultCountryCode={countryCode} onChange={setCountry} />
			<SelectCity
				defaultCityName={cityName ?? country?.capital}
				defaultCountryId={country?.id}
				onChange={setCity}
			/>
			<SelectUnits
				className="w-full min-w-[162px]"
				defaultUnits={units}
				shouldDisplay={!!countryCode}
				onChange={setUnits}
			/>
		</div>
	);
};

export default Select;
