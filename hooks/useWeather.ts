/**
 * @see https://openweathermap.org/api/one-call-3
 * @see https://openweathermap.org/api/geocoding-api
 * @see https://ipapi.co
 */

import { useEffect, useState } from "react";

import { OpenWeatherData, WeatherInputData, WeatherUnits } from "@/types/weather";

import { Route } from "@/routes";

const getWeatherUrl = (lat: number, lon: number, units: WeatherUnits) =>
	`${Route.api.getWeather}/${lat}/${lon}/${units}`;

export function useWeather() {
	const [weatherCoord, setWeatherCoord] = useState<WeatherInputData>();
	const [weatherData, setWeatherData] = useState<OpenWeatherData>();

	useEffect(() => {
		if (weatherCoord) {
			(async () => {
				try {
					const response = await fetch(
						getWeatherUrl(weatherCoord.lat, weatherCoord.lon, weatherCoord.units),
						{
							cache: "no-store",
						}
					);

					if (!response.ok) {
						throw new Error("Network response was not ok on @getWeatherUrl()");
					}

					const weatherData: OpenWeatherData = await response.json();

					setWeatherData(weatherData);
				} catch (err) {
					console.warn(err);
				}
			})();
		}
	}, [weatherCoord]);

	return { weatherData, setWeatherCoord };
}
