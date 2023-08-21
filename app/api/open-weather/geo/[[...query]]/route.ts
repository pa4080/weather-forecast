/**
 * @see https://openweathermap.org/api/geocoding-api
 * @example_query /latitude/longitude
 */

import { NextRequest, NextResponse } from "next/server";

import { UserGeoData } from "@/types/geo";

const apiKey = process.env.OPEN_WEATHER_API_KEY;
const apiGeoUrl = process.env.OPEN_WEATHER_API_URL_GEO;
// const apiOc3Url = process.env.OPEN_WEATHER_API_URL_OC3;
const usageMessage = "Oops something went wrong, please try again later.";

const getUrlReverseGeoToData = (lat: string, lon: string, limit = 1) =>
	`${apiGeoUrl}/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`;

interface ReverseData {
	name: string;
	country: string; // iso2
	lat: number;
	lon: number;
	local_names: { [key: string]: string };
}

interface Context {
	params: { query: string[] };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest, { params }: Context) {
	try {
		switch (params?.query?.length ?? 0) {
			case 2: {
				const [lat, lon] = params.query;

				const response = await fetch(getUrlReverseGeoToData(lat, lon));
				const reverseData: ReverseData[] = await response.json();
				const userData: UserGeoData = {
					cityName: reverseData[0].name,
					countryCode: reverseData[0].country,
					lat: reverseData[0].lat,
					lon: reverseData[0].lon,
				};

				return NextResponse.json(userData, { status: 200 });
			}

			default: {
				return NextResponse.json({ message: usageMessage }, { status: 501 });
			}
		}
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
