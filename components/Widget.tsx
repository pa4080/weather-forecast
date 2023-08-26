"use client";

import React, { useEffect } from "react";

import { cn } from "@/lib/cn-utils";
import { useAppContext } from "@/contexts/AppContext";

import Select from "./Select";
import DisplayMainData from "./DisplayMainData";
import Logo from "./Logo";
import DisplayDays from "./DisplayDays";
import DrawGraphicLoader from "./DrawGraphicLoader";

interface Props {
	className?: string;
}

const Widget: React.FC<Props> = ({ className }) => {
	const { mainData } = useAppContext();

	useEffect(() => {
		if (mainData) {
			// const color = getComputedStyle(document.documentElement).getPropertyValue("--ring");
			document.documentElement.style.setProperty("--ring", `${mainData?.tempColor}bb`);
			document.documentElement.style.setProperty("--accent", `${mainData?.tempColor}99`);
		}
	}, [mainData]);

	return (
		<>
			<Logo wetherColor={mainData?.tempColor} />
			<div className="widget_overlay" />
			<div
				className="widget_overlay_mask"
				style={{
					backgroundColor: mainData?.tempColor,
					opacity: "3%",
				}}
			/>

			<div className={cn("widget_body", className)}>
				<Select />
				<DisplayMainData />
				<DrawGraphicLoader />
				<DisplayDays />
			</div>
		</>
	);
};

export default Widget;
