"use client";

import React, { useEffect } from "react";

import dynamic from "next/dynamic"; // disable SSR

import { cn } from "@/lib/cn-utils";
import { useAppContext } from "@/contexts/AppContext";

import Select from "./Select";
import DisplayMainData from "./DisplayMainData";
import Logo from "./Logo";
import DisplayDays from "./DisplayDays";
import { Skeleton } from "./ui/skeleton";
// import DrawGraphics from "./DrawGraphics";
const DrawGraphics = dynamic(() => import("@/components/DrawGraphic"), { ssr: false });

interface Props {
	className?: string;
}

const Widget: React.FC<Props> = ({ className }) => {
	const { mainData, weatherData } = useAppContext();

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

				{weatherData && mainData?.tempColor ? (
					<div className="w-full h-fit py-4 min-h-[180px] xs:min-h-[240px] sm:min-h-[212px] flex justify-center items-center">
						<DrawGraphics />
					</div>
				) : (
					<Skeleton className="w-full h-[270px] sm:h-[212px] max-h-screen rounded-md bg-gray-200/50" />
				)}
				<DisplayDays />
			</div>
		</>
	);
};

export default Widget;
