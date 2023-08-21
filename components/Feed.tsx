import React from "react";

import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/cn-utils";

interface Props {
	className?: string;
}

const Feed: React.FC<Props> = ({ className }) => {
	const { weatherData, cityName } = useAppContext();

	return (
		<div className={cn("flex justify-center items-center gap-5", className)}>
			<span>{cityName}</span>
			<span>{weatherData?.current.temp}</span>
			{/* <i className="wi wi-day-sunny text-ring text-3xl" /> <br /> */}
			<i className={`wi wi-owm-${weatherData?.current.weather[0].id} text-ring text-3xl`} /> <br />
		</div>
	);
};

export default Feed;
