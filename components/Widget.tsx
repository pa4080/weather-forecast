"use client";

import React from "react";

import { cn } from "@/lib/cn-utils";

import { useGeoDetector } from "@/hooks/useGeoDetector";

import SelectCountryAndCity from "./SelectCountryAndCity";

interface Props {
	className?: string;
}

const Widget: React.FC<Props> = ({ className }) => {
	const geo = useGeoDetector();

	React.useEffect(() => {
		// eslint-disable-next-line no-console
		console.log("GEO: ", geo);
	}, [geo]);

	return (
		<>
			<div className="widget_overlay" />
			<div className="widget_overlay_mask" />
			<div className={cn("widget_body", className)}>
				<SelectCountryAndCity countryCode="BG" />
			</div>
		</>
	);
};

export default Widget;
