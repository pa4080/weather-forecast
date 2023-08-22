import openWeatherExampleData from "@/public/data/open-weather.example-data.json";
import { GeoCoordinates } from "@/types/geo";

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

export interface WeatherData_MainDisplay {
	cityName: string;
	countryName: string;
	countryCode: string;
	weatherId: number;
	tempColor: string;
	units: WeatherUnits;
	tempCurrent: number;
	tempFeelsLike: number;
	tempDayMin: number;
	tempDayMax: number;
	date: number;
	localDateText: string;
	remoteDateText: string;
	partOfTheDay: string;
	humidity: number;
	pressure: number;
	windSpeed: number;
	windDirection: number;
	moonPhase: number;
	precipitation: number;
	cloudiness: number;
}
