import React from "react";

import { Divide } from "lucide-react";

import messages from "@/messages/en.json";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/cn-utils";
import { moonIcon } from "@/lib/moonIcon";
import { GeoCoordinates } from "@/types/geo";

import { roundTo } from "@/lib/round";

import { tempColor } from "@/lib/tempColor";

import { Skeleton } from "./ui/skeleton";

interface Props {
	className?: string;
}

const DisplayDays: React.FC<Props> = ({ className }) => {
	const { mainDataDisplay, setUnits, units, geoCoord, setGeoCoord, weatherData } = useAppContext();

	return (
		<div
			className={cn(
				"days_data_container grid grid-cols-4 xa:grid-cols-8 xa:grid-flow-col gap-2",
				className
			)}
		>
			{mainDataDisplay ? (
				<>
					{weatherData?.daily.map((day) => (
						<div
							key={day.dt}
							className="day_data flex flex-col items-center justify-center gap-1 cursor-pointer bg-gray-100/60 p-2 rounded-md"
						>
							<div className="day_data_day text-gray-800">
								{new Date(day.dt * 1000).toLocaleDateString("en-US", {
									weekday: "short",
								})}
							</div>
							<div className="flex items-center justify-center mt-1">
								<i
									className={`wi wi-owm-${day.weather[0].id} text-4xl -translate-y-1`}
									style={{ color: tempColor(day.temp.day, mainDataDisplay.units), opacity: 0.5 }}
								/>
							</div>
							<div className="day_data_temp flex gap-1">
								<span className="text-gray-800">
									{roundTo(day.temp.max, 0) + mainDataDisplay?.displayUnits.deg}
								</span>
								<span className="text-gray-500">
									{roundTo(day.temp.min, 0) + mainDataDisplay?.displayUnits.deg}
								</span>
							</div>
						</div>
					))}
				</>
			) : (
				<>
					<Skeleton className=""></Skeleton>
				</>
			)}
		</div>
	);
};

export default DisplayDays;
