"use client";

import React, { useState } from "react";

import { cn } from "@/lib/cn-utils";

import SelectCountryAndCity from "./SelectCS";

interface Props {
	className?: string;
}

const Widget: React.FC<Props> = ({ className }) => {
	const [selectedCountryCode, setSelectedCountryCode] = useState("BG");
	const [selectedCity, setSelectedCity] = useState("Sofia");

	return (
		<>
			<div className="widget_overlay" />
			<div className="widget_overlay_mask" />
			<div className={cn("widget_body", className)}>
				<SelectCountryAndCity
					selectedCity={selectedCity}
					selectedCountryCode={selectedCountryCode}
					setSelectedCity={setSelectedCity}
					setSelectedCountryCode={setSelectedCountryCode}
				/>
			</div>
		</>
	);
};

export default Widget;
