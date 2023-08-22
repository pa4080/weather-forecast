/**
 * @see https://openweathermap.org/api/one-call-3
 * @see https://openweathermap.org/api/one-call-3#data
 * @example_query /latitude/longitude/units
 */

import { NextRequest, NextResponse } from "next/server";

import { OpenWeatherData, WeatherUnits } from "@/types/weather";

const apiKey = process.env.OPEN_WEATHER_API_KEY;
const apiOc3Url = process.env.OPEN_WEATHER_API_URL_OC3;
// https://api.openweathermap.org/data/3.0/onecall
const usageMessage = "Oops something went wrong, please try again later.";

const getWeatherUrl = (lat: string, lon: string, units: WeatherUnits, exclude = [""]) =>
	`${apiOc3Url}?lat=${lat}&lon=${lon}&units=${units}&exclude=${exclude.join(",")}&appid=${apiKey}`;

interface Context {
	params: { query: string[] };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest, { params }: Context) {
	try {
		switch (params?.query?.length ?? 0) {
			case 3: {
				const [lat, lon, units] = params.query;

				const response = await fetch(getWeatherUrl(lat, lon, units as WeatherUnits), {
					cache: "no-store",
				});
				const weatherData: OpenWeatherData = await response.json();

				return NextResponse.json(weatherData, { status: 200 });
			}

			default: {
				return NextResponse.json({ message: usageMessage }, { status: 501 });
			}
		}
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
