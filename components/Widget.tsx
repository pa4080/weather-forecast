"use client";

import React, { use, useEffect } from "react";

import { cn } from "@/lib/cn-utils";
import { useAppContext } from "@/contexts/AppContext";

import Select from "./Select";
import DisplayMainData from "./DisplayMainData";
import Logo from "./Logo";
import DisplayDays from "./DisplayDays";

interface Props {
	className?: string;
}

const Widget: React.FC<Props> = ({ className }) => {
	const { mainDataDisplay } = useAppContext();

	useEffect(() => {
		if (mainDataDisplay) {
			// const color = getComputedStyle(document.documentElement).getPropertyValue("--ring");
			document.documentElement.style.setProperty("--ring", `${mainDataDisplay?.tempColor}dd`);
			document.documentElement.style.setProperty("--accent", `${mainDataDisplay?.tempColor}aa`);
		}
	}, [mainDataDisplay]);

	return (
		<>
			<Logo className="hidden md:flex absolute" wetherColor={mainDataDisplay?.tempColor} />
			<div className="widget_overlay" />
			<div
				className="widget_overlay_mask"
				style={{
					backgroundColor: mainDataDisplay?.tempColor,
					opacity: "3%",
				}}
			/>
			<div className={cn("widget_body", className)}>
				<Select className="h-max" />
				<DisplayMainData />
				<DisplayDays />
			</div>
		</>
	);
};

export default Widget;
