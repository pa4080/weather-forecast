"use client";

import React, { useEffect, useState } from "react";
// https://github.com/nicholidev/country-cities
import { countries as countries, cities as citiesLib } from "country-cities";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn-utils";

export interface City {
	name: string;
	countryCode: string;
	latitude: number;
	longitude: number;
}

export interface Country {
	name: string;
	isoCode: string;
	flag: string;
	latitude: string;
	longitude: string;
}

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
	const [selectedCountry, setSelectedCountry] = useState<Country>(
		countries.getByCode(selectedCountryCode) ?? countries.all()[0]
	);

	useEffect(() => {
		const newSelectedCountry =
			countries.all().find(({ isoCode }) => isoCode === selectedCountryCode) || countries.all()[0];

		setSelectedCountry(newSelectedCountry);
	}, [selectedCountryCode]);

	useEffect(() => {
		if (selectedCity.countryCode !== selectedCountryCode) {
			const newSelectedCity = citiesLib?.getByCountry(selectedCountry.isoCode)?.[0];

			setSelectedCity(
				newSelectedCity
					? {
							name: newSelectedCity.name,
							countryCode: newSelectedCity.countryCode,
							latitude: Number(newSelectedCity.latitude),
							longitude: Number(newSelectedCity.longitude),
					  }
					: {
							countryCode: selectedCountry.isoCode,
							latitude: Number(selectedCountry.latitude),
							longitude: Number(selectedCountry.longitude),
							name: selectedCountry.name,
					  }
			);
		}
	}, [selectedCity, selectedCountry, selectedCountryCode, setSelectedCity]);

	const handleCityChange = (value: string) => {
		const newSelectedCity = citiesLib
			?.getByCountry(selectedCountry.isoCode)
			?.find(({ name }) => name === value);

		if (!newSelectedCity) {
			return;
		}

		setSelectedCity({
			name: newSelectedCity.name,
			countryCode: newSelectedCity.countryCode,
			latitude: Number(newSelectedCity.latitude),
			longitude: Number(newSelectedCity.longitude),
		});
	};

	return (
		<div className="flex gap-3">
			{/* Countries list */}
			<Select onValueChange={setSelectedCountryCode}>
				<SelectTrigger className={cn("w-[240px]", className)}>
					<SelectValue
						placeholder={
							<div className="flex items-center gap-2 flex-row-reverse">
								<span>{selectedCountry?.name}</span>
								<span className="text-2xl">{selectedCountry?.flag}</span>
							</div>
						}
					/>
				</SelectTrigger>
				<SelectContent className="max-h-64">
					{countries.all().map(({ name, isoCode, flag }) => (
						<SelectItem key={isoCode} value={isoCode}>
							<div className="flex items-center gap-2 flex-row-reverse">
								<span>{name}</span>
								<span className="text-2xl">{flag}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{/* Cities list */}
			<Select key={selectedCity.name} onValueChange={handleCityChange}>
				<SelectTrigger className={cn("w-[240px]", className)}>
					<SelectValue
						placeholder={
							<div className="flex items-center">
								<span>{selectedCity.name}</span>
							</div>
						}
					/>
				</SelectTrigger>
				<SelectContent className="max-h-64">
					{citiesLib?.getByCountry(selectedCountry.isoCode) &&
						citiesLib?.getByCountry(selectedCountry.isoCode)?.map(({ name }, index) => (
							<SelectItem key={index} value={name}>
								<div className="flex items-center">
									<span>{name}</span>
								</div>
							</SelectItem>
						))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default SelectCountryAndCity;
