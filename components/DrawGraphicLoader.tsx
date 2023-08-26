/**
 * @see https://recharts.org/en-US/api
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients
 */
import React from "react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/cn-utils";
import { useAppContext } from "@/contexts/AppContext";
import { Skeleton } from "@/components/ui/skeleton";

const DrawGraphic = dynamic(() => import("@/components/DrawGraphic"), { ssr: false });

interface Props {
	className?: string;
}

const DrawGraphicLoader: React.FC<Props> = ({ className }) => {
	const { mainData, weatherData } = useAppContext();

	return weatherData && mainData?.tempColor ? (
		<div
			className={cn(
				"w-full h-fit py-4 min-h-[180px] xs:min-h-[240px] sm:min-h-[212px] flex justify-center items-center transform-gpu scale-[1.03] sm:scale-[1.05]",
				className
			)}
		>
			<DrawGraphic />
		</div>
	) : (
		<Skeleton
			className={cn(
				"w-full h-[270px] sm:h-[212px] max-h-screen rounded-md bg-gray-200/50",
				className
			)}
		/>
	);
};

export default DrawGraphicLoader;
