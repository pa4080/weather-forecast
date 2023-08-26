import React from "react";

import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/cn-utils";
import { roundTo } from "@/lib/round";
import { tempColor } from "@/lib/tempColor";

import { OpenWeatherData } from "@/types/weather";

import { getDates } from "@/lib/getDates";

import { Skeleton } from "./ui/skeleton";

interface Props {
	className?: string;
}

const DisplayDays: React.FC<Props> = ({ className }) => {
	const { mainData, weatherData, setMainData } = useAppContext();

	const handleSetDayAsMainData = (day: OpenWeatherData["daily"][number]) => {
		if (!weatherData) {
			return;
		}

		// const actualCurrentDayDate = new Date(weatherData.current.dt * 1000).getDate();
		const { remoteDate: actCurDate } = getDates(
			weatherData.current.dt,
			weatherData?.timezone_offset
		);
		const actualCurrentDayDate = actCurDate.getDate();

		// const newCurrentDayDate = new Date(day.dt * 1000).getDate();
		const { remoteDate: newCurDate } = getDates(day.dt, weatherData?.timezone_offset);
		const newCurrentDayDate = newCurDate.getDate();

		const isCurrent = actualCurrentDayDate === newCurrentDayDate;

		if (isCurrent) {
			setMainData(weatherData.current, day, weatherData);
		} else {
			const newCurrentDay: OpenWeatherData["current"] = {
				dt: day.dt,
				sunrise: day.sunrise,
				sunset: day.sunset,
				temp: day.temp.day,
				feels_like: day.feels_like.day,
				pressure: day.pressure,
				humidity: day.humidity,
				dew_point: day.dew_point,
				uvi: day.uvi,
				clouds: day.clouds,
				visibility: 0,
				wind_speed: day.wind_speed,
				wind_deg: day.wind_deg,
				weather: day.weather,
			};

			setMainData(newCurrentDay, day, weatherData);
		}
	};

	return (
		<div className={cn("days_data_container", className)}>
			{mainData && weatherData && weatherData?.daily?.length > 0 ? (
				<>
					{weatherData?.daily?.map((day) => (
						<div
							key={day.dt}
							className={`day_data ${
								new Date(day.dt * 1000).getDate() === mainData.dayOfTheMonth
									? "bg-gray-200"
									: "bg-gray-100/60"
							}`}
							onClick={() => handleSetDayAsMainData(day)}
						>
							<div className="day_data_day text-gray-800">
								{new Date(day.dt * 1000).toLocaleDateString("en-US", {
									weekday: "short",
								})}
							</div>
							<div className="flex items-center justify-center mt-1">
								<i
									className={`wi wi-owm-${day.weather[0].id} text-4xl -translate-y-1`}
									style={{ color: tempColor(day.temp.day, mainData.units), opacity: 0.5 }}
								/>
							</div>
							<div className="day_data_temp flex gap-1">
								<span className="text-gray-800">
									{roundTo(day.temp.max, 0) + mainData?.displayUnits.deg}
								</span>
								<span className="text-gray-500">
									{roundTo(day.temp.min, 0) + mainData?.displayUnits.deg}
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
