"use client";

import React, { use, useEffect, useState } from "react";

import { cn } from "@/lib/cn-utils";

import SelectCountryAndCity from "./SelectCountryAndCity";

interface Props {
	className?: string;
}

const Widget: React.FC<Props> = ({ className }) => {
	// const [selectedCountryCode, setSelectedCountryCode] = useState("BG");
	// const [selectedCity, setSelectedCity] = useState<City>({
	// 	countryCode: "BG",
	// 	latitude: 42.69751,
	// 	longitude: 23.32415,
	// 	name: "Sofia",
	// });

	// useEffect(() => {
	// 	// eslint-disable-next-line no-console
	// 	console.log("selectedCity", selectedCity);
	// }, [selectedCity]);

	// useEffect(() => {
	// 	// eslint-disable-next-line no-console
	// 	console.log("selectedCountryCode", selectedCountryCode);
	// }, [selectedCountryCode]);

	return (
		<>
			<div className="widget_overlay" />
			<div className="widget_overlay_mask" />
			<div className={cn("widget_body", className)}>
				<SelectCountryAndCity
				// selectedCity={selectedCity}
				// selectedCountryCode={selectedCountryCode}
				// setSelectedCity={setSelectedCity}
				// setSelectedCountryCode={setSelectedCountryCode}
				/>
			</div>
		</>
	);
};

export default Widget;
