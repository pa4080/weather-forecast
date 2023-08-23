import React from "react";

import messages from "@/messages/en.json";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/cn-utils";
import { moonIcon } from "@/lib/moonIcon";
import { GeoCoordinates } from "@/types/geo";

import { Skeleton } from "./ui/skeleton";

interface Props {
	className?: string;
}

const DisplayMainData: React.FC<Props> = ({ className }) => {
	const { mainDataDisplay, setUnits, geoCoord, setGeoCoord } = useAppContext();

	return (
		<div className={cn("main_data_container", className)}>
			{mainDataDisplay ? (
				<>
					<div className="main_data_left">
						<div
							className="main_data_left_shadow_wrapper"
							style={{ filter: `drop-shadow(0 0 1.8rem ${mainDataDisplay?.tempColor}ee)` }}
						>
							<div className="main_data_left_heading">
								<div className="w-14 flex items-center justify-center">
									<i
										className={`wi wi-owm-${mainDataDisplay?.partOfTheDay}-${mainDataDisplay?.weatherId} text-5xl -translate-y-1`}
										style={{ color: mainDataDisplay?.tempColor, opacity: 0.7 }}
									/>
								</div>
								<div className="temperature_field">{mainDataDisplay?.tempCurrent}</div>
								{mainDataDisplay?.units === "metric" ? (
									<div className="temperature_switch" onClick={() => setUnits("imperial")}>
										<span className="text-gray-700 mr-2">
											<i className={"wi wi-celsius"} />
										</span>
										<span className="text-gray-300 cursor-pointer">
											<i className={"wi wi-fahrenheit"} />
										</span>
									</div>
								) : (
									<div className="temperature_switch" onClick={() => setUnits("metric")}>
										<span className="text-gray-700 mr-2">
											<i className={"wi wi-fahrenheit"} />
										</span>
										<span className="text-gray-300 cursor-pointer">
											<i className={"wi wi-celsius"} />
										</span>
									</div>
								)}
							</div>
							<div className="main_data_left_info_wrapper">
								<div
									className="reset_button"
									onClick={() => setGeoCoord({ ...(geoCoord as GeoCoordinates) })}
								>
									<div className="reset_button_feedback">
										<i className="wi wi-refresh " />
									</div>
								</div>

								<div className="main_data_left_info">
									<div className="main_data_left_info_row">
										<span className="text-gray-500">{messages.Data.feelsLike.toLowerCase()}</span>
										<span className="text-lg text-gray-600 font-semibold">
											{mainDataDisplay?.tempFeelsLike + mainDataDisplay?.displayUnits.deg}
										</span>
									</div>
									<div className="main_data_left_info_row">
										<span className="text-gray-500">{messages.Data.tempMax.toLowerCase()}</span>
										<span className="text-lg text-gray-600 font-semibold mr-[0.125rem]">
											{mainDataDisplay?.tempDayMax + mainDataDisplay?.displayUnits.deg}
										</span>
										<span className="text-gray-500">{messages.Data.tempMin.toLowerCase()}</span>
										<span className="text-lg text-gray-600 font-semibold">
											{mainDataDisplay?.tempDayMin + mainDataDisplay?.displayUnits.deg}
										</span>
									</div>
									<div className="main_data_left_info_row">
										<span className="text-gray-500">{messages.Data.cloudiness.toLowerCase()}</span>
										<span className="text-lg text-gray-600 font-semibold">
											{mainDataDisplay?.cloudiness + mainDataDisplay?.displayUnits.cloudiness}
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
								<p className="text-ellipsis whitespace-pre overflow-hidden w-full max-w-full">
									<span className="text-gray-600 mr-2">{mainDataDisplay?.localDateText}</span>
									<br className="hidden sa:block" />
									<span className="text-gray-400">{mainDataDisplay?.remoteDateText}</span>
								</p>
							</div>
						</div>
						<div className="main_data_right_info">
							<div className="main_data_right_info_row">
								<span>
									<i className="info_icon wi wi-humidity" />
								</span>
								<span className="text-gray-500 w-24 pb-1">
									{messages.Data.humidity.toLowerCase()}
								</span>
								<span className="text-gray-800 font-semibold ml-1">
									{mainDataDisplay?.humidity}
								</span>
								<span className="text-gray-600 ml-1">{mainDataDisplay?.displayUnits.humidity}</span>
							</div>

							<div className="main_data_right_info_row">
								<span className="scale-125">
									<i className="info_icon wi wi-raindrop translate-x-[1px]" />
								</span>
								<span className="text-gray-500 w-24 pb-1">
									{messages.Data.precipitation.toLowerCase()}
								</span>
								<span className="text-gray-800 font-semibold ml-1">
									{Number(mainDataDisplay?.precipitation || 0) * 100}
								</span>
								<span className="text-gray-600 ml-1">{mainDataDisplay?.displayUnits.humidity}</span>
							</div>

							<div className="main_data_right_info_row">
								<span className="scale-110">
									<i className="info_icon wi wi-barometer" />
								</span>
								<span className="text-gray-500 w-24 pb-1">
									{messages.Data.pressure.toLowerCase()}
								</span>
								<span className="text-gray-800 font-semibold ">{mainDataDisplay?.pressure}</span>
								<span className="text-gray-600 ml-1">{mainDataDisplay?.displayUnits.pressure}</span>
							</div>
							<div className="main_data_right_info_row">
								<span className="scale-125">
									<i
										className={`info_icon wi wi-wind from-${mainDataDisplay?.windDirection}-deg`}
									/>
								</span>
								<span className="text-gray-500 w-24 pb-1">{messages.Data.wind.toLowerCase()}</span>
								<span className="text-gray-800 font-semibold ml-1">
									{mainDataDisplay?.windSpeed}
								</span>
								<span className="text-gray-600 ml-1">
									{mainDataDisplay?.displayUnits.windSpeed}
								</span>
							</div>
							<div className="main_data_right_info_row">
								<span className="scale-110">
									<i className={`info_icon wi ${moonIcon(mainDataDisplay?.moonPhase)}`} />
								</span>
								<span className="text-gray-500 w-24 pb-1">
									{messages.Data.moonPhase.toLowerCase()}
								</span>
								<span className="text-gray-800 font-semibold">
									{Number(mainDataDisplay?.moonPhase || 0) * 100}
								</span>
								<span className="text-gray-600 ml-1">
									{mainDataDisplay?.displayUnits.moonPhase}
								</span>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<Skeleton className="main_data_left_skeleton"></Skeleton>
					<Skeleton className="main_data_right_skeleton"></Skeleton>
				</>
			)}
		</div>
	);
};

export default DisplayMainData;
