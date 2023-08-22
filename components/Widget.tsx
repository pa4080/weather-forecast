"use client";

import React from "react";

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
