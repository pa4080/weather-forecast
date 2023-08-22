import React from "react";

import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/cn-utils";
import { roundTo } from "@/lib/round";
import { tempColor } from "@/lib/tempColor";

import { Skeleton } from "./ui/skeleton";

interface Props {
	className?: string;
}

const DisplayDays: React.FC<Props> = ({ className }) => {
	const { mainDataDisplay, weatherData } = useAppContext();

	return (
		<div className={cn("days_data_container", className)}>
			{mainDataDisplay ? (
				<>
					{weatherData?.daily.map((day) => (
						<div key={day.dt} className="day_data bg-gray-100/60">
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
					{Array.from({ length: 8 }, (_, i) => (
						<Skeleton key={i} className="day_data bg-gray-100/95" />
					))}
				</>
			)}
		</div>
	);
};

export default DisplayDays;
