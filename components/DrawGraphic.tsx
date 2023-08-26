/**
 * @see https://recharts.org/en-US/api
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients
 */
import React, { useEffect, useState } from "react";

import {
	Area,
	ResponsiveContainer,
	LabelList,
	LabelProps,
	ComposedChart,
	Line,
	XAxis,
	YAxis,
} from "recharts";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@/lib/cn-utils";
import { useAppContext } from "@/contexts/AppContext";
import { getDates } from "@/lib/getDates";
import { roundTo } from "@/lib/round";
import { tempColor } from "@/lib/tempColor";

interface GraphData {
	name: string;
	min: number;
	max: number;
	day: number;
}

interface Props {
	className?: string;
}

const DrawGraphic: React.FC<Props> = ({ className }) => {
	const { mainData, weatherData } = useAppContext();
	const [graphicData, setGraphicData] = useState<GraphData[]>();

	const { isAboveSm } = useBreakpoint("sm");

	useEffect(() => {
		const data = weatherData?.daily.map((day) => {
			const { remoteDate } = getDates(day.dt, weatherData?.timezone_offset);

			return {
				name: remoteDate.toLocaleDateString("en-US", {
					weekday: "short",
				}),
				min: roundTo(day.temp.min, 0),
				day: roundTo(day.temp.day, 0),
				max: roundTo(day.temp.max, 0),
			};
		});

		setGraphicData(data);
	}, [weatherData]);

	const renderLabel = (props: LabelProps) => {
		const { x, y, value, offset } = props;

		return (
			<g>
				<text
					className="font-semibold saturate-200 grayscale-[.6] contrast-[.85]"
					dominantBaseline="middle"
					fill={tempColor(Number(value), mainData!.units)}
					textAnchor="middle"
					x={x}
					y={Number(y) - Number(offset) * 2}
				>
					{value}
				</text>
			</g>
		);
	};

	return (
		weatherData &&
		mainData?.tempColor && (
			<ResponsiveContainer
				aspect={isAboveSm ? 4 : 2}
				className={cn("select-none", className)}
				debounce={10}
				// height={"100%"}
				// width={"100%"}
			>
				<ComposedChart
					data={graphicData}
					margin={{
						top: 24,
						right: isAboveSm ? 26 : 13,
						left: isAboveSm ? 26 : 13,
						bottom: isAboveSm ? 24 : 0,
					}}
					stackOffset="wiggle"
					// height={180}
					// width={720}
				>
					<defs>
						<linearGradient id="linearGradient_Min" x1="0" x2="0" y1="0" y2="1">
							<stop
								offset="0%"
								stopColor={
									mainData.tempDayMin >= 0 ? "#ebebeb" : `${mainData?.tempColor || "#ffb300"}51`
								}
								stopOpacity={mainData.tempDayMin >= 0 ? "0.7" : "0"}
							/>
							<stop
								offset="90%"
								stopColor={
									mainData.tempDayMin >= 0 ? "#ebebeb" : `${mainData?.tempColor || "#ffb300"}51`
								}
								stopOpacity={mainData.tempDayMin >= 0 ? "0" : "0.7"}
							/>
						</linearGradient>
						<linearGradient id="linearGradient_Max" x1="0" x2="0" y1="0" y2="1">
							<stop
								offset="0%"
								stopColor={
									mainData.tempDayMin >= 0 ? `${mainData?.tempColor || "#ffb300"}51` : "#ebebeb"
								}
								stopOpacity={mainData.tempDayMin >= 0 ? "0.7" : "0"}
							/>
							<stop
								offset="90%"
								stopColor={
									mainData.tempDayMin >= 0 ? `${mainData?.tempColor || "#ffb300"}51` : "#ebebeb"
								}
								stopOpacity={mainData.tempDayMin >= 0 ? "0" : "0.7"}
							/>
						</linearGradient>
					</defs>
					<YAxis
						axisLine={false}
						dataKey={mainData.tempDayMin >= 0 ? "max" : "min"}
						domain={
							mainData.tempDayMin >= 0
								? [0, "auto"]
								: [
										isAboveSm ? 0 : (dataMin: number) => 0 - Math.abs(dataMin) - 5,
										(dataMax: number) => 0 - Math.abs(dataMax) + 5,
								  ]
						}
						hide={true}
						scale="auto"
						tickLine={false}
					/>
					<XAxis axisLine={false} dataKey="name" hide={isAboveSm} tickLine={false} />
					<Area
						dataKey="max"
						fill="url(#linearGradient_Max)"
						fillOpacity={1}
						stroke="#bababa"
						strokeWidth={2}
						type="monotone"
					>
						<LabelList content={renderLabel} dataKey="max" offset={8} position="top" />
					</Area>
					<Area
						dataKey="min"
						fill="url(#linearGradient_Min)"
						fillOpacity={1}
						stroke="#bababa"
						strokeWidth={2}
						type="monotone"
					>
						<LabelList content={renderLabel} dataKey="min" offset={-8} position="top" />
					</Area>
					<Line
						dataKey="day"
						isAnimationActive={true}
						stroke="#cacaca"
						strokeWidth={2}
						type="monotone"
						// dot={false}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		)
	);
};

export default DrawGraphic;
