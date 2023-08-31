/**
 * @see https://openweathermap.org/api/one-call-3
 * @see https://openweathermap.org/api/geocoding-api
 * @see https://ipapi.co
 */

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { OpenWeatherData, WeatherInputData, WeatherUnits } from "@/types/weather";

import { Route } from "@/routes";

const getWeatherUrl = (lat: number, lon: number, units: WeatherUnits) =>
	`${Route.api.getWeather}/${lat}/${lon}/${units}`;

export function useWeather(setIsLoading?: Dispatch<SetStateAction<boolean>>) {
	const [weatherCoord, setWeatherCoord] = useState<WeatherInputData>();
	const [weatherData, setWeatherData] = useState<OpenWeatherData>();

	useEffect(() => {
		if (weatherCoord) {
			setIsLoading && setIsLoading(true);

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
				} finally {
					setIsLoading && setIsLoading(false);
				}
			})();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weatherCoord]);

	// https://www.youtube.com/watch?v=37PafxU_uzQ&t=205s
	return [weatherData, setWeatherCoord] as const;
}
