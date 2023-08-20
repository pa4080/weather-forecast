import openWeatherExampleData from "@/public/data/open-weather.example-data.json";
import { GeoCoordinates } from "@/types/geo-types";

export type OpenWeatherData = typeof openWeatherExampleData;

// @see https://openweathermap.org/api/one-call-3
export type WeatherUnits = "metric" | "imperial" | "standard";

export interface WeatherInputData extends GeoCoordinates {
	units: WeatherUnits;
}

export type UnitsOptions = [
	{
		name: string;
		id: "metric";
		emoji?: string;
	},
	{
		name: string;
		id: "imperial";
		emoji?: string;
	},
	{
		name: string;
		id: "standard";
		emoji?: string;
	},
];
