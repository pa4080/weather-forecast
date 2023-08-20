/**
 * @see https://openweathermap.org/api/one-call-3
 * @see https://openweathermap.org/api/geocoding-api
 * @example_query /latitude/longitude
 */

import { NextRequest, NextResponse } from "next/server";

import { OpenWeatherData } from "@/types/geo-types";

const apiKey = process.env.OPEN_WEATHER_API_KEY;
const apiOc3Url = process.env.OPEN_WEATHER_API_URL_OC3;
// https://api.openweathermap.org/data/3.0/onecall
const usageMessage = "Oops something went wrong, please try again later.";

const getWeatherUrl = (lat: string, lon: string, exclude = ["minutely"]) =>
	`${apiOc3Url}?lat=${lat}&lon=${lon}&exclude=${exclude.join(",")}&appid=${apiKey}`;

interface Context {
	params: { query: string[] };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest, { params }: Context) {
	try {
		switch (params?.query?.length ?? 0) {
			case 2: {
				const [lat, lon] = params.query;

				const response = await fetch(getWeatherUrl(lat, lon));
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
