"use client";

import React from "react";

import { cn } from "@/lib/cn-utils";

import Select from "./Select";
import Feed from "./Feed";

interface Props {
	className?: string;
}

const Widget: React.FC<Props> = ({ className }) => {
	return (
		<>
			<div className="widget_overlay" />
			<div className="widget_overlay_mask" />
			<div className={cn("widget_body", className)}>
				<Select className="h-max" />
				<Feed className="flex-grow" />
			</div>
		</>
	);
};

export default Widget;
