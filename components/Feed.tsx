import React from "react";

import messages from "@/messages/en.json";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/cn-utils";
import { displayUnits } from "@/lib/displayUnits";

interface Props {
	className?: string;
}

const Feed: React.FC<Props> = ({ className }) => {
	const { mainDataDisplay } = useAppContext();

	return (
		<div className={cn("main_data_container", className)}>
			<div className="main_data_left">
				<div
					className="main_data_left_shadow_wrapper"
					style={{ filter: `drop-shadow(0 0 1.8rem ${mainDataDisplay?.tempColor}cc)` }}
				>
					<div className="main_data_left_heading">
						<div className="w-16 flex items-center justify-center">
							<i
								className={`wi wi-owm-${mainDataDisplay?.weatherId} text-5xl -translate-y-1`}
								style={{ color: mainDataDisplay?.tempColor, opacity: 0.7 }}
							/>
						</div>
						<div className="text-6xl text-gray-700 min-w-[5rem] text-right">
							{mainDataDisplay?.tempCurrent}
						</div>
						<div className="text-5xl  min-w-[2.2rem] text-left">
							<span className="text-gray-700 mr-2">
								<i className={`wi wi-celsius  -translate-y-4`} />
							</span>
							<span className="text-gray-300 cursor-pointer">
								<i className={`wi wi-fahrenheit  -translate-y-4`} />
							</span>
						</div>
					</div>
					<div>
						<div className="main_data_left_row">
							<span className="text-gray-500">{messages.Feed.feelsLike.toLowerCase()}</span>
							<span className="text-lg text-gray-600 font-semibold">
								{mainDataDisplay?.tempFeelsLike}
							</span>
						</div>
						<div className="main_data_left_row">
							<span className="text-gray-500">{messages.Feed.tempMax.toLowerCase()}</span>
							<span className="text-lg text-gray-800 font-semibold mr-1">
								{mainDataDisplay?.tempDayMax}
							</span>
							<span className="text-gray-500">{messages.Feed.tempMin.toLowerCase()}</span>
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

					<div className="text-lg min-w-max text-gray-600">{mainDataDisplay?.dateText}</div>
				</div>
				<div className="main_data_right_row">
					<span className="text-lg">...</span>
					<div className="text-lg text-gray-600">info</div>
				</div>
			</div>
		</div>
	);
};

export default Feed;
