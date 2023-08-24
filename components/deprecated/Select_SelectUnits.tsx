import React, { useEffect, useState } from "react";

import { City, Country } from "@/types/geo";
import { cn } from "@/lib/cn-utils";
import { useAppContext } from "@/contexts/AppContext";
import SelectCountry from "@/components/SelectCountry";

import SelectCity from "./SelectCity_FlatList";
import SelectUnits from "./SelectUnits";

interface Props {
	className?: string;
}

const Select: React.FC<Props> = ({ className }) => {
	const {
		countryCode,
		setCountryCode,
		setCountryName,
		cityName,
		setCityName,
		units,
		setUnits,
		setGeoCoord,
	} = useAppContext();

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
				"flex justify-between items-center sm:gap-3 md:gap-4 flex-col sa:flex-row",
				className
			)}
		>
			<SelectCountry defaultCountryCode={countryCode} onChange={setCountry} />
			<SelectCity
				defaultCityName={cityName ?? country?.capital}
				defaultCountryCapital={country?.capital}
				defaultCountryId={country?.id}
				onChange={setCity}
			/>
			<SelectUnits
				className="flex-grow w-full min-w-[122px]"
				defaultUnits={units}
				shouldDisplay={!!countryCode}
				onChange={setUnits}
			/>
		</div>
	);
};

export default Select;
