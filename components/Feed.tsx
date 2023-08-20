import React from "react";

import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/cn-utils";

interface Props {
	className?: string;
}

const Feed: React.FC<Props> = ({ className }) => {
	const { weatherData } = useAppContext();

	return (
		<div className={cn("flex justify-center items-center", className)}>
			{weatherData?.current.temp}
		</div>
	);
};

export default Feed;
