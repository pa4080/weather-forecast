import { WeatherUnits } from "@/types/weather";

export function displayUnits(units: WeatherUnits | undefined) {
	// "°F" : "°C" : "K";
	switch (units) {
		case "metric":
			return "wi-celsius";
		case "imperial":
			return "wi-fahrenheit";
		case "standard":
			return "wi-degrees";
		default:
			return "wi-celsius";
		// This is not correct but icon for Kelvin is missing
	}
}
