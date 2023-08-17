"use client";

import React, { useEffect, useMemo, useState } from "react";
import { countries as countriesLib, cities as citiesLib } from "country-cities";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn-utils";

interface City {
	name: string;
	countryCode: string;
	latitude: number;
	longitude: number;
}

interface Country {
	name: string;
	isoCode: string;
	flag: string;
	cities: City[];
}

interface Props {
	className?: string;
	selectedCountryCode?: string;
	setSelectedCountryCode: React.Dispatch<React.SetStateAction<string>>;
	selectedCity: string;
	setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
}

const SelectCountryAndCity: React.FC<Props> = ({
	className,
	selectedCountryCode,
	setSelectedCountryCode,
	selectedCity,
	setSelectedCity,
}) => {
	const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
	const countryList: Country[] = useMemo(
		() =>
			countriesLib.all().map(({ name, isoCode, flag }) => {
				const cities =
					citiesLib.getByCountry(isoCode)?.map(({ name, countryCode, latitude, longitude }) => ({
						name,
						countryCode,
						latitude: Number(latitude),
						longitude: Number(longitude),
					})) || [];

				return { name, isoCode, flag, cities };
			}),
		[]
	);

	useEffect(() => {
		const newSelectedCountry =
			countryList.find(({ isoCode }) => isoCode === selectedCountryCode) || countryList[0];

		const isSelectedCountryContainsSelectedCity = !!newSelectedCountry?.cities?.find(
			({ name }) => name === selectedCity
		);

		if (!isSelectedCountryContainsSelectedCity) {
			setSelectedCity(newSelectedCountry?.cities[0]?.name || "");
		}

		setSelectedCountry(newSelectedCountry);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countryList, selectedCity, selectedCountryCode]);

	const handleCountryChange = (selectedValue: string) => {
		// console.log(event.target.value);
		const newSelectedCountry =
			countryList?.find(({ isoCode }) => isoCode === selectedValue) || selectedCountry;

		setSelectedCountry(newSelectedCountry);
		setSelectedCountryCode(selectedValue);
	};

	return (
		<div className="flex gap-3">
			<Select onValueChange={handleCountryChange}>
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
					{countryList &&
						countryList.map(({ name, isoCode, flag }) => (
							<SelectItem key={isoCode} value={isoCode}>
								<div className="flex items-center gap-2 flex-row-reverse">
									<span>{name}</span>
									<span className="text-2xl">{flag}</span>
								</div>
							</SelectItem>
						))}
				</SelectContent>
			</Select>

			<Select>
				<SelectTrigger className={cn("w-[240px]", className)}>
					<SelectValue
						placeholder={
							<div className="flex items-center">
								<span>{selectedCity}</span>
							</div>
						}
					/>
				</SelectTrigger>
				<SelectContent className="max-h-64">
					{selectedCountry &&
						selectedCountry?.cities.map(({ name }, index) => (
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
