"use client";

import React from "react";

import { cn } from "@/lib/cn-utils";

import SelectCountryAndCity from "./SelectCountryAndCity";

interface Props {
	className?: string;
}

const Widget: React.FC<Props> = ({ className }) => {
	return (
		<>
			<div className="widget_overlay" />
			<div className="widget_overlay_mask" />
			<div className={cn("widget_body", className)}>
				<SelectCountryAndCity
					countryCode="BG"
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
