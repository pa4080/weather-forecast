/**
 * @see // https://map.worldweatheronline.com/temperature
 *
 * linear-gradient(90deg,
 * #000,
 * #664159 11.1%, // +50 C
 * #bc613d 22.2%,
 * #c6b64f 33.3%,
 * #5a9935 44.4%,
 * #4d85c3 55.5%,
 * #6dc8c2 66.6%,
 * #8e76ff 77.7%,
 * #5b63e8 88.8%,
 * #4633f4),      // -40 C
 * #4f4f4f
 */
import { WeatherUnits } from "@/types/weather";

import { roundTo } from "./round";

export function tempColor(temp: number | undefined, units: WeatherUnits) {
	if (temp === undefined) {
		return "#555555";
	}

	if (units === "metric") {
		temp = Number(roundTo(temp, 0));
	} else if (units === "imperial") {
		temp = Number(roundTo(((temp - 32) * 5) / 9, 0));
	} else if (units === "standard") {
		temp = Number(roundTo(temp - 273.15 + 5, 0));
	}

	if (temp < -30) {
		return "#bb04ff";
	} else if (-30 <= temp && temp < -20) {
		return "#9d04ff";
	} else if (-20 <= temp && temp < -10) {
		return "#6a04ff";
	} else if (-10 <= temp && temp < 0) {
		return "#0044ff";
	} else if (0 <= temp && temp < 10) {
		return "#0084ff";
	} else if (10 <= temp && temp < 20) {
		return "#009400";
	} else if (20 <= temp && temp < 30) {
		return "#ffb400";
	} else if (30 <= temp && temp < 40) {
		return "#ff5400";
	} else if (40 <= temp) {
		return "#ff3400";
	} else {
		return "#555555";
	}
}
