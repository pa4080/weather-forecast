import React from "react";

import messages from "@/messages/en.json";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/cn-utils";
import { moonIcon } from "@/lib/moonIcon";
import { GeoCoordinates } from "@/types/geo";

interface Props {
	className?: string;
}

const DisplayMainData: React.FC<Props> = ({ className }) => {
	const { mainDataDisplay, setUnits, units, geoCoord, setGeoCoord } = useAppContext();

	return (
		<div className={cn("main_data_container", className)}>
			<div className="main_data_left">
				<div
					className="main_data_left_shadow_wrapper"
					style={{ filter: `drop-shadow(0 0 1.8rem ${mainDataDisplay?.tempColor}cc)` }}
				>
					<div className="main_data_left_heading">
						<div className="w-14 flex items-center justify-center">
							<i
								className={`wi wi-owm-${mainDataDisplay?.partOfTheDay}-${mainDataDisplay?.weatherId} text-5xl -translate-y-1`}
								style={{ color: mainDataDisplay?.tempColor, opacity: 0.7 }}
							/>
						</div>
						<div className="text-6xl text-gray-700 min-w-[5rem] text-right flex-grow">
							{mainDataDisplay?.tempCurrent}
						</div>
						{units === "metric" ? (
							<div
								className="text-5xl text-left z-10 cursor-pointer"
								onClick={() => setUnits("imperial")}
							>
								<span className="text-gray-700 mr-2">
									<i className={`wi wi-celsius -translate-y-3`} />
								</span>
								<span className="text-gray-300 cursor-pointer">
									<i className={`wi wi-fahrenheit  -translate-y-3`} />
								</span>
							</div>
						) : (
							<div
								className="text-5xl text-left z-10 cursor-pointer"
								onClick={() => setUnits("metric")}
							>
								<span className="text-gray-700 mr-2">
									<i className={`wi wi-fahrenheit  -translate-y-3`} />
								</span>
								<span className="text-gray-300 cursor-pointer">
									<i className={`wi wi-celsius  -translate-y-3`} />
								</span>
							</div>
						)}
					</div>
					<div className="main_data_left_info_wrapper">
						<div
							className="w-14 cursor-pointer flex items-center justify-center h-full"
							onClick={() => setGeoCoord({ ...(geoCoord as GeoCoordinates) })}
						>
							<i className="wi wi-cloud-refresh text-5xl text-gray-400/50" />
						</div>

						<div className="main_data_left_info">
							<div className="main_data_left_info_row">
								<span className="text-gray-500">{messages.Data.feelsLike.toLowerCase()}</span>
								<span className="text-lg text-gray-600 font-semibold">
									{mainDataDisplay?.tempFeelsLike}
								</span>
							</div>
							<div className="main_data_left_info_row">
								<span className="text-gray-500">{messages.Data.tempMax.toLowerCase()}</span>
								<span className="text-lg text-gray-800 font-semibold mr-1">
									{mainDataDisplay?.tempDayMax}
								</span>
								<span className="text-gray-500">{messages.Data.tempMin.toLowerCase()}</span>
								<span className="text-lg text-gray-600 font-semibold">
									{mainDataDisplay?.tempDayMin}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="main_data_right">
				<div className="main_data_right_heading">
					<div className="pr-2">
						<p className="w-full text-2xl font-semibold text-gray-700">
							{mainDataDisplay?.cityName}, {mainDataDisplay?.countryCode}
						</p>
					</div>

					<div className="text-lg h-8">
						<span className="text-gray-600">{mainDataDisplay?.localDateText}</span>
						<br />
						<span className="text-gray-400">{mainDataDisplay?.remoteDateText}</span>
					</div>
				</div>
				<div className="main_data_right_info">
					<div className="main_data_right_info_row">
						<span>
							<i className="info_icon wi wi-humidity" />
						</span>
						<span className="text-gray-500 w-24 pb-1">{messages.Data.humidity.toLowerCase()}</span>
						<span className="text-gray-800 font-semibold">{mainDataDisplay?.humidity}</span>
						<span className="text-gray-600 ml-1">{messages.WeatherUnits[units].humidity}</span>
					</div>

					<div className="main_data_right_info_row">
						<span className="scale-125">
							<i className="info_icon wi wi-raindrop translate-x-[1px]" />
						</span>
						<span className="text-gray-500 w-24 pb-1">
							{messages.Data.precipitation.toLowerCase()}
						</span>
						<span className="text-gray-800 font-semibold">
							{Number(mainDataDisplay?.precipitation || 0) * 100}
						</span>
						<span className="text-gray-600 ml-1">{messages.WeatherUnits[units].humidity}</span>
					</div>

					<div className="main_data_right_info_row">
						<span className="scale-110">
							<i className="info_icon wi wi-barometer" />
						</span>
						<span className="text-gray-500 w-24 pb-1">{messages.Data.pressure.toLowerCase()}</span>
						<span className="text-gray-800 font-semibold ">{mainDataDisplay?.pressure}</span>
						<span className="text-gray-600 ml-1">{messages.WeatherUnits[units].pressure}</span>
					</div>
					<div className="main_data_right_info_row">
						<span className="scale-125">
							<i className={`info_icon wi wi-wind from-${mainDataDisplay?.windDirection}-deg`} />
						</span>
						<span className="text-gray-500 w-24 pb-1">{messages.Data.wind.toLowerCase()}</span>
						<span className="text-gray-800 font-semibold">{mainDataDisplay?.windSpeed}</span>
						<span className="text-gray-600 ml-1">{messages.WeatherUnits[units].windSpeed}</span>
					</div>
					<div className="main_data_right_info_row">
						<span className="scale-110">
							<i className={`info_icon wi ${moonIcon(mainDataDisplay?.moonPhase)}`} />
						</span>
						<span className="text-gray-500 w-24 pb-1">{messages.Data.moonPhase.toLowerCase()}</span>
						<span className="text-gray-800 font-semibold">
							{Number(mainDataDisplay?.moonPhase || 0) * 100}
						</span>
						<span className="text-gray-600 ml-1">{messages.WeatherUnits[units].moonPhase}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DisplayMainData;
