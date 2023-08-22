import React from "react";

import messages from "@/messages/en.json";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/cn-utils";

interface Props {
	className?: string;
}

const DisplayMainData: React.FC<Props> = ({ className }) => {
	const { mainDataDisplay, setUnits, units } = useAppContext();

	return (
		<div className={cn("main_data_container", className)}>
			<div className="main_data_left">
				<div
					className="main_data_left_shadow_wrapper"
					style={{ filter: `drop-shadow(0 0 1.8rem ${mainDataDisplay?.tempColor}cc)` }}
				>
					<div className="main_data_left_heading">
						<div className="w-10 flex items-center justify-center">
							<i
								className={`wi wi-owm-${mainDataDisplay?.partOfTheDay}-${mainDataDisplay?.weatherId} text-5xl -translate-y-1`}
								style={{ color: mainDataDisplay?.tempColor, opacity: 0.7 }}
							/>
						</div>
						<div className="text-6xl text-gray-700 min-w-[4.4rem] text-right flex-grow">
							{mainDataDisplay?.tempCurrent}
						</div>
						{units === "metric" ? (
							<div className="text-5xl text-left" onClick={() => setUnits("imperial")}>
								<span className="text-gray-700 mr-2">
									<i className={`wi wi-celsius -translate-y-4`} />
								</span>
								<span className="text-gray-300 cursor-pointer">
									<i className={`wi wi-fahrenheit  -translate-y-4`} />
								</span>
							</div>
						) : (
							<div className="text-5xl text-left" onClick={() => setUnits("metric")}>
								<span className="text-gray-700 mr-2">
									<i className={`wi wi-fahrenheit  -translate-y-4`} />
								</span>
								<span className="text-gray-300 cursor-pointer">
									<i className={`wi wi-celsius  -translate-y-4`} />
								</span>
							</div>
						)}
					</div>
					<div>
						<div className="main_data_left_row">
							<span className="text-gray-500">{messages.Data.feelsLike.toLowerCase()}</span>
							<span className="text-lg text-gray-600 font-semibold">
								{mainDataDisplay?.tempFeelsLike}
							</span>
						</div>
						<div className="main_data_left_row">
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

			<div className="main_data_right">
				<div className="main_data_right_heading">
					<div className="pr-2">
						<p className="w-full text-2xl font-semibold text-gray-700">
							{mainDataDisplay?.cityName}, {mainDataDisplay?.countryCode}
						</p>
					</div>

					<div className="text-lg text-gray-600">
						{mainDataDisplay?.dateText}, {mainDataDisplay?.timeText}
					</div>
				</div>
				<div className="main_data_right_info">
					<div className="main_data_right_info_row">
						<span>
							<i className="info_icon wi wi-humidity" />
						</span>
						<span className="text-gray-600 w-20">{messages.Data.humidity.toLowerCase()}</span>
						<span className="text-gray-800 font-semibold">{mainDataDisplay?.humidity}</span>
						<span className="text-gray-600 w-20 ml-1">{messages.WeatherUnits[units].humidity}</span>
					</div>
					<div className="main_data_right_info_row">
						<span>
							<i className="info_icon wi wi-barometer" />
						</span>
						<span className="text-gray-600 w-20">{messages.Data.pressure.toLowerCase()}</span>
						<span className="text-gray-800 font-semibold">{mainDataDisplay?.pressure}</span>
						<span className="text-gray-600 w-20 ml-1">{messages.WeatherUnits[units].pressure}</span>
					</div>
					<div className="main_data_right_info_row">
						<span className="scale-125">
							<i className={`info_icon wi wi-wind from-${mainDataDisplay?.windDirection}-deg`} />
						</span>
						<span className="text-gray-600 w-20">{messages.Data.wind.toLowerCase()}</span>
						<span className="text-gray-800 font-semibold">{mainDataDisplay?.windSpeed}</span>
						<span className="text-gray-600 w-20 ml-1">
							{messages.WeatherUnits[units].windSpeed}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DisplayMainData;
